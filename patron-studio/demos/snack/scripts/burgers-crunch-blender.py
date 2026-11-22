"""
Burgers de Crunch! construits et rendus dans Blender (Cycles), dans le style du Classic Smash.
  Blender 4.2 en module Python (pip install bpy==4.2.0, Python 3.11 ; débruiteur OpenImageDenoise inclus) :
  python burgers-crunch-blender.py -- <dossier poly haven> <recette> <sortie.png> <largeur> <echantillons> [<blend> ou -] [<sortie.glb> ou -]
  recette : chicken-crispy | forestier | double-cheese | chicken-avocat | egg-bacon | classic-smash
  largeur 0 : pas de rendu (seulement le GLB).
Assets Poly Haven (CC0) : HDRI brown_photostudio_02, textures dark_wooden_planks, modèle wooden_cutting_board.
Chaque ingrédient est un objet ; les couches posées (bacon, salade, roquette…) épousent ce qu'il y a dessous (lancer de
rayons vers le bas) ; le cheddar et le blanc d'œuf sont des tissus simulés qui retombent ; nappes et coulures sont
réunies par remaillage en voxels. Pour le GLB : chaque ingrédient est figé, allégé, et ses couleurs procédurales
sont cuites dans les sommets (couleurs de sommets), sans la planche ni la table ; le burger repose sur z = 0.
Compression ensuite (glTF-Transform) : npx @gltf-transform/cli optimize <brut.glb> <sortie.glb> --compress draco --simplify false
Unités : mètres.
"""
import math
import os
import random
import sys

import bpy  # (en module Python, bpy doit être importé avant bmesh)
import bmesh
from mathutils import Matrix, Vector, noise

argv = sys.argv[sys.argv.index('--') + 1:]
PH, RECETTE, SORTIE = os.path.abspath(argv[0]), argv[1], os.path.abspath(argv[2])
LARGEUR, ECH = int(argv[3]), int(argv[4])
BLEND = os.path.abspath(argv[5]) if len(argv) > 5 and argv[5] != '-' else None
GLB = os.path.abspath(argv[6]) if len(argv) > 6 and argv[6] != '-' else None
random.seed(7)
noise.seed_set(11) if hasattr(noise, 'seed_set') else None

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
col = sc.collection
BURGER = []  # les objets du burger (pour le GLB), de bas en haut


# ================================================================ outils
def L(c):
    """Couleur donnée en sRGB (comme à l'écran) → valeur linéaire de Blender."""
    return tuple(x ** 2.2 for x in c)


def nouvel_objet(nom, bm, mat=None, burger=True):
    me = bpy.data.meshes.new(nom)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(nom, me)
    col.objects.link(o)
    if mat:
        o.data.materials.append(mat)
    if burger:
        BURGER.append(o)
    return o


def lisse(o):
    for p in o.data.polygons:
        p.use_smooth = True


def modif_subdiv(o, n=2):
    m = o.modifiers.new('subdiv', 'SUBSURF')
    m.levels = m.render_levels = n
    return m


def texture_bruit(nom, type_='CLOUDS', taille=0.25, profondeur=2):
    t = bpy.data.textures.new(nom, type_)
    if type_ in ('CLOUDS', 'DISTORTED_NOISE', 'MUSGRAVE', 'VORONOI'):
        t.noise_scale = taille
    if type_ == 'CLOUDS':
        t.noise_depth = profondeur
    return t


def modif_deplace(o, tex, force, coords='OBJECT'):
    m = o.modifiers.new('deplace', 'DISPLACE')
    m.texture = tex
    m.strength = force
    m.mid_level = 0.5
    m.texture_coords = coords
    return m


def maj():
    dg = bpy.context.evaluated_depsgraph_get()
    dg.update()
    return dg


def appliquer(o):
    """Fige l'objet tel qu'il est évalué (modificateurs, simulation) dans un nouveau maillage."""
    dg = maj()
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
    o.modifiers.clear()
    o.data = me
    return o


def en_maillage(o):
    """Métaballes → maillage. La résolution des métaballes ne descend pas sous 5 mm dans Blender : on les construit
    10 fois plus grandes et on réduit l'objet (résolution réelle : 0,5 mm)."""
    mb = o.data
    for e in mb.elements:
        e.co = e.co * 10
        e.radius *= 10
    mb.resolution = mb.render_resolution = 0.005
    o.scale = (0.1, 0.1, 0.1)
    dg = maj()
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
    n = bpy.data.objects.new(o.name + '_m', me)
    n.matrix_world = o.matrix_world.copy()
    col.objects.link(n)
    bpy.data.objects.remove(o)
    return n


def metaballs(nom):
    mb = bpy.data.metaballs.new(nom)
    mb.threshold = 0.6
    o = bpy.data.objects.new(nom, mb)
    col.objects.link(o)
    return mb, o


def boule(mb, co, rayon, sx=1.0, sy=1.0, sz=1.0, rot=None):
    e = mb.elements.new()
    e.co = co
    e.radius = rayon
    e.type = 'ELLIPSOID'
    e.size_x, e.size_y, e.size_z = sx, sy, sz
    if rot is not None:
        e.rotation = rot
    return e


def fusionner(nom, objs, voxel, lissage=4):
    """Réunit des morceaux (nappe + coulures) en une seule forme continue : remaillage en voxels puis lissage."""
    for o in objs:
        appliquer(o)
        if o in BURGER:
            BURGER.remove(o)
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = objs[0]
    o.name = nom
    rm = o.modifiers.new('remaillage', 'REMESH')
    rm.mode = 'VOXEL'
    rm.voxel_size = voxel
    li = o.modifiers.new('lissage', 'LAPLACIANSMOOTH')
    li.iterations = lissage
    li.lambda_factor = 0.6
    li.use_volume_preserve = True
    lisse(o)
    BURGER.append(o)
    return o


def principled(nom, couleur=None, **k):
    mat = bpy.data.materials.new(nom)
    mat.use_nodes = True
    b = mat.node_tree.nodes['Principled BSDF']
    if couleur:
        b.inputs['Base Color'].default_value = (*L(couleur), 1)
    for cle, v in k.items():
        b.inputs[cle.replace('_', ' ')].default_value = v
    return mat, b


def noeud(mat, type_, **k):
    n = mat.node_tree.nodes.new(type_)
    for cle, v in k.items():
        setattr(n, cle, v)
    return n


def lier(mat, a, b):
    mat.node_tree.links.new(a, b)


def rampe(mat, couleurs, interp='LINEAR'):
    r = noeud(mat, 'ShaderNodeValToRGB')
    r.color_ramp.interpolation = interp
    el = r.color_ramp.elements
    el[0].position, el[0].color = couleurs[0][0], (*L(couleurs[0][1]), 1)
    el[1].position, el[1].color = couleurs[-1][0], (*L(couleurs[-1][1]), 1)
    for pos, c in couleurs[1:-1]:
        e = el.new(pos)
        e.color = (*L(c), 1)
    return r


def bruit(mat, echelle, detail=6, vecteur=None):
    t = noeud(mat, 'ShaderNodeTexNoise')
    t.inputs['Scale'].default_value = echelle
    t.inputs['Detail'].default_value = detail
    if vecteur is not None:
        lier(mat, vecteur, t.inputs['Vector'])
    return t


def bosses(mat, bsdf, echelle, force, distance=0.001, detail=8, type_='noise'):
    if type_ == 'voronoi':
        t = noeud(mat, 'ShaderNodeTexVoronoi')
        t.inputs['Scale'].default_value = echelle
        sortie = t.outputs['Distance']
    else:
        t = bruit(mat, echelle, detail)
        t.inputs['Roughness'].default_value = 0.6
        sortie = t.outputs['Fac']
    bp = noeud(mat, 'ShaderNodeBump')
    bp.inputs['Strength'].default_value = force
    bp.inputs['Distance'].default_value = distance
    lier(mat, sortie, bp.inputs['Height'])
    lier(mat, bp.outputs['Normal'], bsdf.inputs['Normal'])
    return bp


def coord_objet(mat):
    return noeud(mat, 'ShaderNodeTexCoord').outputs['Object']


def coord_uv(mat):
    return noeud(mat, 'ShaderNodeTexCoord').outputs['UV']


def rayon_xy(mat):
    """Distance à l'axe de l'objet (coordonnées objet)."""
    sxy = noeud(mat, 'ShaderNodeVectorMath', operation='MULTIPLY')
    sxy.inputs[1].default_value = (1, 1, 0)
    lier(mat, coord_objet(mat), sxy.inputs[0])
    lg = noeud(mat, 'ShaderNodeVectorMath', operation='LENGTH')
    lier(mat, sxy.outputs['Vector'], lg.inputs[0])
    return lg.outputs['Value']


def plage(mat, valeur, a, b):
    mr = noeud(mat, 'ShaderNodeMapRange')
    mr.inputs['From Min'].default_value = a
    mr.inputs['From Max'].default_value = b
    lier(mat, valeur, mr.inputs['Value'])
    return mr.outputs['Result']


def melange(mat, fac, c1, c2, mode='MIX'):
    m = noeud(mat, 'ShaderNodeMixRGB', blend_type=mode)
    if isinstance(fac, float):
        m.inputs['Fac'].default_value = fac
    else:
        lier(mat, fac, m.inputs['Fac'])
    for i, c in ((1, c1), (2, c2)):
        if isinstance(c, tuple):
            m.inputs[i].default_value = (*L(c), 1)
        else:
            lier(mat, c, m.inputs[i])
    return m.outputs['Color']


def creux(mat):
    """Pointiness (Cycles) : 0 dans les creux, 1 sur les arêtes vives."""
    g = noeud(mat, 'ShaderNodeNewGeometry')
    return plage(mat, g.outputs['Pointiness'], 0.47, 0.56)


# ================================================================ la scène : planche, table, mur, monde, lumières
bpy.ops.import_scene.gltf(filepath=f'{PH}/board.gltf')
planche = [o for o in bpy.context.selected_objects if o.type == 'MESH'][0]
S_PL = 0.78
planche.scale = (S_PL,) * 3
planche.rotation_euler = (0, 0, math.radians(4))
Z0 = 0.0413 * S_PL  # le dessus de la planche
for m in planche.data.materials:
    nt = m.node_tree
    bsdf = nt.nodes.get('Principled BSDF')
    lien = bsdf.inputs['Base Color'].links[0]
    src = lien.from_socket
    nt.links.remove(lien)
    mul = nt.nodes.new('ShaderNodeMixRGB')
    mul.blend_type = 'MULTIPLY'
    mul.inputs['Fac'].default_value = 1
    mul.inputs['Color2'].default_value = (*L((0.42, 0.3, 0.22)), 1)  # bois foncé
    nt.links.new(src, mul.inputs['Color1'])
    nt.links.new(mul.outputs['Color'], bsdf.inputs['Base Color'])

bpy.ops.mesh.primitive_plane_add(size=3, location=(0, 0.4, 0))
table = bpy.context.active_object
mt, bt = principled('table', Roughness=0.6)


def image(mat, f, donnees=False):
    n = noeud(mat, 'ShaderNodeTexImage')
    n.image = bpy.data.images.load(f'{PH}/{f}')
    if donnees:
        n.image.colorspace_settings.name = 'Non-Color'
    return n


uvm = noeud(mt, 'ShaderNodeMapping')
uvm.inputs['Scale'].default_value = (2.2, 2.2, 2.2)
lier(mt, coord_uv(mt), uvm.inputs['Vector'])
td = image(mt, 'dark_wooden_planks_diff_2k.jpg')
tn = image(mt, 'dark_wooden_planks_nor_gl_2k.jpg', True)
tr = image(mt, 'dark_wooden_planks_rough_2k.jpg', True)
for t in (td, tn, tr):
    lier(mt, uvm.outputs['Vector'], t.inputs['Vector'])
lier(mt, melange(mt, 1.0, td.outputs['Color'], (0.5, 0.42, 0.36), 'MULTIPLY'), bt.inputs['Base Color'])
lier(mt, tr.outputs['Color'], bt.inputs['Roughness'])
nm = noeud(mt, 'ShaderNodeNormalMap')
lier(mt, tn.outputs['Color'], nm.inputs['Color'])
lier(mt, nm.outputs['Normal'], bt.inputs['Normal'])
table.data.materials.append(mt)

bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0.75, 1.0), rotation=(math.radians(90), 0, 0))
mur = bpy.context.active_object
mur.data.materials.append(principled('mur', (0.05, 0.035, 0.028), Roughness=0.9)[0])

w = bpy.data.worlds.new('monde')
sc.world = w
w.use_nodes = True
nt = w.node_tree
env = nt.nodes.new('ShaderNodeTexEnvironment')
env.image = bpy.data.images.load(f'{PH}/brown_photostudio_02_2k.hdr')
fond = nt.nodes['Background']
fond.inputs['Strength'].default_value = 0.22
nt.links.new(env.outputs['Color'], fond.inputs['Color'])
lp = nt.nodes.new('ShaderNodeLightPath')
noir = nt.nodes.new('ShaderNodeBackground')
noir.inputs['Color'].default_value = (0.004, 0.003, 0.002, 1)
mix = nt.nodes.new('ShaderNodeMixShader')
nt.links.new(lp.outputs['Is Camera Ray'], mix.inputs['Fac'])
nt.links.new(fond.outputs[0], mix.inputs[1])
nt.links.new(noir.outputs[0], mix.inputs[2])
nt.links.new(mix.outputs[0], nt.nodes['World Output'].inputs['Surface'])


def lampe(nom, pos, vise, energie, couleur, taille):
    li = bpy.data.lights.new(nom, 'AREA')
    li.energy = energie
    li.color = couleur
    li.size = taille
    o = bpy.data.objects.new(nom, li)
    col.objects.link(o)
    o.location = pos
    o.rotation_euler = (Vector(vise) - Vector(pos)).to_track_quat('-Z', 'Y').to_euler()
    return o


# ================================================================ poser sur ce qu'il y a dessous
def hauteur(x, y, defaut=None):
    """Hauteur du dessus de la pile en (x, y) : rayon lancé vers le bas sur la scène (planche comprise)."""
    ok, loc, *_ = sc.ray_cast(bpy.context.evaluated_depsgraph_get(), Vector((x, y, 0.6)), Vector((0, 0, -1)))
    return loc.z if ok else (defaut if defaut is not None else Z0)


def niveau(rayon=0.022):
    """Le dessus moyen de la pile au centre."""
    maj()
    zs = [hauteur(0, 0)] + [hauteur(math.cos(a) * rayon, math.sin(a) * rayon) for a in [i * math.pi / 4 for i in range(8)]]
    return sum(zs) / len(zs)


def niveau_haut():
    """Pour le pain du dessus : il repose sur ce qui dépasse le plus (80e centile d'un échantillonnage dense)."""
    maj()
    zs = [hauteur(0, 0)]
    for rr in (0.012, 0.024, 0.036):
        zs += [hauteur(math.cos(a) * rr, math.sin(a) * rr) for a in [i * math.pi / 6 for i in range(12)]]
    zs.sort()
    return zs[int(len(zs) * 0.95)]


def draper(bm, ecart, bord, tombe=60.0, relief=True):
    """Pose les sommets (x, y, relief z) sur la pile : ils épousent le dessus ; au-delà du rayon `bord`, ils retombent
    doucement au lieu de plonger."""
    maj()
    zref = niveau()
    for v in bm.verts:
        r = math.hypot(v.co.x, v.co.y)
        zh = hauteur(v.co.x, v.co.y)
        z_doux = zref - tombe * max(0, r - bord) ** 2
        v.co.z = max(zh, z_doux) + ecart + (v.co.z if relief else 0)


def poser_points(pts, ecart, bord, tombe=30.0):
    """Pose une ligne (le centre d'un tube) sur la pile : le tube garde sa section au lieu d'être écrasé."""
    maj()
    zref = niveau()
    out = []
    for p in pts:
        r = math.hypot(p.x, p.y)
        z = max(hauteur(p.x, p.y), zref - tombe * max(0, r - bord) ** 2)
        out.append(Vector((p.x, p.y, z + ecart + p.z)))
    # lissage léger de la hauteur (pas de marches sur les bords des ingrédients)
    for _ in range(3):
        out = [out[0]] + [Vector((q.x, q.y, max(q.z, (a.z + q.z + b.z) / 3))) for a, q, b in zip(out, out[1:], out[2:])] + [out[-1]]
    return out


def tube(bm, points, rayon, cotes=8, aplati=1.0, uv=None):
    """Tube le long d'une suite de points (rayon : nombre ou fonction de u)."""
    prev = None
    n = len(points)
    couche_uv = bm.loops.layers.uv.verify()
    anneaux = []
    for i, c in enumerate(points):
        u = i / (n - 1)
        t = (points[min(n - 1, i + 1)] - points[max(0, i - 1)]).normalized()
        a1 = t.cross(Vector((0, 0, 1)))
        if a1.length < 1e-6:
            a1 = Vector((1, 0, 0))
        a1.normalize()
        a2 = t.cross(a1).normalized()
        ra = rayon(u) if callable(rayon) else rayon
        ring = [bm.verts.new(c + a1 * math.cos(2 * math.pi * k / cotes) * ra + a2 * math.sin(2 * math.pi * k / cotes) * ra * aplati) for k in range(cotes)]
        if prev:
            for k in range(cotes):
                f = bm.faces.new((prev[k], prev[(k + 1) % cotes], ring[(k + 1) % cotes], ring[k]))
                for l, (uu, vv) in zip(f.loops, (((i - 1) / (n - 1), k / cotes), ((i - 1) / (n - 1), (k + 1) / cotes), (u, (k + 1) / cotes), (u, k / cotes))):
                    l[couche_uv].uv = (uu, vv)
        prev = ring
        anneaux.append(ring)
    bm.faces.new(anneaux[0][::-1])
    bm.faces.new(anneaux[-1])


def nappe_uv(bm, nu, nv, f):
    """Grille (u, v) ∈ [0,1]² → points f(u, v), avec les coordonnées de texture (u, v)."""
    couche_uv = bm.loops.layers.uv.verify()
    vs = [[bm.verts.new(f(i / nu, j / nv)) for j in range(nv + 1)] for i in range(nu + 1)]
    for i in range(nu):
        for j in range(nv):
            fa = bm.faces.new((vs[i][j], vs[i + 1][j], vs[i + 1][j + 1], vs[i][j + 1]))
            for l, (a, b) in zip(fa.loops, ((i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1))):
                l[couche_uv].uv = (a / nu, b / nv)
    return vs


def pres(objs, marge=0.03):
    """Les objets de la pile dont le dessus est à moins de `marge` sous le niveau actuel (pour les collisions)."""
    z = niveau()
    return [o for o in objs if o.type == 'MESH' and max((o.matrix_world @ Vector(c)).z for c in o.bound_box) > z - marge]


# ================================================================ les ingrédients
R = 0.055  # rayon du pain


def pain_bas():
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=96, radius1=R * 0.97, radius2=R, depth=0.022)
    mp, bp = principled('pain_bas', Roughness=0.55, Coat_Weight=0.15, Subsurface_Weight=0.15, Subsurface_Scale=0.004)
    bp.inputs['Subsurface Radius'].default_value = (1, 0.6, 0.3)
    r = rampe(mp, [(0.25, (0.6, 0.34, 0.13)), (0.5, (0.72, 0.46, 0.2)), (0.75, (0.84, 0.6, 0.32))])
    lier(mp, bruit(mp, 120).outputs['Fac'], r.inputs['Fac'])
    lier(mp, r.outputs['Color'], bp.inputs['Base Color'])
    bosses(mp, bp, 300, 0.45, 0.0012, 10)
    o = nouvel_objet('pain_bas', bm, mp)
    o.location = (0, 0, Z0 + 0.011)
    bv = o.modifiers.new('biseau', 'BEVEL')
    bv.width = 0.0075
    bv.segments = 6
    bv.limit_method = 'ANGLE'
    modif_subdiv(o, 2)
    modif_deplace(o, texture_bruit('t_talon', 'CLOUDS', 0.012, 3), 0.0026)
    modif_deplace(o, texture_bruit('t_talon2', 'CLOUDS', 0.0025, 2), 0.0006)
    lisse(o)
    return o


def mat_steak():
    ms, bs = principled('steak', Roughness=0.42, Coat_Weight=0.25, Coat_Roughness=0.35)
    n1 = bruit(ms, 90, 10)
    r = rampe(ms, [(0.3, (0.1, 0.05, 0.03)), (0.45, (0.24, 0.12, 0.06)), (0.58, (0.42, 0.22, 0.1)), (0.68, (0.6, 0.34, 0.14)), (0.78, (0.7, 0.45, 0.2))])
    lier(ms, n1.outputs['Fac'], r.inputs['Fac'])
    cuit = melange(ms, plage(ms, rayon_xy(ms), 0.062 * 0.72, 0.062 * 1.05), r.outputs['Color'], (0.42, 0.3, 0.24), 'MULTIPLY')
    lier(ms, cuit, bs.inputs['Base Color'])
    rr = rampe(ms, [(0.4, (0.25, 0.25, 0.25)), (0.65, (0.6, 0.6, 0.6))])
    lier(ms, n1.outputs['Fac'], rr.inputs['Fac'])
    lier(ms, rr.outputs['Color'], bs.inputs['Roughness'])
    bosses(ms, bs, 220, 1.0, 0.002, 14)
    return ms


MATS = {}


def mat(nom, fabrique):
    if nom not in MATS:
        MATS[nom] = fabrique()
    return MATS[nom]


def steak(graine=0, rs=0.062, epaisseur=0.012):
    """Steak smashé : contour irrégulier écrasé à la spatule, bord fin en dentelle croustillante."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=192, radius1=rs, radius2=rs * 0.96, depth=epaisseur)
    for f in [f for f in bm.faces if len(f.verts) > 4]:
        bmesh.ops.inset_region(bm, faces=[f], thickness=0.006)
        bmesh.ops.inset_region(bm, faces=[f], thickness=0.01)
    for v in bm.verts:
        a = math.atan2(v.co.y, v.co.x)
        r = math.hypot(v.co.x, v.co.y)
        bord = max(0, (r - rs * 0.7) / (rs * 0.3))
        k = 1 + bord * (0.13 * noise.noise(Vector((math.cos(a) * 1.7, math.sin(a) * 1.7, 3.1 + graine))) + 0.07 * noise.noise(Vector((math.cos(a) * 7, math.sin(a) * 7, 1.3 + graine))) + 0.045 * noise.noise(Vector((math.cos(a) * 24, math.sin(a) * 24, v.co.z * 400 + graine))))
        v.co.x *= k
        v.co.y *= k
        v.co.z *= 1 - 0.55 * bord ** 1.5
    o = nouvel_objet('steak', bm, mat('steak', mat_steak))
    o.location = (0, 0, niveau() + epaisseur / 2 - 0.0006)
    o.rotation_euler = (0, 0, graine * 1.3)
    modif_subdiv(o, 2)
    modif_deplace(o, texture_bruit(f't_steak{graine}', 'CLOUDS', 0.004, 4), 0.0032)
    modif_deplace(o, texture_bruit(f't_steak2{graine}', 'VORONOI', 0.0022), 0.0016)
    modif_deplace(o, texture_bruit(f't_steak3{graine}', 'CLOUDS', 0.0012, 2), 0.0009)
    lisse(o)
    return o


def mat_cheddar():
    mc, bc = principled('cheddar', (0.98, 0.6, 0.1), Roughness=0.32, Subsurface_Weight=0.35, Subsurface_Scale=0.003, Coat_Weight=0.4, Coat_Roughness=0.12)
    bc.inputs['Subsurface Radius'].default_value = (1.0, 0.45, 0.1)
    bosses(mc, bc, 160, 0.12, 0.0005, 3)
    return mc


def simuler_tissu(o, supports, images, masse=0.012, flexion=0.004, distance=0.0005):
    for s in supports:
        c = s.modifiers.new('collision', 'COLLISION')
        s.collision.thickness_outer = distance
        s.collision.cloth_friction = 8
        s.collision.damping = 1
    t = o.modifiers.new('tissu', 'CLOTH')
    cs = t.settings
    cs.quality = 14
    cs.mass = masse
    cs.tension_stiffness = cs.compression_stiffness = 3
    cs.shear_stiffness = 2
    cs.bending_stiffness = flexion
    cs.air_damping = 2
    t.collision_settings.distance_min = distance
    t.collision_settings.collision_quality = 4
    t.collision_settings.use_self_collision = False
    t.point_cache.frame_start = 1
    t.point_cache.frame_end = images
    sc.frame_start, sc.frame_end = 1, images
    sc.frame_set(0)
    for f in range(1, images + 1):
        sc.frame_set(f)
    appliquer(o)
    for s in supports:
        s.modifiers.remove(s.modifiers['collision'])
    sc.frame_set(1)


def coulures(mb, nappe, support, angles, epais=0.0032, z_min=None):
    """Coulures qui partent du bord de la nappe (simulée), passent par-dessus le bord du support et descendent le long
    de son flanc ; la goutte grossit au bout."""
    dg = maj()
    sup = support.evaluated_get(dg)
    mi = support.matrix_world.inverted()
    mw = nappe.matrix_world
    pts = [mw @ v.co for v in nappe.data.vertices]
    zs = [(support.matrix_world @ Vector(c)).z for c in support.bound_box]
    z_haut, z_bas = max(zs), min(zs)
    z_min = z_bas - 0.003 if z_min is None else z_min

    def surface(a, z):
        d = Vector((math.cos(a), math.sin(a), 0))
        org = mi @ (d * 0.15 + Vector((0, 0, z)))
        fin = mi @ (Vector((0, 0, z)))
        ok, loc, *_ = sup.ray_cast(org, (fin - org).normalized())
        return math.hypot(*(support.matrix_world @ loc).xy) if ok else 0.0

    for a, longueur in angles:
        fen = [p for p in pts if abs((math.atan2(p.y, p.x) - a + math.pi) % (2 * math.pi) - math.pi) < 0.05]
        if not fen:
            continue
        p = max(fen, key=lambda p: p.x * math.cos(a) + p.y * math.sin(a))
        ep = epais * random.uniform(0.8, 1.15)
        radial = Vector((math.cos(a), math.sin(a), 0))
        rb = max(surface(a, z_haut - 0.002 - k * 0.0015) for k in range(6)) + 0.0014
        r0 = p.x * math.cos(a) + p.y * math.sin(a)
        rb = max(rb, r0)
        z_bord = min(p.z, z_haut - 0.0015)
        bas = max(z_min, z_bord - longueur)
        rot = Matrix.Rotation(a - math.pi / 2, 4, 'Z').to_quaternion()
        for k in range(6):
            u = k / 5
            boule(mb, radial * (r0 + (rb - r0) * u) + Vector((0, 0, p.z + (z_bord - p.z) * u * u)), ep, 1.6, 0.6, 1.2, rot)
        for k in range(1, 11):
            u = k / 10
            boule(mb, radial * (rb + 0.0004 * math.sin(u * math.pi)) + Vector((0, 0, z_bord + (bas - z_bord) * u)), (ep * (1 - 0.45 * u) + (0.0011 if k == 10 else 0)), 1.6 - 0.75 * u, 0.6, 1.2, rot)


def cheddar(support, angles, cote=0.108, rot=24, couleur_mat=None, images=30):
    """Tranche de cheddar simulée comme un tissu, qui retombe sur le support, avec des coulures."""
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=72, y_segments=72, size=cote / 2)
    for v in bm.verts:
        v.co.x += 0.0012 * noise.noise(v.co * 40 + Vector((1, 2, rot)))
        v.co.y += 0.0012 * noise.noise(v.co * 40 + Vector((4, 5, rot)))
        v.co.z = 0.0015 * (1 - (v.co.x ** 2 + v.co.y ** 2) / (cote * cote / 2))
    o = nouvel_objet('cheddar', bm)
    o.location = (0, 0, niveau() + 0.0035)
    o.rotation_euler = (0, 0, math.radians(rot))
    simuler_tissu(o, pres(BURGER[:-1]), images)
    so = o.modifiers.new('epaisseur', 'SOLIDIFY')
    so.thickness = 0.0016
    so.offset = 1
    mb, g = metaballs('coulures_cheddar')
    coulures(mb, o, support, angles)
    g = en_maillage(g)
    o = fusionner('cheddar', [o, g], 0.00032, 4)
    o.data.materials.append(couleur_mat or mat('cheddar', mat_cheddar))
    return o


def mat_bacon():
    m, b = principled('bacon', Roughness=0.38, Coat_Weight=0.35, Coat_Roughness=0.2, Subsurface_Weight=0.15, Subsurface_Scale=0.002)
    b.inputs['Subsurface Radius'].default_value = (1, 0.4, 0.3)
    uv = noeud(m, 'ShaderNodeSeparateXYZ')
    lier(m, coord_uv(m), uv.inputs['Vector'])
    n = bruit(m, 6, 4, coord_uv(m))
    s = noeud(m, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    lier(m, n.outputs['Fac'], s.inputs[0])
    s.inputs[1].default_value = 0.35
    lier(m, uv.outputs['Y'], s.inputs[2])
    # bandes de gras (crème doré) et de maigre (rouge brun) dans la largeur, marbrées
    r = rampe(m, [(0.1, (0.86, 0.62, 0.42)), (0.22, (0.5, 0.15, 0.07)), (0.38, (0.38, 0.1, 0.05)), (0.48, (0.8, 0.52, 0.34)), (0.56, (0.88, 0.66, 0.46)), (0.66, (0.46, 0.13, 0.06)), (0.84, (0.36, 0.1, 0.05)), (0.95, (0.84, 0.58, 0.38))])
    lier(m, s.outputs[0], r.inputs['Fac'])
    # grillé : des zones plus foncées
    n2 = bruit(m, 140, 6)
    cuit = melange(m, plage(m, n2.outputs['Fac'], 0.45, 0.7), r.outputs['Color'], (0.45, 0.25, 0.14), 'MULTIPLY')
    lier(m, cuit, b.inputs['Base Color'])
    bosses(m, b, 260, 0.5, 0.0008, 8)
    return m


def bacon(n=3, longueur=0.115, largeur=0.022, graine=0):
    """Tranches de bacon grillé, ondulées, qui épousent ce qu'il y a dessous et dépassent du pain."""
    rnd = random.Random(30 + graine)
    objs = []
    for i in range(n):
        ang = rnd.uniform(-0.4, 0.4) + i * math.pi / n + graine
        ph = rnd.uniform(0, 6)
        cx, cy = rnd.uniform(-0.008, 0.008), rnd.uniform(-0.01, 0.01)
        ca, sa = math.cos(ang), math.sin(ang)

        def f(u, v):
            x = (u - 0.5) * longueur
            y = (v - 0.5) * largeur * (1 + 0.08 * math.sin(u * 17 + ph))
            z = 0.0022 * math.sin(u * 2 * math.pi * 2.6 + ph) + 0.0007 * math.sin(u * 40 + v * 3) * (abs(v - 0.5) * 2) ** 2
            return Vector((cx + x * ca - y * sa, cy + x * sa + y * ca, z))
        bm = bmesh.new()
        nappe_uv(bm, 110, 12, f)
        draper(bm, 0.0012 + i * 0.0009, R * 0.92, 25)
        o = nouvel_objet(f'bacon{i}', bm, mat('bacon', mat_bacon))
        so = o.modifiers.new('epaisseur', 'SOLIDIFY')
        so.thickness = 0.0017
        so.offset = 0
        modif_deplace(o, texture_bruit(f't_bacon{graine}{i}', 'CLOUDS', 0.003, 3), 0.0008)
        modif_subdiv(o, 1)
        lisse(o)
        objs.append(o)
    return objs


def mat_salade():
    m, b = principled('salade', Roughness=0.3, Subsurface_Weight=0.4, Subsurface_Scale=0.002, Coat_Weight=0.4, Coat_Roughness=0.15)
    b.inputs['Subsurface Radius'].default_value = (0.6, 1.0, 0.3)
    r = rampe(m, [(0.0, (0.88, 0.9, 0.62)), (0.45, (0.68, 0.8, 0.38)), (0.8, (0.45, 0.66, 0.2)), (1.0, (0.32, 0.55, 0.14))])
    v = noeud(m, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    lier(m, plage(m, rayon_xy(m), 0.0, 0.075), v.inputs[0])
    v.inputs[1].default_value = 1
    lier(m, bruit(m, 50, 3).outputs['Fac'], v.inputs[2])
    v2 = noeud(m, 'ShaderNodeMath', operation='SUBTRACT')
    lier(m, v.outputs[0], v2.inputs[0])
    v2.inputs[1].default_value = 0.3
    lier(m, v2.outputs[0], r.inputs['Fac'])
    lier(m, r.outputs['Color'], b.inputs['Base Color'])
    # nervures
    vo = noeud(m, 'ShaderNodeTexVoronoi', feature='DISTANCE_TO_EDGE')
    vo.inputs['Scale'].default_value = 90
    bp = noeud(m, 'ShaderNodeBump')
    bp.inputs['Strength'].default_value = 0.35
    bp.inputs['Distance'].default_value = 0.0008
    lier(m, vo.outputs['Distance'], bp.inputs['Height'])
    lier(m, bp.outputs['Normal'], b.inputs['Normal'])
    return m


def salade(n=2, rayon=0.0655):
    """Feuilles de salade frisées, dont le bord ondulé dépasse du pain."""
    objs = []
    for i in range(n):
        rot = i * 2.1 + 0.4
        ph = i * 3.3

        def f(u, v):
            a = u * 2 * math.pi
            rmax = rayon * (1 + 0.12 * noise.noise(Vector((math.cos(a) * 2, math.sin(a) * 2, ph))) + 0.05 * math.sin(a * 7 + ph))
            r = rmax * v
            amp = 0.0045 * (0.5 + 0.5 * noise.noise(Vector((math.cos(a) * 3, math.sin(a) * 3, ph + 9))))
            z = amp * math.sin(a * 13 + ph + 5 * noise.noise(Vector((math.cos(a) * 1.5, math.sin(a) * 1.5, ph)))) * v ** 3 + 0.0012 * noise.noise(Vector((math.cos(a) * 40 * v, math.sin(a) * 40 * v, ph + 3))) * v ** 2
            return Vector((math.cos(a + rot) * r, math.sin(a + rot) * r, z))
        bm = bmesh.new()
        nappe_uv(bm, 180, 30, f)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
        draper(bm, 0.0008 + i * 0.0012, R * 0.95, 30)
        o = nouvel_objet(f'salade{i}', bm, mat('salade', mat_salade))
        so = o.modifiers.new('epaisseur', 'SOLIDIFY')
        so.thickness = 0.0007
        modif_subdiv(o, 1)
        lisse(o)
        objs.append(o)
    return objs


def mat_tomate():
    m, b = principled('tomate', Roughness=0.2, Subsurface_Weight=0.5, Subsurface_Scale=0.003, Coat_Weight=0.6, Coat_Roughness=0.05)
    b.inputs['Subsurface Radius'].default_value = (1, 0.3, 0.2)
    co = noeud(m, 'ShaderNodeSeparateXYZ')
    lier(m, coord_objet(m), co.inputs['Vector'])
    at = noeud(m, 'ShaderNodeMath', operation='ARCTAN2')
    lier(m, co.outputs['Y'], at.inputs[0])
    lier(m, co.outputs['X'], at.inputs[1])
    s5 = noeud(m, 'ShaderNodeMath', operation='MULTIPLY')
    lier(m, at.outputs[0], s5.inputs[0])
    s5.inputs[1].default_value = 5
    si = noeud(m, 'ShaderNodeMath', operation='SINE')
    lier(m, s5.outputs[0], si.inputs[0])
    rr = rayon_xy(m)
    anneau = noeud(m, 'ShaderNodeMath', operation='MULTIPLY')
    lier(m, plage(m, si.outputs[0], 0.1, 0.5), anneau.inputs[0])
    t1 = plage(m, rr, 0.011, 0.016)
    t2 = noeud(m, 'ShaderNodeMath', operation='SUBTRACT')
    t2.inputs[0].default_value = 1
    lier(m, plage(m, rr, 0.028, 0.033), t2.inputs[1])
    mi = noeud(m, 'ShaderNodeMath', operation='MINIMUM')
    lier(m, t1, mi.inputs[0])
    lier(m, t2.outputs[0], mi.inputs[1])
    lier(m, mi.outputs[0], anneau.inputs[1])
    vo = noeud(m, 'ShaderNodeTexVoronoi')
    vo.inputs['Scale'].default_value = 260
    pepins = melange(m, plage(m, vo.outputs['Distance'], 0.25, 0.1), (0.95, 0.42, 0.22), (0.95, 0.8, 0.45))
    chair = melange(m, plage(m, rr, 0.036, 0.041), (0.8, 0.2, 0.12), (0.66, 0.1, 0.06))
    lier(m, melange(m, anneau.outputs[0], chair, pepins), b.inputs['Base Color'])
    bosses(m, b, 120, 0.1, 0.0005, 3)
    return m


def tomate(n=2):
    objs = []
    for i in range(n):
        bm = bmesh.new()
        bmesh.ops.create_cone(bm, cap_ends=True, segments=96, radius1=0.042, radius2=0.042, depth=0.006)
        for v in bm.verts:
            a = math.atan2(v.co.y, v.co.x)
            k = 1 + 0.04 * noise.noise(Vector((math.cos(a) * 2, math.sin(a) * 2, i * 5)))
            v.co.x *= k
            v.co.y *= k
        o = nouvel_objet(f'tomate{i}', bm, mat('tomate', mat_tomate))
        a = i * math.pi + 0.5
        o.location = (math.cos(a) * 0.018, math.sin(a) * 0.018 - 0.008, niveau() + 0.0032)
        o.rotation_euler = (random.uniform(-0.05, 0.05), random.uniform(-0.05, 0.05), random.uniform(0, 6))
        bv = o.modifiers.new('b', 'BEVEL')
        bv.width = 0.0012
        bv.segments = 3
        bv.limit_method = 'ANGLE'
        modif_subdiv(o, 1)
        lisse(o)
        objs.append(o)
    return objs


def mat_poulet_pane():
    m, b = principled('poulet_pane', Roughness=0.55, Coat_Weight=0.2, Coat_Roughness=0.3)
    r = rampe(m, [(0.0, (0.36, 0.17, 0.05)), (0.3, (0.6, 0.33, 0.1)), (0.55, (0.8, 0.52, 0.2)), (0.8, (0.9, 0.68, 0.34)), (1.0, (0.96, 0.82, 0.5))])
    v = noeud(m, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    lier(m, creux(m), v.inputs[0])
    v.inputs[1].default_value = 0.6
    lier(m, bruit(m, 70, 6).outputs['Fac'], v.inputs[2])
    v2 = noeud(m, 'ShaderNodeMath', operation='SUBTRACT')
    lier(m, v.outputs[0], v2.inputs[0])
    v2.inputs[1].default_value = 0.25
    lier(m, v2.outputs[0], r.inputs['Fac'])
    lier(m, r.outputs['Color'], b.inputs['Base Color'])
    bosses(m, b, 500, 0.5, 0.0006, 6, 'voronoi')
    return m


def poulet_pane():
    """Filet de poulet pané : ovale plus large que le pain, chapelure en gros éclats croustillants."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=128, radius1=0.058, radius2=0.055, depth=0.015)
    for v in bm.verts:
        a = math.atan2(v.co.y, v.co.x)
        k = 1 + 0.1 * noise.noise(Vector((math.cos(a) * 1.5, math.sin(a) * 1.5, 9.1))) + 0.04 * noise.noise(Vector((math.cos(a) * 6, math.sin(a) * 6, 2.0)))
        v.co.x *= k * 1.12
        v.co.y *= k * 0.95
    o = nouvel_objet('poulet_pane', bm, mat('poulet_pane', mat_poulet_pane))
    o.location = (0.002, 0, niveau() + 0.0072)
    o.rotation_euler = (0.02, -0.03, 0.35)
    bv = o.modifiers.new('b', 'BEVEL')
    bv.width = 0.006
    bv.segments = 5
    bv.limit_method = 'ANGLE'
    modif_subdiv(o, 3)
    modif_deplace(o, texture_bruit('t_pane', 'CLOUDS', 0.008, 3), 0.004)
    modif_deplace(o, texture_bruit('t_pane1', 'VORONOI', 0.0035), 0.0032)
    modif_deplace(o, texture_bruit('t_pane2', 'VORONOI', 0.0014), 0.0016)
    modif_deplace(o, texture_bruit('t_pane3', 'CLOUDS', 0.0007, 2), 0.0007)
    lisse(o)
    return o


def mat_poulet_grille():
    m, b = principled('poulet_grille', Roughness=0.45, Coat_Weight=0.3, Coat_Roughness=0.25, Subsurface_Weight=0.1, Subsurface_Scale=0.003)
    r = rampe(m, [(0.3, (0.7, 0.48, 0.28)), (0.6, (0.86, 0.66, 0.44)), (0.8, (0.9, 0.74, 0.54))])
    lier(m, bruit(m, 60, 6).outputs['Fac'], r.inputs['Fac'])
    mp = noeud(m, 'ShaderNodeMapping')
    mp.inputs['Rotation'].default_value = (0, 0, math.radians(35))
    lier(m, coord_objet(m), mp.inputs['Vector'])
    wv = noeud(m, 'ShaderNodeTexWave', wave_type='BANDS', bands_direction='X')
    wv.inputs['Scale'].default_value = 26  # une marque de grill tous les 12 mm
    wv.inputs['Distortion'].default_value = 2
    wv.inputs['Detail'].default_value = 3
    lier(m, mp.outputs['Vector'], wv.inputs['Vector'])
    marques = plage(m, wv.outputs['Fac'], 0.82, 0.95)
    c = melange(m, marques, r.outputs['Color'], (0.2, 0.09, 0.04))
    lier(m, c, b.inputs['Base Color'])
    bosses(m, b, 150, 0.35, 0.001, 6)
    return m


def poulet_grille():
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=128, radius1=0.052, radius2=0.05, depth=0.013)
    for v in bm.verts:
        a = math.atan2(v.co.y, v.co.x)
        k = 1 + 0.08 * noise.noise(Vector((math.cos(a) * 1.4, math.sin(a) * 1.4, 4.4)))
        v.co.x *= k * 1.2
        v.co.y *= k * 0.92
    o = nouvel_objet('poulet_grille', bm, mat('poulet_grille', mat_poulet_grille))
    o.location = (0, 0.002, niveau() + 0.0062)
    o.rotation_euler = (0.02, 0.03, -0.4)
    bv = o.modifiers.new('b', 'BEVEL')
    bv.width = 0.006
    bv.segments = 5
    bv.limit_method = 'ANGLE'
    modif_subdiv(o, 2)
    modif_deplace(o, texture_bruit('t_grille', 'CLOUDS', 0.012, 3), 0.003)
    modif_deplace(o, texture_bruit('t_grille2', 'CLOUDS', 0.003, 2), 0.0008)
    lisse(o)
    return o


def mat_oignon(rouge):
    m, b = principled('oignon_rouge' if rouge else 'oignon', Roughness=0.25, Subsurface_Weight=0.45, Subsurface_Scale=0.0015, Coat_Weight=0.5, Coat_Roughness=0.1)
    b.inputs['Subsurface Radius'].default_value = (1.0, 0.9, 0.65) if not rouge else (1.0, 0.6, 0.9)
    if rouge:
        # la peau violette sur l'extérieur de l'anneau, l'intérieur blanc rosé
        uv = noeud(m, 'ShaderNodeSeparateXYZ')
        lier(m, coord_uv(m), uv.inputs['Vector'])
        r = rampe(m, [(0.0, (0.5, 0.12, 0.35)), (0.12, (0.62, 0.22, 0.45)), (0.3, (0.92, 0.82, 0.86)), (0.7, (0.92, 0.82, 0.86)), (0.88, (0.62, 0.22, 0.45)), (1.0, (0.5, 0.12, 0.35))])
        lier(m, uv.outputs['Y'], r.inputs['Fac'])
        lier(m, r.outputs['Color'], b.inputs['Base Color'])
    else:
        b.inputs['Base Color'].default_value = (*L((0.94, 0.91, 0.82)), 1)
    return m


def oignons(groupes, rouge=False, epais=0.0011):
    objs = []
    z = niveau()
    for t, (cx, cy, rayons) in enumerate(groupes):
        for j, rr_ in enumerate(rayons):
            arc = random.uniform(1.1, 1.8) * math.pi
            debut = random.uniform(0, 2 * math.pi)
            n = 72
            pts = []
            for i in range(n + 1):
                a = debut + arc * i / n
                rl = rr_ * (1 + 0.04 * noise.noise(Vector((math.cos(a) * 3, math.sin(a) * 3, t + j))))
                pts.append(Vector((cx + math.cos(a) * rl, cy + math.sin(a) * rl, 0)))
            bm = bmesh.new()
            pts = poser_points(pts, 0.0009 + j * 0.0004 + epais * 0.5, R * 0.95, 20)
            tube(bm, pts, lambda u: epais * (0.4 + 0.6 * min(1, u * 12, (1 - u) * 12)), 8, 0.55)
            o = nouvel_objet(f'oignon{t}{j}', bm, mat('oignon_r' if rouge else 'oignon', lambda: mat_oignon(rouge)))
            modif_subdiv(o, 1)
            lisse(o)
            objs.append(o)
    return objs


def mat_sauce(nom, couleur, herbes=False):
    m, b = principled(nom, couleur, Roughness=0.22, Subsurface_Weight=0.35, Subsurface_Scale=0.002, Coat_Weight=0.7, Coat_Roughness=0.06)
    b.inputs['Subsurface Radius'].default_value = (1, 0.8, 0.6)
    if herbes:
        vo = noeud(m, 'ShaderNodeTexVoronoi')
        vo.inputs['Scale'].default_value = 900
        lier(m, melange(m, plage(m, vo.outputs['Distance'], 0.16, 0.08), couleur, (0.12, 0.3, 0.06)), b.inputs['Base Color'])
    bosses(m, b, 90, 0.08, 0.0004, 2)
    return m


def sauce(materiau, rayon=0.053, gouttes=((-1.95, 0.008), (-1.2, 0.005), (-0.55, 0.004))):
    """Nappe de sauce aux bords irréguliers qui déborde un peu, avec des coulures."""
    ph = random.uniform(0, 10)

    def rs(a):
        return rayon + 0.006 * noise.noise(Vector((math.cos(a) * 2.2, math.sin(a) * 2.2, ph))) + 0.0025 * noise.noise(Vector((math.cos(a) * 9, math.sin(a) * 9, ph + 2)))

    def f(u, v):
        a = u * 2 * math.pi
        r = rs(a) * max(v, 0.001)
        return Vector((math.cos(a) * r, math.sin(a) * r, 0.0006 * (1 - v * v)))
    bm = bmesh.new()
    nappe_uv(bm, 160, 26, f)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    draper(bm, 0.0007, 0.045, 60)
    o = nouvel_objet('sauce_nappe', bm)
    so = o.modifiers.new('epaisseur', 'SOLIDIFY')
    so.thickness = 0.0016
    so.offset = 0
    mb, g = metaballs('coulures_sauce')
    for a, longueur in gouttes:
        r0 = rs(a) - 0.0012
        x, y = math.cos(a) * r0, math.sin(a) * r0
        z0 = max(hauteur(x, y), niveau() - 60 * max(0, r0 - 0.045) ** 2) + 0.0007
        for k in range(11):
            u = k / 10
            boule(mb, (math.cos(a) * (r0 + 0.0012 * u), math.sin(a) * (r0 + 0.0012 * u), z0 - longueur * u), 0.0028 * (1 - 0.4 * u) + (0.0009 if k == 10 else 0), 0.8, 0.8, 1.2)
    g = en_maillage(g)
    o = fusionner('sauce', [o, g], 0.00032, 4)
    o.data.materials.append(materiau)
    return o


def mat_champignon():
    m, b = principled('champignon', Roughness=0.3, Coat_Weight=0.55, Coat_Roughness=0.12, Subsurface_Weight=0.15, Subsurface_Scale=0.002)
    r = rampe(m, [(0.0, (0.3, 0.2, 0.12)), (0.4, (0.5, 0.36, 0.24)), (0.7, (0.68, 0.54, 0.4)), (1.0, (0.78, 0.66, 0.52))])
    v = noeud(m, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    lier(m, creux(m), v.inputs[0])
    v.inputs[1].default_value = -0.7
    lier(m, bruit(m, 120, 5).outputs['Fac'], v.inputs[2])
    v2 = noeud(m, 'ShaderNodeMath', operation='ADD')
    lier(m, v.outputs[0], v2.inputs[0])
    v2.inputs[1].default_value = 0.45
    lier(m, v2.outputs[0], r.inputs['Fac'])
    lier(m, r.outputs['Color'], b.inputs['Base Color'])
    bosses(m, b, 300, 0.25, 0.0005, 5)
    return m


def champignons(n=14):
    """Lamelles de champignons de Paris poêlées (coupe : chapeau + pied), en tas."""
    objs = []
    for i in range(n):
        h = random.uniform(0.026, 0.034)
        lc = h * random.uniform(0.9, 1.1)
        contour = []
        # chapeau (demi-ellipse) puis pied
        for k in range(25):
            t = math.pi * k / 24
            contour.append((math.cos(t) * lc / 2, h * 0.45 + math.sin(t) * h * 0.55))
        ps = lc * 0.18
        contour += [(-lc / 2, h * 0.45), (-lc * 0.36, h * 0.38), (-ps, h * 0.34), (-ps * 1.1, 0), (ps * 1.1, 0), (ps, h * 0.34), (lc * 0.36, h * 0.38), (lc / 2, h * 0.45)]
        bm = bmesh.new()
        vs = [bm.verts.new((x, y - h / 2, 0)) for x, y in contour[:-1]]
        f = bm.faces.new(vs)
        ex = bmesh.ops.extrude_face_region(bm, geom=[f])
        bmesh.ops.translate(bm, verts=[e for e in ex['geom'] if isinstance(e, bmesh.types.BMVert)], vec=(0, 0, 0.0028))
        bmesh.ops.triangulate(bm, faces=bm.faces)
        o = nouvel_objet(f'champignon{i}', bm, mat('champignon', mat_champignon))
        a = random.uniform(0, 2 * math.pi)
        r = random.uniform(0.0, 0.04) if i > 4 else 0.046
        if i <= 4:
            a = -math.pi / 2 + (i - 2) * 0.5
        x, y = math.cos(a) * r, math.sin(a) * r
        o.location = (x, y, niveau() + 0.002 + random.uniform(0, 0.004) + (i % 3) * 0.0015)
        if i <= 4:
            o.location.z = niveau() + h * 0.3
            o.rotation_euler = (1.0 + random.uniform(-0.15, 0.15), random.uniform(-0.2, 0.2), a + math.pi / 2 + random.uniform(-0.2, 0.2))
        else:
            o.rotation_euler = (random.uniform(-0.35, 0.35), random.uniform(-0.35, 0.35), a + math.pi / 2 + random.uniform(-0.6, 0.6))
        bv = o.modifiers.new('b', 'BEVEL')
        bv.width = 0.0009
        bv.segments = 3
        modif_subdiv(o, 1)
        modif_deplace(o, texture_bruit(f't_ch{i}', 'CLOUDS', 0.003, 2), 0.0006)
        lisse(o)
        objs.append(o)
    return objs


def mat_brins(nom, couleurs, croustillant):
    m, b = principled(nom, Roughness=0.55 if croustillant else 0.22, Coat_Weight=0.15 if croustillant else 0.6, Coat_Roughness=0.3 if croustillant else 0.08, Subsurface_Weight=0.1 if croustillant else 0.4, Subsurface_Scale=0.0015)
    b.inputs['Subsurface Radius'].default_value = (1, 0.5, 0.2)
    r = rampe(m, couleurs)
    lier(m, bruit(m, 150, 4).outputs['Fac'], r.inputs['Fac'])
    lier(m, r.outputs['Color'], b.inputs['Base Color'])
    bosses(m, b, 600 if croustillant else 200, 0.6 if croustillant else 0.15, 0.0004, 6)
    return m


def brins(nom, n, materiau, rayon=0.0013, etale=0.042, deborde=0.25, croustillant=False, epais_tas=0.006):
    """Oignons caramélisés ou frits : des lanières fines, courbées, en tas (quelques-unes dépassent)."""
    objs = []
    poses = []
    for i in range(n):
        dehors = random.random() < deborde
        a = random.uniform(-math.pi * 0.95, -math.pi * 0.05) if dehors else random.uniform(0, 2 * math.pi)
        r = random.uniform(0.04, 0.052) if dehors else random.uniform(0, etale)
        c = Vector((math.cos(a) * r, math.sin(a) * r, 0))
        L_ = random.uniform(0.018, 0.034)
        d = random.uniform(0, 2 * math.pi)
        courbe = random.uniform(-90, 90)
        pts = []
        for k in range(28):
            u = k / 27
            dd = d + courbe * (u - 0.5) * 0.05 + 0.4 * math.sin(u * 7 + i)
            pts.append(c + Vector((math.cos(dd) * L_ * (u - 0.5), math.sin(dd) * L_ * (u - 0.5), 0)))
        pts = [p + Vector((0, 0, (i / n) * epais_tas)) for p in pts]
        poses.append(poser_points(pts, 0.0008 + rayon * 0.6, R * 0.95, 30))
    # les objets sont créés après coup : chaque lanière est posée sur la pile d'avant, pas sur les autres lanières
    for i, pts in enumerate(poses):
        bm = bmesh.new()
        tube(bm, pts, lambda u: rayon * (0.5 + 0.5 * min(1, u * 8, (1 - u) * 8)), 6, 0.6)
        o = nouvel_objet(f'{nom}{i}', bm, materiau)
        if croustillant:
            modif_deplace(o, texture_bruit(f't_{nom}{i}', 'CLOUDS', 0.0008, 2), 0.0005)
        lisse(o)
        objs.append(o)
    return objs


def mat_roquette():
    m, b = principled('roquette', Roughness=0.35, Subsurface_Weight=0.3, Subsurface_Scale=0.0015, Coat_Weight=0.35, Coat_Roughness=0.15)
    b.inputs['Subsurface Radius'].default_value = (0.5, 1.0, 0.3)
    uv = noeud(m, 'ShaderNodeSeparateXYZ')
    lier(m, coord_uv(m), uv.inputs['Vector'])
    milieu = noeud(m, 'ShaderNodeMath', operation='ABSOLUTE')
    s = noeud(m, 'ShaderNodeMath', operation='SUBTRACT')
    lier(m, uv.outputs['Y'], s.inputs[0])
    s.inputs[1].default_value = 0.5
    lier(m, s.outputs[0], milieu.inputs[0])
    feuille = melange(m, bruit(m, 80, 3).outputs['Fac'], (0.14, 0.3, 0.05), (0.24, 0.42, 0.09))
    lier(m, melange(m, plage(m, milieu.outputs[0], 0.06, 0.02), feuille, (0.58, 0.72, 0.36)), b.inputs['Base Color'])
    bosses(m, b, 200, 0.2, 0.0004, 3)
    return m


def roquette(n=26):
    """Feuilles de roquette (lobées), éparpillées ; plusieurs dépassent du pain."""
    objs = []
    for i in range(n):
        lg = random.uniform(0.028, 0.042)
        larg = lg * random.uniform(0.28, 0.36)
        lobes = random.randint(3, 5)
        ph = random.uniform(0, 6)
        dehors = i < n * 0.5
        a = random.uniform(-math.pi, 0) if dehors else random.uniform(0, 2 * math.pi)
        r0 = random.uniform(0.025, 0.04) if dehors else random.uniform(0, 0.025)
        d = a + random.uniform(-0.5, 0.5) if dehors else random.uniform(0, 6.28)
        cx, cy = math.cos(a) * r0, math.sin(a) * r0

        def f(u, v):
            w = larg * (math.sin(math.pi * u) ** 0.8) * (0.55 + 0.45 * abs(math.sin(u * lobes * math.pi + ph * 0.1)) * (0.4 + u)) * (1.4 if u > 0.75 else 1)
            x = u * lg
            y = (v - 0.5) * 2 * w
            z = 0.0025 * ((v - 0.5) * 2) ** 2 + 0.002 * math.sin(u * 3 + ph) + 0.0006 * math.sin(u * 30) * abs(v - 0.5)
            return Vector((cx + x * math.cos(d) - y * math.sin(d), cy + x * math.sin(d) + y * math.cos(d), z))
        bm = bmesh.new()
        nappe_uv(bm, 24, 8, f)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-7)
        draper(bm, 0.0008 + (i % 4) * 0.0009, R * 0.92, 12)
        o = nouvel_objet(f'roquette{i}', bm, mat('roquette', mat_roquette))
        so = o.modifiers.new('epaisseur', 'SOLIDIFY')
        so.thickness = 0.0004
        modif_subdiv(o, 1)
        lisse(o)
        objs.append(o)
    return objs


def mat_avocat():
    m, b = principled('avocat', Roughness=0.25, Subsurface_Weight=0.35, Subsurface_Scale=0.002, Coat_Weight=0.5, Coat_Roughness=0.08)
    b.inputs['Subsurface Radius'].default_value = (0.7, 1.0, 0.3)
    uv = noeud(m, 'ShaderNodeSeparateXYZ')
    lier(m, coord_uv(m), uv.inputs['Vector'])
    r = rampe(m, [(0.0, (0.36, 0.56, 0.12)), (0.2, (0.56, 0.72, 0.22)), (0.6, (0.78, 0.84, 0.4)), (1.0, (0.88, 0.88, 0.52))])
    lier(m, uv.outputs['Y'], r.inputs['Fac'])
    lier(m, r.outputs['Color'], b.inputs['Base Color'])
    bosses(m, b, 160, 0.1, 0.0004, 3)
    return m


def avocat(n=5):
    """Tranches d'avocat en éventail devant (croissants : peau vert foncé à l'extérieur, chair jaune vert au cœur)."""
    objs = []
    bms = []
    lg, ep = 0.054, 0.014
    for i in range(n):
        def f(u, v):
            # u le long de la tranche, v de la peau (0) vers le cœur (1)
            x = (u - 0.5) * lg
            prof = math.sin(math.pi * u) ** 0.7
            y = -ep * prof * (1 - v) + ep * 0.3 * prof * v + 0.01 * (x / (lg / 2)) ** 2
            return Vector((x, y, 0))
        bm = bmesh.new()
        nappe_uv(bm, 48, 10, f)
        ang = -math.pi / 2 + (i - (n - 1) / 2) * 0.42
        rot = Matrix.Rotation(ang + math.pi / 2, 3, 'Z')
        off = Vector((math.cos(ang), math.sin(ang), 0)) * 0.05
        for v in bm.verts:
            v.co = rot @ v.co + off
        draper(bm, 0.0008, R * 0.96, 30, relief=False)
        bms.append(bm)
    for i, bm in enumerate(bms):
        for v in bm.verts:
            v.co.z += i * 0.0012
        o = nouvel_objet(f'avocat{i}', bm, mat('avocat', mat_avocat))
        so = o.modifiers.new('epaisseur', 'SOLIDIFY')
        so.thickness = 0.007
        so.offset = 1
        bv = o.modifiers.new('b', 'BEVEL')
        bv.width = 0.002
        bv.segments = 3
        bv.limit_method = 'ANGLE'
        modif_subdiv(o, 1)
        lisse(o)
        objs.append(o)
    return objs


def mat_blanc():
    m, b = principled('blanc_oeuf', Roughness=0.3, Subsurface_Weight=0.12, Subsurface_Scale=0.001, Coat_Weight=0.4, Coat_Roughness=0.1)
    b.inputs['Subsurface Radius'].default_value = (1, 0.95, 0.85)
    rr = rayon_xy(m)
    n = bruit(m, 40, 4)
    s = noeud(m, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    lier(m, n.outputs['Fac'], s.inputs[0])
    s.inputs[1].default_value = 0.012
    lier(m, rr, s.inputs[2])
    # dentelle dorée et croustillante sur le bord
    c = rampe(m, [(0.0, (0.97, 0.96, 0.93)), (0.72, (0.95, 0.93, 0.88)), (0.86, (0.92, 0.82, 0.6)), (1.0, (0.66, 0.42, 0.16))])
    lier(m, plage(m, s.outputs[0], 0.035, 0.074), c.inputs['Fac'])
    lier(m, c.outputs['Color'], b.inputs['Base Color'])
    bosses(m, b, 70, 0.2, 0.0008, 4)
    return m


def mat_jaune():
    m, b = principled('jaune_oeuf', (1.0, 0.56, 0.02), Roughness=0.15, Subsurface_Weight=0.6, Subsurface_Scale=0.004, Coat_Weight=0.8, Coat_Roughness=0.04)
    b.inputs['Subsurface Radius'].default_value = (1, 0.5, 0.1)
    return m


NIVEAU_MIN = [0.0]  # hauteur minimale du pain du dessus (l'œuf : le pain repose sur le jaune)


def oeuf():
    """Œuf au plat : le blanc retombe sur le burger (dentelle dorée au bord), le jaune, devant, coule par-dessus le bord."""
    bm = bmesh.new()

    def f(u, v):
        a = u * 2 * math.pi
        rmax = 0.066 * (1 + 0.1 * noise.noise(Vector((math.cos(a) * 1.6, math.sin(a) * 1.6, 4.0))) + 0.05 * noise.noise(Vector((math.cos(a) * 6, math.sin(a) * 6, 1.0))))
        r = rmax * max(v, 0.001)
        return Vector((math.cos(a) * r, math.sin(a) * r - 0.004, 0.0012 * (1 - v ** 2) + 0.0006 * noise.noise(Vector((math.cos(a) * r * 80, math.sin(a) * r * 80, 2.0)))))
    nappe_uv(bm, 140, 36, f)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    draper(bm, 0.0018, R * 0.95, 35)
    blanc = nouvel_objet('blanc_oeuf', bm)
    so = blanc.modifiers.new('epaisseur', 'SOLIDIFY')
    so.thickness = 0.0024
    so.offset = 0
    modif_subdiv(blanc, 1)
    lisse(blanc)
    blanc.data.materials.append(mat_blanc())
    # le jaune, posé sur le blanc vers l'avant, et sa coulure
    maj()
    jx, jy = 0.003, -0.034
    zj = hauteur(jx, jy)
    mb, g = metaballs('jaune')
    boule(mb, (jx, jy, zj + 0.002), 0.028, 1, 1, 0.5)
    NIVEAU_MIN[0] = zj + 0.0085
    a = -math.pi / 2 + 0.2
    d = Vector((math.cos(a), math.sin(a), 0))
    p0 = Vector((jx, jy, 0))
    z_prec = zj
    pb = (p0 + d * 0.014, zj)
    for k in range(1, 40):
        p = p0 + d * (0.014 + k * 0.0015)
        z = hauteur(p.x, p.y)
        if k > 2 and z < z_prec - 0.004:  # le bord : la coulure descend
            break
        z_prec = z
        pb = (p, z)
        boule(mb, (p.x, p.y, z + 0.0012), 0.0085 * (1 - 0.35 * k / 30), 1.2, 1.2, 0.4)
    p, zb = pb
    rot = Matrix.Rotation(a - math.pi / 2, 4, 'Z').to_quaternion()
    for k in range(1, 11):
        u = k / 10
        boule(mb, (p.x + d.x * 0.0018, p.y + d.y * 0.0018, zb - u * 0.012), 0.0045 * (1 - 0.3 * u) + (0.0016 if k == 10 else 0), 1.4, 0.7, 1.2, rot)
    g = en_maillage(g)
    BURGER.append(g)
    lisse(g)
    g.name = 'jaune_oeuf'
    g.data.materials.append(mat_jaune())
    return blanc


def pain_haut():
    z_pose = max(niveau_haut() - 0.0008, NIVEAU_MIN[0])  # avant de créer le pain (sinon les rayons le touchent)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=128, v_segments=64, radius=1)
    for v in [v for v in bm.verts if v.co.z < -0.02]:
        bm.verts.remove(v)
    for v in bm.verts:
        z = max(0, v.co.z)
        v.co.x *= R * 1.03
        v.co.y *= R * 1.03
        v.co.z = 0.042 * z ** 0.72 * (1 + 0.05 * noise.noise(v.co * 30))
    bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary])
    md, bd = principled('pain_haut', Roughness=0.5, Coat_Weight=0.65, Coat_Roughness=0.09, Coat_IOR=1.45, Subsurface_Weight=0.12, Subsurface_Scale=0.004)
    bd.inputs['Subsurface Radius'].default_value = (1, 0.55, 0.25)
    sep = noeud(md, 'ShaderNodeSeparateXYZ')
    lier(md, coord_objet(md), sep.inputs['Vector'])
    haut = noeud(md, 'ShaderNodeMath', operation='MULTIPLY_ADD')
    haut.inputs[1].default_value = 26
    lier(md, sep.outputs['Z'], haut.inputs[0])
    lier(md, bruit(md, 45, 6).outputs['Fac'], haut.inputs[2])
    haut2 = noeud(md, 'ShaderNodeMath', operation='SUBTRACT')
    lier(md, haut.outputs[0], haut2.inputs[0])
    haut2.inputs[1].default_value = 0.35
    r = rampe(md, [(0.0, (0.9, 0.72, 0.45)), (0.1, (0.8, 0.54, 0.25)), (0.32, (0.66, 0.38, 0.13)), (0.75, (0.52, 0.27, 0.08)), (1.0, (0.44, 0.21, 0.06))])
    lier(md, haut2.outputs[0], r.inputs['Fac'])
    lier(md, r.outputs['Color'], bd.inputs['Base Color'])
    bosses(md, bd, 500, 0.12, 0.0008, 4)
    dome = nouvel_objet('pain_haut', bm, md)
    dome.location = (0, 0, z_pose)
    dome.scale = (1, 0.985, 1)
    dome.rotation_euler = (math.radians(1.2), math.radians(-1.5), 0)
    bv = dome.modifiers.new('b', 'BEVEL')
    bv.width = 0.004
    bv.segments = 4
    bv.limit_method = 'ANGLE'
    modif_subdiv(dome, 1)
    modif_deplace(dome, texture_bruit('t_dome', 'CLOUDS', 0.018, 3), 0.0022)
    modif_deplace(dome, texture_bruit('t_dome2', 'CLOUDS', 0.06, 1), 0.004)
    lisse(dome)
    # sésame
    mse, bse = principled('sesame', (0.93, 0.85, 0.66), Roughness=0.38, Subsurface_Weight=0.3, Subsurface_Scale=0.001, Coat_Weight=0.3)
    bse.inputs['Subsurface Radius'].default_value = (1, 0.9, 0.7)
    dg = maj()
    de = dome.evaluated_get(dg)
    mw = dome.matrix_world
    bmg = bmesh.new()
    rnd = random.Random(5)
    n = essais = 0
    while n < 150 and essais < 4000:
        essais += 1
        a = rnd.uniform(0, 2 * math.pi)
        el = math.radians(rnd.uniform(18, 88))
        d = Vector((math.cos(a) * math.cos(el), math.sin(a) * math.cos(el), math.sin(el)))
        ok, loc, nrm, _ = de.ray_cast(d * 0.2, -d)
        if not ok:
            continue
        g = bmesh.new()
        bmesh.ops.create_uvsphere(g, u_segments=10, v_segments=6, radius=1)
        for v in g.verts:
            v.co.x *= 0.00105
            v.co.y *= 0.0019
            v.co.z *= 0.0006
            if v.co.y > 0:
                v.co.x *= 1 - v.co.y / 0.0019 * 0.45
        q = (mw.to_3x3() @ nrm).normalized().to_track_quat('Z', 'Y') @ Matrix.Rotation(rnd.uniform(0, 6.28), 4, 'Z').to_quaternion()
        m4 = Matrix.Translation(mw @ (loc + nrm * 0.0003)) @ q.to_matrix().to_4x4()
        bmesh.ops.transform(g, matrix=m4, verts=g.verts)
        me = bpy.data.meshes.new('tmp')
        g.to_mesh(me)
        g.free()
        bmg.from_mesh(me)
        bpy.data.meshes.remove(me)
        n += 1
    o = nouvel_objet('sesame', bmg, mse)
    lisse(o)
    return dome


# ================================================================ les recettes (de bas en haut)
def classic_smash():
    pain_bas()
    s = steak()
    cheddar(s, [(-1.25, 0.011), (-1.9, 0.006), (-0.7, 0.008), (-2.45, 0.007), (0.5, 0.006), (2.5, 0.007)])
    oignons([(-0.014, -0.038, (0.012, 0.017, 0.021)), (0.018, -0.036, (0.01, 0.015)), (0.004, 0.018, (0.014, 0.02))])
    sauce(mat_sauce('sauce', (0.9, 0.55, 0.32)))
    pain_haut()


def chicken_crispy():
    pain_bas()
    salade(2)
    tomate(2)
    p = poulet_pane()
    cheddar(p, [(-1.35, 0.009), (-2.0, 0.006), (-0.8, 0.007), (0.5, 0.006), (2.6, 0.006)], cote=0.122, rot=10)
    bacon(3)
    oignons([(-0.012, -0.034, (0.013, 0.019, 0.025)), (0.02, -0.03, (0.011, 0.017))], rouge=True, epais=0.0014)
    sauce(mat_sauce('sauce_blanche', (0.95, 0.93, 0.86)), gouttes=((-1.75, 0.009), (-1.1, 0.006), (-2.4, 0.005)))
    pain_haut()


def forestier():
    pain_bas()
    s = steak()
    cheddar(s, [(-1.3, 0.01), (-1.95, 0.007), (-0.75, 0.008), (-2.5, 0.006), (0.6, 0.006)], rot=-12)
    champignons(14)
    brins('oignon_caramel', 60, mat_brins('oignon_caramel', [(0.2, (0.36, 0.16, 0.05)), (0.5, (0.55, 0.28, 0.08)), (0.8, (0.72, 0.44, 0.16))], False), 0.0017, 0.04, 0.45, False, 0.004)
    roquette(20)
    pain_haut()


def double_cheese():
    pain_bas()
    s1 = steak(0, 0.06, 0.011)
    cheddar(s1, [(-1.3, 0.008), (-2.0, 0.005), (-0.7, 0.006), (2.4, 0.005)], rot=20)
    s2 = steak(1, 0.06, 0.011)
    cheddar(s2, [(-1.55, 0.01), (-0.95, 0.006), (-2.3, 0.007), (0.4, 0.006)], rot=-15)
    bacon(3, graine=1)
    brins('oignon_frit', 70, mat_brins('oignon_frit', [(0.2, (0.5, 0.28, 0.08)), (0.5, (0.76, 0.5, 0.18)), (0.85, (0.9, 0.7, 0.34))], True), 0.0011, 0.042, 0.3, True, 0.006)
    pain_haut()


def chicken_avocat():
    pain_bas()
    salade(2)
    poulet_grille()
    avocat(5)
    oignons([(-0.014, -0.03, (0.013, 0.019, 0.024)), (0.02, -0.026, (0.011, 0.016))], rouge=True, epais=0.0014)
    sauce(mat_sauce('sauce_herbes', (0.9, 0.92, 0.8), herbes=True), rayon=0.04, gouttes=((-1.15, 0.006), (-2.0, 0.005)))
    pain_haut()


def egg_bacon():
    pain_bas()
    salade(2)
    s = steak()
    cheddar(s, [(-1.25, 0.009), (-1.9, 0.006), (-0.65, 0.007), (2.5, 0.006)], rot=30)
    bacon(3, graine=2)
    oeuf()
    pain_haut()


{'classic-smash': classic_smash, 'chicken-crispy': chicken_crispy, 'forestier': forestier, 'double-cheese': double_cheese,
 'chicken-avocat': chicken_avocat, 'egg-bacon': egg_bacon}[RECETTE]()
dg = maj()
Z_HAUT = max((o.matrix_world @ Vector(c)).z for o in BURGER for c in o.bound_box)
H = Z_HAUT - Z0
print('HAUTEUR', round(H, 4), 'OBJETS', len(BURGER), flush=True)

# ================================================================ lumières et caméra (cadrées sur la hauteur du burger)
zc = Z0 + H * 0.46
lampe('cle', (-0.42, -0.42, 0.5), (0, 0, zc), 16, (1.0, 0.8, 0.6), 0.42)
lampe('contre', (0.32, 0.38, 0.28), (0, 0, zc + 0.005), 14, (1.0, 0.62, 0.32), 0.25)
lampe('contre2', (-0.3, 0.4, 0.22), (0, 0, zc), 7, (1.0, 0.7, 0.45), 0.2)
lampe('remplissage', (0.45, -0.5, 0.12), (0, 0, zc), 1.5, (1.0, 0.85, 0.7), 0.6)
cam = bpy.data.cameras.new('camera')
cam.lens = float(os.environ.get('FOCALE', 90))
cam.dof.use_dof = True
cam.dof.aperture_fstop = 5.6
cam_o = bpy.data.objects.new('camera', cam)
col.objects.link(cam_o)
k = max(1.0, H / 0.1)
cible = Vector((0, 0, Z0 + H * 0.47))
cam_o.location = (0, -0.5 * k, Z0 + H * 0.47 + 0.04 * k)
if os.environ.get('DESSUS'):  # vue de dessus, sans le pain du dessus (contrôle)
    cam_o.location = (0, -0.12, 0.6)
    for o in BURGER:
        if o.name.startswith(('pain_haut', 'sesame')):
            o.hide_render = True
cam_o.rotation_euler = (cible - cam_o.location).to_track_quat('-Z', 'Y').to_euler()
cam.dof.focus_distance = (cible - cam_o.location).length - 0.03
sc.camera = cam_o

sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = max(1, ECH)
sc.cycles.use_adaptive_sampling = True
sc.cycles.adaptive_threshold = 0.01
sc.cycles.use_denoising = True
sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.denoising_input_passes = 'RGB_ALBEDO_NORMAL'
sc.cycles.max_bounces = 8
sc.cycles.transmission_bounces = 6
sc.render.resolution_x = sc.render.resolution_y = max(LARGEUR, 64)
sc.render.film_transparent = False
sc.view_settings.view_transform = 'Filmic'
sc.view_settings.look = 'Medium High Contrast'
sc.view_settings.exposure = -0.3
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = SORTIE
if BLEND:
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
if LARGEUR > 0:
    bpy.ops.render.render(write_still=True)
    print('RENDU', SORTIE, flush=True)


# ================================================================ export GLB (couleurs cuites dans les sommets)
def exporter(chemin):
    """GLB brut : les ingrédients figés, couleurs procédurales cuites dans les sommets ; allégé et compressé ensuite
    (glTF-Transform : simplification meshoptimizer + Draco)."""
    objs = [o for o in BURGER if o.name in bpy.data.objects]
    for o in objs:
        appliquer(o)
    # cuisson de la couleur (albédo procédural) dans une couleur de sommet — avant tout déplacement (les matériaux
    # utilisent les coordonnées objet)
    sc.cycles.samples = 8
    sc.cycles.use_denoising = False
    sc.render.bake.target = 'VERTEX_COLORS'
    for o in objs:
        if not o.data.materials:
            continue
        o.data.color_attributes.new('Col', 'BYTE_COLOR', 'POINT')
        o.data.color_attributes.active_color = o.data.color_attributes['Col']
        bpy.ops.object.select_all(action='DESELECT')
        o.select_set(True)
        bpy.context.view_layer.objects.active = o
        bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, target='VERTEX_COLORS')
    # allègement (après la cuisson : les couleurs de sommet suivent) : ~300 000 triangles en tout
    total = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objs)
    ratio = min(1.0, 300000 / total)
    print('TRIANGLES', total, 'RATIO', round(ratio, 3), flush=True)
    for o in objs:
        tris = sum(len(p.vertices) - 2 for p in o.data.polygons)
        if ratio < 1 and tris > 3000:
            d = o.modifiers.new('allege', 'DECIMATE')
            d.ratio = max(ratio, 1500 / tris)
            appliquer(o)
    for o in objs:
        o.data.transform(Matrix.Translation((0, 0, -Z0)) @ o.matrix_world)
        o.matrix_world = Matrix.Identity(4)
    # matériaux simples pour le web : couleur de sommet, rugosité et métal du matériau d'origine
    for o in objs:
        if not o.data.materials:
            continue
        src = o.data.materials[0].node_tree.nodes['Principled BSDF']
        mw_, bw = principled('web_' + o.data.materials[0].name)
        ca = noeud(mw_, 'ShaderNodeVertexColor')
        ca.layer_name = 'Col'
        lier(mw_, ca.outputs['Color'], bw.inputs['Base Color'])
        rough = src.inputs['Roughness'].default_value
        coat = src.inputs['Coat Weight'].default_value
        bw.inputs['Roughness'].default_value = max(0.15, rough * (1 - 0.5 * coat))
        o.data.materials.clear()
        o.data.materials.append(mw_)
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=chemin, use_selection=True, export_format='GLB', export_yup=True, export_apply=True,
                              export_normals=True, export_texcoords=False, export_vertex_color='ACTIVE', export_all_vertex_colors=False)
    print('GLB', chemin, os.path.getsize(chemin), flush=True)


if GLB:
    exporter(GLB)

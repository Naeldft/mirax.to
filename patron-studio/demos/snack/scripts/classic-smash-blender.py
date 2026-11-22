"""
Classic Smash de Crunch!, construit et rendu dans Blender (Cycles).
  Avec Blender 4.2 en module Python (pip install bpy==4.2.0, Python 3.11 ; il contient le débruiteur OpenImageDenoise) :
  python classic-smash-blender.py -- <dossier poly haven> <sortie.png> <largeur> <echantillons> [<blend> ou -] [<images de simulation>]
  Assets Poly Haven (CC0) : HDRI brown_photostudio_02, textures dark_wooden_planks, modèle wooden_cutting_board.
  Le cheddar est une tranche simulée comme un tissu qui retombe sur le steak ; nappes et coulures (cheddar, sauce)
  sont réunies par remaillage en voxels pour former une seule forme continue.
Unités : mètres. Le burger est posé au centre de la planche, face à la caméra (axe -Y).
"""
import math
import random
import sys

import bpy  # (en module Python, bpy doit être importé avant bmesh)
import bmesh
import bpy
from mathutils import Matrix, Vector, noise

argv = sys.argv[sys.argv.index('--') + 1:]
PH, SORTIE, LARGEUR, ECH = argv[0], argv[1], int(argv[2]), int(argv[3])
BLEND = argv[4] if len(argv) > 4 and argv[4] != '-' else None
IMAGES_TISSU = int(argv[5]) if len(argv) > 5 else 30
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
col = sc.collection


# ---------------------------------------------------------------- outils
def L(c):
    """Couleur donnée en sRGB (comme à l'écran) → valeur linéaire de Blender."""
    return tuple(x ** 2.2 for x in c)


def nouvel_objet(nom, bm):
    me = bpy.data.meshes.new(nom)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(nom, me)
    col.objects.link(o)
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


def appliquer(o):
    """Fige l'objet tel qu'il est évalué (modificateurs, simulation) dans un nouveau maillage."""
    dg = bpy.context.evaluated_depsgraph_get()
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
    dg = bpy.context.evaluated_depsgraph_get()
    dg.update()
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
    n = bpy.data.objects.new(o.name + '_m', me)
    n.matrix_world = o.matrix_world.copy()
    col.objects.link(n)
    bpy.data.objects.remove(o)
    return n


def fusionner(nom, objs, voxel, lissage=6):
    """Réunit des morceaux (nappe + coulures) en une seule forme continue : remaillage en voxels puis lissage,
    pour que les coulures naissent de la nappe sans arête."""
    for o in objs:
        appliquer(o)
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
    return o


def principled(nom, **k):
    mat = bpy.data.materials.new(nom)
    mat.use_nodes = True
    b = mat.node_tree.nodes['Principled BSDF']
    for cle, v in k.items():
        b.inputs[cle].default_value = v
    return mat, b


def noeud(mat, type_, **k):
    n = mat.node_tree.nodes.new(type_)
    for cle, v in k.items():
        setattr(n, cle, v)
    return n


def lier(mat, a, b):
    mat.node_tree.links.new(a, b)


def rampe(mat, couleurs):
    r = noeud(mat, 'ShaderNodeValToRGB')
    el = r.color_ramp.elements
    el[0].position, el[0].color = couleurs[0][0], (*L(couleurs[0][1]), 1)
    el[1].position, el[1].color = couleurs[-1][0], (*L(couleurs[-1][1]), 1)
    for pos, c in couleurs[1:-1]:
        e = el.new(pos)
        e.color = (*L(c), 1)
    return r


def bosses(mat, bsdf, echelle, force, distance=0.001, detail=8, type_='noise'):
    if type_ == 'voronoi':
        t = noeud(mat, 'ShaderNodeTexVoronoi')
        t.inputs['Scale'].default_value = echelle
        sortie = t.outputs['Distance']
    else:
        t = noeud(mat, 'ShaderNodeTexNoise')
        t.inputs['Scale'].default_value = echelle
        t.inputs['Detail'].default_value = detail
        t.inputs['Roughness'].default_value = 0.6
        sortie = t.outputs['Fac']
    bp = noeud(mat, 'ShaderNodeBump')
    bp.inputs['Strength'].default_value = force
    bp.inputs['Distance'].default_value = distance
    lier(mat, sortie, bp.inputs['Height'])
    lier(mat, bp.outputs['Normal'], bsdf.inputs['Normal'])
    return bp


def coord_objet(mat):
    tc = noeud(mat, 'ShaderNodeTexCoord')
    return tc.outputs['Object']


# ---------------------------------------------------------------- planche, table, monde, lumières
bpy.ops.import_scene.gltf(filepath=f'{PH}/board.gltf')
planche = [o for o in bpy.context.selected_objects if o.type == 'MESH'][0]
S_PL = 0.78
planche.scale = (S_PL,) * 3
planche.rotation_euler = (0, 0, math.radians(4))
H_PL = 0.0413 * S_PL
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

# table en bois sombre (Poly Haven « dark wooden planks »)
bpy.ops.mesh.primitive_plane_add(size=3, location=(0, 0.4, 0))
table = bpy.context.active_object
mt, bt = principled('table', Roughness=0.6)
tex = lambda f, nc=False: (lambda n: (setattr(n, 'image', bpy.data.images.load(f'{PH}/{f}')), n)[1])(noeud(mt, 'ShaderNodeTexImage'))
uvm = noeud(mt, 'ShaderNodeMapping')
uvm.inputs['Scale'].default_value = (2.2, 2.2, 2.2)
uvc = noeud(mt, 'ShaderNodeTexCoord')
lier(mt, uvc.outputs['UV'], uvm.inputs['Vector'])
td = tex('dark_wooden_planks_diff_2k.jpg')
tn = tex('dark_wooden_planks_nor_gl_2k.jpg')
tr = tex('dark_wooden_planks_rough_2k.jpg')
for t in (tn, tr):
    t.image.colorspace_settings.name = 'Non-Color'
for t in (td, tn, tr):
    lier(mt, uvm.outputs['Vector'], t.inputs['Vector'])
assombrir = noeud(mt, 'ShaderNodeMixRGB', blend_type='MULTIPLY')
assombrir.inputs['Fac'].default_value = 1
assombrir.inputs['Color2'].default_value = (*L((0.5, 0.42, 0.36)), 1)
lier(mt, td.outputs['Color'], assombrir.inputs['Color1'])
lier(mt, assombrir.outputs['Color'], bt.inputs['Base Color'])
lier(mt, tr.outputs['Color'], bt.inputs['Roughness'])
nm = noeud(mt, 'ShaderNodeNormalMap')
lier(mt, tn.outputs['Color'], nm.inputs['Color'])
lier(mt, nm.outputs['Normal'], bt.inputs['Normal'])
table.data.materials.append(mt)

# fond : un mur sombre derrière (la table ne reflète plus le studio de l'HDRI à l'horizon)
bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0.75, 1.0), rotation=(math.radians(90), 0, 0))
mur = bpy.context.active_object
mm, bm_ = principled('mur', Roughness=0.9)
bm_.inputs['Base Color'].default_value = (*L((0.05, 0.035, 0.028)), 1)
mur.data.materials.append(mm)

# monde : HDRI Poly Haven pour la lumière et les reflets, fond noir vu de la caméra
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


Z0 = H_PL  # le dessus de la planche
lampe('cle', (-0.42, -0.42, 0.5), (0, 0, Z0 + 0.04), 16, (1.0, 0.8, 0.6), 0.42)  # plus petite : reflet du pain plus net
lampe('contre', (0.32, 0.38, 0.28), (0, 0, Z0 + 0.05), 14, (1.0, 0.62, 0.32), 0.25)
lampe('contre2', (-0.3, 0.4, 0.22), (0, 0, Z0 + 0.04), 7, (1.0, 0.7, 0.45), 0.2)
lampe('remplissage', (0.45, -0.5, 0.12), (0, 0, Z0 + 0.04), 1.5, (1.0, 0.85, 0.7), 0.6)


# ---------------------------------------------------------------- 1. pain du dessous
R = 0.055
bm = bmesh.new()
bmesh.ops.create_cone(bm, cap_ends=True, segments=96, radius1=R * 0.97, radius2=R, depth=0.024)
talon = nouvel_objet('pain_bas', bm)
talon.location = (0, 0, Z0 + 0.012)
bv = talon.modifiers.new('biseau', 'BEVEL')
bv.width = 0.0075
bv.segments = 6
bv.limit_method = 'ANGLE'
modif_subdiv(talon, 2)
modif_deplace(talon, texture_bruit('t_talon', 'CLOUDS', 0.012, 3), 0.0026)
modif_deplace(talon, texture_bruit('t_talon2', 'CLOUDS', 0.0025, 2), 0.0006)
lisse(talon)
mp, bp = principled('pain_bas', Roughness=0.55)
bp.inputs['Coat Weight'].default_value = 0.15
bp.inputs['Subsurface Weight'].default_value = 0.15
bp.inputs['Subsurface Radius'].default_value = (1, 0.6, 0.3)
bp.inputs['Subsurface Scale'].default_value = 0.004
nz = noeud(mp, 'ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 120
r = rampe(mp, [(0.25, (0.6, 0.34, 0.13)), (0.5, (0.72, 0.46, 0.2)), (0.75, (0.84, 0.6, 0.32))])
lier(mp, nz.outputs['Fac'], r.inputs['Fac'])
lier(mp, r.outputs['Color'], bp.inputs['Base Color'])
bosses(mp, bp, 300, 0.45, 0.0012, 10)
talon.data.materials.append(mp)


# ---------------------------------------------------------------- 2. steak smashé (bords en dentelle croustillante)
RS = 0.062
bm = bmesh.new()
bmesh.ops.create_cone(bm, cap_ends=True, segments=192, radius1=RS, radius2=RS * 0.96, depth=0.012)
# des anneaux concentriques sur le dessus et le dessous, pour sculpter
for f in [f for f in bm.faces if len(f.verts) > 4]:
    bmesh.ops.inset_region(bm, faces=[f], thickness=0.006)
    bmesh.ops.inset_region(bm, faces=[f], thickness=0.01)
for v in bm.verts:
    a = math.atan2(v.co.y, v.co.x)
    r = math.hypot(v.co.x, v.co.y)
    bord = max(0, (r - RS * 0.7) / (RS * 0.3))
    # contour irrégulier, écrasé à la spatule
    k = 1 + bord * (0.13 * noise.noise(Vector((math.cos(a) * 1.7, math.sin(a) * 1.7, 3.1))) + 0.07 * noise.noise(Vector((math.cos(a) * 7, math.sin(a) * 7, 1.3))) + 0.045 * noise.noise(Vector((math.cos(a) * 24, math.sin(a) * 24, v.co.z * 400))))
    v.co.x *= k
    v.co.y *= k
    # le bord est plus fin (smashé)
    v.co.z *= 1 - 0.55 * bord ** 1.5
steak = nouvel_objet('steak', bm)
steak.location = (0, 0, Z0 + 0.024 + 0.0058)
modif_subdiv(steak, 2)
modif_deplace(steak, texture_bruit('t_steak', 'CLOUDS', 0.004, 4), 0.0032)
modif_deplace(steak, texture_bruit('t_steak2', 'VORONOI', 0.0022), 0.0016)
modif_deplace(steak, texture_bruit('t_steak3', 'CLOUDS', 0.0012, 2), 0.0009)
lisse(steak)
ms, bs = principled('steak', Roughness=0.42)
bs.inputs['Coat Weight'].default_value = 0.25
bs.inputs['Coat Roughness'].default_value = 0.35
n1 = noeud(ms, 'ShaderNodeTexNoise')
n1.inputs['Scale'].default_value = 90
n1.inputs['Detail'].default_value = 10
r = rampe(ms, [(0.3, (0.1, 0.05, 0.03)), (0.45, (0.24, 0.12, 0.06)), (0.58, (0.42, 0.22, 0.1)), (0.68, (0.6, 0.34, 0.14)), (0.78, (0.7, 0.45, 0.2))])
lier(ms, n1.outputs['Fac'], r.inputs['Fac'])
# le bord en dentelle est plus cuit : presque noir par endroits (réaction de Maillard à la plancha)
lg = noeud(ms, 'ShaderNodeVectorMath', operation='LENGTH')
sxy = noeud(ms, 'ShaderNodeVectorMath', operation='MULTIPLY')
sxy.inputs[1].default_value = (1, 1, 0)
lier(ms, coord_objet(ms), sxy.inputs[0])
lier(ms, sxy.outputs['Vector'], lg.inputs[0])
mr = noeud(ms, 'ShaderNodeMapRange')
mr.inputs['From Min'].default_value = RS * 0.72
mr.inputs['From Max'].default_value = RS * 1.05
lier(ms, lg.outputs['Value'], mr.inputs['Value'])
cuit = noeud(ms, 'ShaderNodeMixRGB', blend_type='MULTIPLY')
lier(ms, mr.outputs['Result'], cuit.inputs['Fac'])
cuit.inputs['Color2'].default_value = (*L((0.42, 0.3, 0.24)), 1)
lier(ms, r.outputs['Color'], cuit.inputs['Color1'])
lier(ms, cuit.outputs['Color'], bs.inputs['Base Color'])
rr = rampe(ms, [(0.4, (0.25, 0.25, 0.25)), (0.65, (0.6, 0.6, 0.6))])
lier(ms, n1.outputs['Fac'], rr.inputs['Fac'])
lier(ms, rr.outputs['Color'], bs.inputs['Roughness'])
bosses(ms, bs, 220, 1.0, 0.002, 14)
steak.data.materials.append(ms)
Z_STEAK = Z0 + 0.024 + 0.0115


# ---------------------------------------------------------------- 3. cheddar fondu : une tranche qui retombe sur le steak (simulation de tissu), qui coule
def rayon_steak(a):
    return RS * (1 + 0.13 * noise.noise(Vector((math.cos(a) * 1.7, math.sin(a) * 1.7, 3.1))) + 0.07 * noise.noise(Vector((math.cos(a) * 7, math.sin(a) * 7, 1.3))))


C = 0.108
bm = bmesh.new()
bmesh.ops.create_grid(bm, x_segments=72, y_segments=72, size=C / 2)
coins = []
for v in bm.verts:
    # une tranche un peu irrégulière (pas un carré parfait), légèrement bombée
    v.co.x += 0.0012 * noise.noise(v.co * 40 + Vector((1, 2, 3)))
    v.co.y += 0.0012 * noise.noise(v.co * 40 + Vector((4, 5, 6)))
    v.co.z = 0.0015 * (1 - (v.co.x ** 2 + v.co.y ** 2) / (C * C / 2))
bm.verts.ensure_lookup_table()
coins = [max(bm.verts, key=lambda v: sx * v.co.x + sy * v.co.y).index for sx, sy in ((1, 1), (1, -1), (-1, 1), (-1, -1))]
fromage = nouvel_objet('cheddar', bm)
fromage.location = (0, 0, Z_STEAK + 0.0035)
fromage.rotation_euler = (0, 0, math.radians(24))
steak.modifiers.new('collision', 'COLLISION')
steak.collision.thickness_outer = 0.0006
steak.collision.cloth_friction = 8
steak.collision.damping = 1
talon.modifiers.new('collision', 'COLLISION')
talon.collision.thickness_outer = 0.0006
talon.collision.cloth_friction = 8
tissu = fromage.modifiers.new('tissu', 'CLOTH')
cs = tissu.settings
cs.quality = 14
cs.mass = 0.012
cs.tension_stiffness = cs.compression_stiffness = 3
cs.shear_stiffness = 2
cs.bending_stiffness = 0.004  # fondu : il ne garde pas sa forme
cs.air_damping = 2
tissu.collision_settings.distance_min = 0.0005
tissu.collision_settings.collision_quality = 4
tissu.collision_settings.use_self_collision = False
tissu.point_cache.frame_start = 1
tissu.point_cache.frame_end = IMAGES_TISSU
sc.frame_start, sc.frame_end = 1, IMAGES_TISSU
for f in range(1, IMAGES_TISSU + 1):
    sc.frame_set(f)
appliquer(fromage)
steak.modifiers.remove(steak.modifiers['collision'])
talon.modifiers.remove(talon.modifiers['collision'])
mw = fromage.matrix_world
pointes = [mw @ fromage.data.vertices[i].co for i in coins]
print('POINTES', [(round(p.x, 4), round(p.y, 4), round(p.z - Z0, 4)) for p in pointes], flush=True)
so = fromage.modifiers.new('epaisseur', 'SOLIDIFY')
so.thickness = 0.0016
so.offset = 1

# coulures : elles partent des coins (et d'un point du bord devant) et descendent le long du steak ; la goutte
# s'élargit au bout, comme du fromage qui coule
mbf = bpy.data.metaballs.new('coulures_cheddar')
mbf.resolution = 0.0008
mbf.render_resolution = 0.0005
mbf.threshold = 0.6
gouttes = bpy.data.objects.new('coulures_cheddar', mbf)
col.objects.link(gouttes)
haut_talon = Z0 + 0.0245
verts_f = [mw @ v.co for v in fromage.data.vertices]
departs = []
for a, longueur in [(-1.25, 0.011), (-1.9, 0.006), (-0.7, 0.008), (-2.45, 0.007), (0.5, 0.006), (2.5, 0.007)]:
    # le point du bord de la tranche le plus loin du centre dans cette direction
    fen = [p for p in verts_f if abs((math.atan2(p.y, p.x) - a + math.pi) % (2 * math.pi) - math.pi) < 0.05]
    if fen:
        departs.append((a, max(fen, key=lambda p: p.x * math.cos(a) + p.y * math.sin(a)), longueur))
steak_eval = steak.evaluated_get(bpy.context.evaluated_depsgraph_get())


def surface_steak(a, z):
    """Rayon réel du steak (bosses comprises) dans la direction a, à la hauteur z."""
    d = Vector((math.cos(a), math.sin(a), 0))
    ok, loc, _, _ = steak_eval.ray_cast(d * 0.1 + Vector((0, 0, z - steak.location.z)), -d)
    return math.hypot(loc.x, loc.y) if ok else rayon_steak(a)


for a, p, longueur in departs:
    ep = random.uniform(0.8, 1.15)
    radial = Vector((math.cos(a), math.sin(a), 0))
    rb = max(surface_steak(a, Z_STEAK - 0.002 - k * 0.002) for k in range(5)) + 0.0014
    r0 = p.x * math.cos(a) + p.y * math.sin(a)
    z_bord = Z_STEAK - 0.0015  # le haut du flanc du steak
    bas = max(haut_talon, z_bord - longueur)
    chemin = []
    # par-dessus le bord du steak, puis le long du flanc ; la goutte grossit au bout
    for k in range(6):
        u = k / 5
        chemin.append((radial * (r0 + (rb - r0) * u) + Vector((0, 0, p.z + (z_bord - p.z) * u * u)), 0.0032 * ep, 1.6))
    for k in range(1, 11):
        u = k / 10
        chemin.append((radial * (rb + 0.0004 * math.sin(u * math.pi)) + Vector((0, 0, z_bord + (bas - z_bord) * u)), (0.0032 * (1 - 0.45 * u) + (0.0011 if k == 10 else 0)) * ep, 1.6 - 0.75 * u))
    for pos, ray, large in chemin:
        e = mbf.elements.new()
        e.co = pos
        e.radius = ray
        e.type = 'ELLIPSOID'
        e.rotation = Vector((0, 0, 1)).rotation_difference(Vector((0, 0, 1)))
        e.size_x, e.size_y, e.size_z = large, 0.6, 1.2
        e.rotation = Matrix.Rotation(a - math.pi / 2, 4, 'Z').to_quaternion()
print('COULURES', len(departs), flush=True)
gouttes = en_maillage(gouttes)
fromage = fusionner('cheddar', [fromage, gouttes], 0.00032, 4)
mc, bc = principled('cheddar', Roughness=0.32)
bc.inputs['Base Color'].default_value = (*L((0.98, 0.6, 0.1)), 1)
bc.inputs['Subsurface Weight'].default_value = 0.35
bc.inputs['Subsurface Radius'].default_value = (1.0, 0.45, 0.1)
bc.inputs['Subsurface Scale'].default_value = 0.003
bc.inputs['Coat Weight'].default_value = 0.4
bc.inputs['Coat Roughness'].default_value = 0.12
bosses(mc, bc, 160, 0.12, 0.0005, 3)
fromage.data.materials.append(mc)
Z_FROMAGE = Z_STEAK + 0.0035



# ---------------------------------------------------------------- 4. pickles (rondelles ondulées)
mpk, bpk = principled('pickle', Roughness=0.22)
bpk.inputs['Subsurface Weight'].default_value = 0.5
bpk.inputs['Subsurface Radius'].default_value = (0.5, 1.0, 0.3)
bpk.inputs['Subsurface Scale'].default_value = 0.003
bpk.inputs['Coat Weight'].default_value = 0.5
bpk.inputs['Coat Roughness'].default_value = 0.14
grad = noeud(mpk, 'ShaderNodeTexGradient', gradient_type='SPHERICAL')
mp_ = noeud(mpk, 'ShaderNodeMapping')
mp_.inputs['Scale'].default_value = (60, 60, 60)
lier(mpk, coord_objet(mpk), mp_.inputs['Vector'])
lier(mpk, mp_.outputs['Vector'], grad.inputs['Vector'])
r = rampe(mpk, [(0.0, (0.3, 0.38, 0.12)), (0.12, (0.5, 0.56, 0.24)), (0.45, (0.7, 0.72, 0.42)), (0.55, (0.86, 0.85, 0.62)), (0.7, (0.68, 0.7, 0.38)), (1.0, (0.74, 0.75, 0.44))])
lier(mpk, grad.outputs['Fac'], r.inputs['Fac'])
lier(mpk, r.outputs['Color'], bpk.inputs['Base Color'])
bosses(mpk, bpk, 300, 0.2)
for i in range(5):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=96, radius1=0.0135, radius2=0.0135, depth=0.0026)
    for v in bm.verts:
        a = math.atan2(v.co.y, v.co.x)
        if math.hypot(v.co.x, v.co.y) > 0.01:
            k = 1 + 0.07 * math.sin(a * 14)
            v.co.x *= k
            v.co.y *= k
        v.co.z += 0.0004 * math.sin(a * 14)
    o = nouvel_objet(f'pickle{i}', bm)
    bv = o.modifiers.new('b', 'BEVEL')
    bv.width = 0.0008
    bv.segments = 3
    lisse(o)
    a = i / 5 * 2 * math.pi + random.uniform(-0.3, 0.3)
    if i < 2:
        a = -math.pi / 2 + (-0.45 if i == 0 else 0.5)
        rr_ = 0.05
    else:
        rr_ = 0.016 + random.uniform(0, 0.022)
    o.location = (math.cos(a) * rr_, math.sin(a) * rr_, Z_FROMAGE + 0.0016 + i * 0.0004)
    o.rotation_euler = (random.uniform(-0.12, 0.12), random.uniform(-0.12, 0.12), random.uniform(0, 6))
    o.data.materials.append(mpk)
Z_PICKLES = Z_FROMAGE + 0.0035


# ---------------------------------------------------------------- 5. oignons (anneaux fins, blancs translucides ; quelques-uns dépassent devant)
mo, bo = principled('oignon', Roughness=0.25)
bo.inputs['Base Color'].default_value = (*L((0.94, 0.91, 0.82)), 1)
bo.inputs['Subsurface Weight'].default_value = 0.45
bo.inputs['Subsurface Radius'].default_value = (1.0, 0.9, 0.65)
bo.inputs['Subsurface Scale'].default_value = 0.0015
bo.inputs['Coat Weight'].default_value = 0.5
bo.inputs['Coat Roughness'].default_value = 0.1
for t, (cx, cy, rayons) in enumerate([(-0.014, -0.038, (0.012, 0.017, 0.021)), (0.018, -0.036, (0.01, 0.015)), (0.004, 0.018, (0.014, 0.02))]):
    for j, rr_ in enumerate(rayons):
        arc = random.uniform(1.1, 1.7) * math.pi
        debut = random.uniform(0, 2 * math.pi)
        bm = bmesh.new()
        n = 72
        prev = None
        for i in range(n + 1):
            a = debut + arc * i / n
            rloc = rr_ * (1 + 0.04 * noise.noise(Vector((math.cos(a) * 3, math.sin(a) * 3, t + j))))
            c = Vector((math.cos(a) * rloc, math.sin(a) * rloc, 0))
            d = c.normalized()
            fin = min(1, i / 6, (n - i) / 6)  # les bouts s'affinent
            ring = []
            for k in range(8):
                b = 2 * math.pi * k / 8
                p = c + d * math.cos(b) * 0.0011 * (0.4 + 0.6 * fin) + Vector((0, 0, 1)) * math.sin(b) * 0.0006 * (0.4 + 0.6 * fin)
                ring.append(bm.verts.new(p))
            if prev:
                for k in range(8):
                    bm.faces.new((prev[k], prev[(k + 1) % 8], ring[(k + 1) % 8], ring[k]))
            prev = ring
        o = nouvel_objet(f'oignon{t}{j}', bm)
        modif_subdiv(o, 1)
        lisse(o)
        o.location = (cx, cy, Z_PICKLES + 0.0008 + j * 0.0003)
        o.rotation_euler = (random.uniform(-0.08, 0.08), random.uniform(-0.08, 0.08), 0)
        o.data.materials.append(mo)
Z_OIGNONS = Z_PICKLES + 0.0018


# ---------------------------------------------------------------- 6. sauce : une nappe aux bords irréguliers qui déborde un peu du pain, deux coulures
def rayon_sauce(a):
    return 0.053 + 0.006 * noise.noise(Vector((math.cos(a) * 2.2, math.sin(a) * 2.2, 7.7))) + 0.0025 * noise.noise(Vector((math.cos(a) * 9, math.sin(a) * 9, 2.2)))


bm = bmesh.new()
NA, NR = 160, 26
centre = bm.verts.new((0, 0, 0.0006))
anneaux = []
for j in range(1, NR + 1):
    ring = []
    for i in range(NA):
        a = 2 * math.pi * i / NA
        rmax = rayon_sauce(a)
        r = rmax * j / NR
        z = 0.0006 * (1 - (j / NR) ** 2)
        if r > 0.045:  # le bord retombe sur ce qu'il y a dessous
            z -= (r - 0.045) ** 2 * 60
        ring.append(bm.verts.new((math.cos(a) * r, math.sin(a) * r, z)))
    anneaux.append(ring)
for i in range(NA):
    bm.faces.new((centre, anneaux[0][i], anneaux[0][(i + 1) % NA]))
for j in range(NR - 1):
    for i in range(NA):
        i2 = (i + 1) % NA
        bm.faces.new((anneaux[j][i], anneaux[j + 1][i], anneaux[j + 1][i2], anneaux[j][i2]))
nappe = nouvel_objet('sauce_nappe', bm)
nappe.location = (0, 0, Z_OIGNONS + 0.0008)
so = nappe.modifiers.new('epaisseur', 'SOLIDIFY')
so.thickness = 0.0016
so.offset = 0
mbs = bpy.data.metaballs.new('coulures_sauce')
mbs.resolution = 0.0008
mbs.render_resolution = 0.0005
mbs.threshold = 0.6
cs_ = bpy.data.objects.new('coulures_sauce', mbs)
col.objects.link(cs_)
cs_.location = nappe.location
for a, longueur in [(-1.95, 0.008), (-1.2, 0.005), (-0.55, 0.004)]:
    r0 = rayon_sauce(a) - 0.0012
    z0 = -(r0 - 0.045) ** 2 * 60
    n = 10
    for k in range(n + 1):
        u = k / n
        e = mbs.elements.new()
        e.co = (math.cos(a) * (r0 + 0.0012 * u), math.sin(a) * (r0 + 0.0012 * u), z0 - longueur * u)
        e.radius = 0.0028 * (1 - 0.4 * u) + (0.0009 if k == n else 0)
        e.type = 'ELLIPSOID'
        e.size_x = e.size_y = 0.8
        e.size_z = 1.2
cs_ = en_maillage(cs_)
sauce = fusionner('sauce', [nappe, cs_], 0.00032, 4)
msa, bsa = principled('sauce', Roughness=0.22)
bsa.inputs['Base Color'].default_value = (*L((0.9, 0.55, 0.32)), 1)  # sauce burger : mayonnaise, ketchup, moutarde
bsa.inputs['Subsurface Weight'].default_value = 0.35
bsa.inputs['Subsurface Radius'].default_value = (1, 0.55, 0.35)
bsa.inputs['Subsurface Scale'].default_value = 0.002
bsa.inputs['Coat Weight'].default_value = 0.7
bsa.inputs['Coat Roughness'].default_value = 0.06
bosses(msa, bsa, 90, 0.08, 0.0004, 2)
sauce.data.materials.append(msa)
Z_SAUCE = Z_OIGNONS + 0.0022



# ---------------------------------------------------------------- 7. pain du dessus (brioché, brillant : dorure à l'œuf) et sésame
bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=128, v_segments=64, radius=1)
for v in [v for v in bm.verts if v.co.z < -0.02]:
    bm.verts.remove(v)
for v in bm.verts:
    z = max(0, v.co.z)
    # profil de brioche : épaules pleines, dessus plus plat qu'une demi-sphère
    v.co.x *= R * 1.03
    v.co.y *= R * 1.03
    v.co.z = 0.042 * z ** 0.72 * (1 + 0.05 * noise.noise(v.co * 30))
bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary])
dome = nouvel_objet('pain_haut', bm)
dome.location = (0, 0, Z_SAUCE - 0.0006)
dome.scale = (1, 0.985, 1)
dome.rotation_euler = (math.radians(1.2), math.radians(-1.5), 0)  # posé un peu de travers, comme à la main
bv = dome.modifiers.new('b', 'BEVEL')
bv.width = 0.004
bv.segments = 4
bv.limit_method = 'ANGLE'
modif_subdiv(dome, 1)
modif_deplace(dome, texture_bruit('t_dome', 'CLOUDS', 0.018, 3), 0.0022)
modif_deplace(dome, texture_bruit('t_dome2', 'CLOUDS', 0.06, 1), 0.004)
lisse(dome)
md, bd = principled('pain_haut', Roughness=0.5)
bd.inputs['Coat Weight'].default_value = 0.65
bd.inputs['Coat Roughness'].default_value = 0.09
bd.inputs['Coat IOR'].default_value = 1.45
bd.inputs['Subsurface Weight'].default_value = 0.12
bd.inputs['Subsurface Radius'].default_value = (1, 0.55, 0.25)
bd.inputs['Subsurface Scale'].default_value = 0.004
sep = noeud(md, 'ShaderNodeSeparateXYZ')
lier(md, coord_objet(md), sep.inputs['Vector'])
nz = noeud(md, 'ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 45
nz.inputs['Detail'].default_value = 6
haut = noeud(md, 'ShaderNodeMath', operation='MULTIPLY_ADD')
haut.inputs[1].default_value = 26  # z (m) → 0..1 sur la hauteur du dôme
lier(md, sep.outputs['Z'], haut.inputs[0])
lier(md, nz.outputs['Fac'], haut.inputs[2])
haut2 = noeud(md, 'ShaderNodeMath', operation='SUBTRACT')
lier(md, haut.outputs[0], haut2.inputs[0])
haut2.inputs[1].default_value = 0.35
r = rampe(md, [(0.0, (0.9, 0.72, 0.45)), (0.1, (0.8, 0.54, 0.25)), (0.32, (0.66, 0.38, 0.13)), (0.75, (0.52, 0.27, 0.08)), (1.0, (0.44, 0.21, 0.06))])
lier(md, haut2.outputs[0], r.inputs['Fac'])
lier(md, r.outputs['Color'], bd.inputs['Base Color'])
bosses(md, bd, 500, 0.12, 0.0008, 4)
dome.data.materials.append(md)


# sésame : graines posées sur le dôme, orientées selon la surface
mse, bse = principled('sesame', Roughness=0.38)
bse.inputs['Base Color'].default_value = (*L((0.93, 0.85, 0.66)), 1)
bse.inputs['Subsurface Weight'].default_value = 0.3
bse.inputs['Subsurface Radius'].default_value = (1, 0.9, 0.7)
bse.inputs['Subsurface Scale'].default_value = 0.001
bse.inputs['Coat Weight'].default_value = 0.3
bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=8, radius=1)
for v in bm.verts:
    v.co.x *= 0.00105
    v.co.y *= 0.0019
    v.co.z *= 0.0006
    if v.co.y > 0:
        v.co.x *= 1 - v.co.y / 0.0019 * 0.45  # forme de goutte
graine = bpy.data.meshes.new('graine')
bm.to_mesh(graine)
bm.free()
for p in graine.polygons:
    p.use_smooth = True
graine.materials.append(mse)
depsgraph = bpy.context.evaluated_depsgraph_get()
dome_eval = dome.evaluated_get(depsgraph)
mat_monde = dome.matrix_world
n_graines = 0
essais = 0
while n_graines < 150 and essais < 4000:
    essais += 1
    a = random.uniform(0, 2 * math.pi)
    el = math.radians(random.uniform(18, 88))
    d = Vector((math.cos(a) * math.cos(el), math.sin(a) * math.cos(el), math.sin(el)))
    org = d * 0.2
    ok, loc, nrm, idx = dome_eval.ray_cast(org, -d)
    if not ok:
        continue
    o = bpy.data.objects.new('graine', graine)
    col.objects.link(o)
    o.location = mat_monde @ (loc + nrm * 0.0003)
    q = nrm.to_track_quat('Z', 'Y')
    o.rotation_euler = (q @ Matrix.Rotation(random.uniform(0, 6.28), 4, 'Z').to_quaternion()).to_euler()
    n_graines += 1


# ---------------------------------------------------------------- caméra et rendu
cam = bpy.data.cameras.new('camera')
cam.lens = 90
cam.dof.use_dof = True
cam.dof.aperture_fstop = 5.6
cam_o = bpy.data.objects.new('camera', cam)
col.objects.link(cam_o)
cible = Vector((0, 0, Z0 + 0.045))
cam_o.location = (0, -0.5, Z0 + 0.085)
cam_o.rotation_euler = (cible - cam_o.location).to_track_quat('-Z', 'Y').to_euler()
cam.dof.focus_distance = (cible - cam_o.location).length - 0.03
sc.camera = cam_o

sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = ECH
sc.cycles.use_adaptive_sampling = True
sc.cycles.adaptive_threshold = 0.01
sc.cycles.use_denoising = True
sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.denoising_input_passes = 'RGB_ALBEDO_NORMAL'
sc.cycles.max_bounces = 8
sc.cycles.transmission_bounces = 6
sc.render.resolution_x = LARGEUR
sc.render.resolution_y = LARGEUR
sc.render.film_transparent = False
sc.view_settings.view_transform = 'Filmic'
sc.view_settings.look = 'Medium High Contrast'
sc.view_settings.exposure = -0.3
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = SORTIE
if BLEND:
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
bpy.ops.render.render(write_still=True)
print('RENDU', SORTIE, flush=True)

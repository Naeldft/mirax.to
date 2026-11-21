"""
Classic Smash de Crunch!, modélisé et rendu dans Blender (Cycles), rendu de face pour validation.
  blender -b --factory-startup -P scripts/classic-smash-blender.py -- <dossier Poly Haven> <sortie.png> <largeur> <échantillons> [<scène.blend>]
Le dossier Poly Haven contient : brown_photostudio_02_2k.hdr, dark_wooden_planks_{diff,nor_gl,rough}_2k.jpg,
board.gltf (wooden_cutting_board 2k, avec wooden_cutting_board.bin et textures/). Unités : mètres.
"""
import math
import random
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

argv = sys.argv[sys.argv.index('--') + 1:]
PH, SORTIE, LARGEUR, ECH = argv[0], argv[1], int(argv[2]), int(argv[3])
BLEND = argv[4] if len(argv) > 4 else None
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
lampe('cle', (-0.42, -0.42, 0.5), (0, 0, Z0 + 0.04), 18, (1.0, 0.8, 0.6), 0.75)
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
r = rampe(mp, [(0.25, (0.62, 0.36, 0.15)), (0.5, (0.76, 0.5, 0.24)), (0.75, (0.86, 0.63, 0.36))])
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
lier(ms, r.outputs['Color'], bs.inputs['Base Color'])
rr = rampe(ms, [(0.4, (0.25, 0.25, 0.25)), (0.65, (0.6, 0.6, 0.6))])
lier(ms, n1.outputs['Fac'], rr.inputs['Fac'])
lier(ms, rr.outputs['Color'], bs.inputs['Roughness'])
bosses(ms, bs, 220, 1.0, 0.002, 14)
steak.data.materials.append(ms)
Z_STEAK = Z0 + 0.024 + 0.0115


# ---------------------------------------------------------------- 3. cheddar fondu, drapé sur le steak, qui coule
def rayon_steak(a):
    return RS * (1 + 0.13 * noise.noise(Vector((math.cos(a) * 1.7, math.sin(a) * 1.7, 3.1))) + 0.07 * noise.noise(Vector((math.cos(a) * 7, math.sin(a) * 7, 1.3))))


C = 0.104
bm = bmesh.new()
bmesh.ops.create_grid(bm, x_segments=90, y_segments=90, size=C / 2)
rot = Matrix.Rotation(math.radians(22), 4, 'Z')
coulures = [(math.radians(22) + math.pi / 4 + i * math.pi / 2 + random.uniform(-0.2, 0.2), random.uniform(0.12, 0.2), random.uniform(0.012, 0.02)) for i in range(4)]
coulures = [(c[0], c[1], c[2] * 0.6) for c in coulures]
for v in bm.verts:
    v.co = rot @ v.co
    r = math.hypot(v.co.x, v.co.y)
    a = math.atan2(v.co.y, v.co.x)
    rb = rayon_steak(a) * 0.95
    z = 0.0006 * math.sin(min(1, r / rb) * math.pi) + 0.0004 * noise.noise(v.co * 90)
    rn = r
    if r > rb:
        t = r - rb
        z -= t * t * 22 + t * 0.55
        rn = rb + t * 0.18
    for ca, l, h in coulures:
        da = abs((a - ca + math.pi) % (2 * math.pi) - math.pi)
        wgt = math.exp(-((da / l) ** 2))
        if r > rb * 0.85 and wgt > 0.02:
            u = min(1, max(0, (r - rb * 0.85) / (rb * 0.3)))
            z -= wgt * h * u * u * (3 - 2 * u)
            rn = min(rn, rb + (r - rb) * 0.12 + 0.0012)
    k = rn / r if r > 0 else 1
    v.co.x *= k
    v.co.y *= k
    v.co.z = z
fromage = nouvel_objet('cheddar', bm)
fromage.location = (0, 0, Z_STEAK + 0.0006)
so = fromage.modifiers.new('epaisseur', 'SOLIDIFY')
so.thickness = 0.0016
so.offset = -1
modif_subdiv(fromage, 1)
lisse(fromage)
mc, bc = principled('cheddar', Roughness=0.3)
bc.inputs['Base Color'].default_value = (*L((1.0, 0.64, 0.06)), 1)
bc.inputs['Subsurface Weight'].default_value = 0.3
bc.inputs['Subsurface Radius'].default_value = (1.0, 0.35, 0.05)
bc.inputs['Subsurface Scale'].default_value = 0.004
bc.inputs['Coat Weight'].default_value = 0.35
bc.inputs['Coat Roughness'].default_value = 0.15
bosses(mc, bc, 140, 0.15, 0.0006, 3)
fromage.data.materials.append(mc)

# coulures de cheddar fondu : des gouttes arrondies qui pendent le long du bord du steak (devant, face à la caméra)
mbf = bpy.data.metaballs.new('coulures_cheddar')
mbf.resolution = 0.0009
mbf.render_resolution = 0.0006
mbf.threshold = 0.6
for a, longueur, epais in [(-1.3, 0.012, 1.05), (-1.86, 0.005, 0.85), (-0.75, 0.007, 0.8), (-2.55, 0.009, 0.9), (0.6, 0.006, 0.8), (2.3, 0.01, 0.9)]:
    rb = rayon_steak(a) * 0.97
    pas = 12
    tangente = Vector((-math.sin(a), math.cos(a), 0))
    radial = Vector((math.cos(a), math.sin(a), 0))
    rot_el = Matrix((tangente, radial, (0, 0, 1))).transposed().to_quaternion()
    for k in range(pas + 1):
        u = k / pas
        e = mbf.elements.new()
        rr_ = rb + 0.0008 + 0.0012 * math.sin(u * math.pi)
        e.co = (math.cos(a) * rr_, math.sin(a) * rr_, -u * longueur)
        # nappe large en haut qui s'affine, petite goutte au bout ; aplatie contre le steak
        e.type = 'ELLIPSOID'
        e.rotation = rot_el
        e.radius = epais * (0.0036 * (1 - 0.5 * u) + (0.0009 if k == pas else 0))
        e.size_x = 1.6 - 0.6 * u  # le long du bord
        e.size_y = 0.55  # épaisseur
        e.size_z = 1.2
gouttes = bpy.data.objects.new('coulures_cheddar', mbf)
col.objects.link(gouttes)
gouttes.location = (0, 0, Z_STEAK + 0.0004)
gouttes.data.materials.append(mc)
Z_FROMAGE = Z_STEAK + 0.0022


# ---------------------------------------------------------------- 4. pickles (rondelles ondulées)
mpk, bpk = principled('pickle', Roughness=0.22)
bpk.inputs['Subsurface Weight'].default_value = 0.5
bpk.inputs['Subsurface Radius'].default_value = (0.5, 1.0, 0.3)
bpk.inputs['Subsurface Scale'].default_value = 0.003
bpk.inputs['Coat Weight'].default_value = 0.8
bpk.inputs['Coat Roughness'].default_value = 0.08
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


# ---------------------------------------------------------------- 5. oignons (anneaux fins, translucides)
mo, bo = principled('oignon', Roughness=0.2)
bo.inputs['Base Color'].default_value = (*L((0.95, 0.92, 0.86)), 1)
bo.inputs['Subsurface Weight'].default_value = 0.7
bo.inputs['Subsurface Radius'].default_value = (1, 0.95, 0.85)
bo.inputs['Subsurface Scale'].default_value = 0.004
bo.inputs['Transmission Weight'].default_value = 0.25
bo.inputs['Coat Weight'].default_value = 0.6
for t in range(2):
    cx, cy = (-0.016, 0.006) if t == 0 else (0.02, -0.004)
    for j, rr_ in enumerate((0.009, 0.014, 0.019, 0.024)):
        arc = random.uniform(1.2, 2.0) * math.pi
        bm = bmesh.new()
        n = 64
        cercle = []
        for i in range(n + 1):
            a = arc * i / n
            cercle.append(Vector((math.cos(a) * rr_, math.sin(a) * rr_, 0)))
        # un tube aplati le long de l'arc
        prev = None
        for i, c in enumerate(cercle):
            ring = []
            d = c.normalized()
            for k in range(8):
                b = 2 * math.pi * k / 8
                p = c + d * math.cos(b) * 0.0013 + Vector((0, 0, 1)) * math.sin(b) * 0.0007
                ring.append(bm.verts.new(p))
            if prev:
                for k in range(8):
                    bm.faces.new((prev[k], prev[(k + 1) % 8], ring[(k + 1) % 8], ring[k]))
            prev = ring
        o = nouvel_objet(f'oignon{t}{j}', bm)
        modif_subdiv(o, 1)
        lisse(o)
        o.location = (cx, cy, Z_PICKLES + 0.001)
        o.rotation_euler = (random.uniform(-0.06, 0.06), random.uniform(-0.06, 0.06), random.uniform(0, 6.28))
        o.data.materials.append(mo)
Z_OIGNONS = Z_PICKLES + 0.0022


# ---------------------------------------------------------------- 6. sauce (nappe et coulures brillantes)
mb = bpy.data.metaballs.new('sauce')
mb.resolution = 0.0012
mb.render_resolution = 0.0008
mb.threshold = 0.6
sauce = bpy.data.objects.new('sauce', mb)
col.objects.link(sauce)
sauce.location = (0, 0, Z_OIGNONS + 0.001)
for i in range(70):
    a = random.uniform(0, 2 * math.pi)
    r = random.uniform(0, 0.044)
    e = mb.elements.new()
    e.co = (math.cos(a) * r, math.sin(a) * r, 0)
    e.radius = random.uniform(0.006, 0.01)
    e.type = 'ELLIPSOID'
    e.size_z = 0.18
# coulures sur le devant et les côtés
for a in (-1.85, -1.55, -1.25, -0.9, -2.2, -2.5, 0.4, 2.6):
    for k in range(7):
        e = mb.elements.new()
        rr_ = 0.05 + k * 0.0012
        e.co = (math.cos(a) * rr_, math.sin(a) * rr_, -k * 0.0028)
        e.radius = 0.0045 - k * 0.0003
        e.type = 'BALL'
msa, bsa = principled('sauce', Roughness=0.08)
bsa.inputs['Base Color'].default_value = (*L((0.88, 0.5, 0.24)), 1)
bsa.inputs['Subsurface Weight'].default_value = 0.4
bsa.inputs['Subsurface Radius'].default_value = (1, 0.5, 0.3)
bsa.inputs['Subsurface Scale'].default_value = 0.002
bsa.inputs['Coat Weight'].default_value = 1.0
bsa.inputs['Coat Roughness'].default_value = 0.03
sauce.data.materials.append(msa)
Z_SAUCE = Z_OIGNONS + 0.0025


# ---------------------------------------------------------------- 7. pain du dessus (brioché, brillant) et sésame
bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=128, v_segments=64, radius=1)
for v in [v for v in bm.verts if v.co.z < -0.02]:
    bm.verts.remove(v)
# fond plat légèrement arrondi
bord = [v for v in bm.verts if abs(v.co.z) < 0.03]
for v in bm.verts:
    z = v.co.z
    v.co.x *= R * 1.02
    v.co.y *= R * 1.02
    v.co.z = max(0, z) * 0.046 * (1 + 0.05 * noise.noise(v.co * 30))
bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary])
dome = nouvel_objet('pain_haut', bm)
dome.location = (0, 0, Z_SAUCE)
dome.scale = (1, 0.985, 1)
bv = dome.modifiers.new('b', 'BEVEL')
bv.width = 0.004
bv.segments = 4
bv.limit_method = 'ANGLE'
modif_subdiv(dome, 1)
modif_deplace(dome, texture_bruit('t_dome', 'CLOUDS', 0.018, 3), 0.0022)
modif_deplace(dome, texture_bruit('t_dome2', 'CLOUDS', 0.06, 1), 0.005)
lisse(dome)
md, bd = principled('pain_haut', Roughness=0.32)
bd.inputs['Coat Weight'].default_value = 0.45
bd.inputs['Coat Roughness'].default_value = 0.2
bd.inputs['Subsurface Weight'].default_value = 0.12
bd.inputs['Subsurface Radius'].default_value = (1, 0.55, 0.25)
bd.inputs['Subsurface Scale'].default_value = 0.004
sep = noeud(md, 'ShaderNodeSeparateXYZ')
lier(md, coord_objet(md), sep.inputs['Vector'])
nz = noeud(md, 'ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 60
nz.inputs['Detail'].default_value = 6
haut = noeud(md, 'ShaderNodeMath', operation='MULTIPLY_ADD')
haut.inputs[1].default_value = 24  # z (m) → 0..1 sur la hauteur du dôme
lier(md, sep.outputs['Z'], haut.inputs[0])
lier(md, nz.outputs['Fac'], haut.inputs[2])
haut2 = noeud(md, 'ShaderNodeMath', operation='SUBTRACT')
lier(md, haut.outputs[0], haut2.inputs[0])
haut2.inputs[1].default_value = 0.35
r = rampe(md, [(0.0, (0.88, 0.66, 0.38)), (0.12, (0.78, 0.5, 0.22)), (0.35, (0.62, 0.32, 0.1)), (0.8, (0.48, 0.2, 0.06)), (1.0, (0.4, 0.15, 0.04))])
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
sc.cycles.adaptive_threshold = 0.015
sc.cycles.use_denoising = False
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

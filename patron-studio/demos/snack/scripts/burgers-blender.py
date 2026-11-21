"""
Burgers 3D de Crunch! dans Blender (étape 4) : à lancer par scripts/burgers-blender.sh, pas à la main.

    blender -b --factory-startup -P scripts/burgers-blender.py -- <donnees.json> <dossier photos> <planche.gltf> <sortie> [apercus]

Pour chaque burger (photo de référence détourée, contour et découpage en couches : voir burgers-photo.py et bornes.js) :
  1. le modèle : le même volume que dans le navigateur (section ovale qui suit le contour de la photo, découpé en
     couches le long des bords des ingrédients, la photo projetée de face), une couche par objet « couche-0… »,
     exporté en GLB (géométrie et coordonnées de texture ; la photo reste un fichier WebP à part) ;
  2. l'ombre : l'ombre réelle du burger sur sa planche, calculée en Cycles (lumière principale de la scène du site,
     plus la lumière ambiante qui assombrit le contact), vue de dessus, en PNG transparent ;
  3. (avec « apercus ») un rendu Cycles du burger sur sa planche, pour vérifier.
Unités : mètres. Repère du site (Y vers le haut) → repère de Blender (Z vers le haut) : (x, y, z) → (x, -z, y).
"""
import json
import math
import os
import sys

import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
DONNEES, PHOTOS, PLANCHE, SORTIE = argv[:4]
APERCUS = len(argv) > 4 and argv[4] == 'apercus'
os.makedirs(SORTIE, exist_ok=True)
D = json.load(open(DONNEES))

LARGEUR_PAIN = 0.115  # m
SEG = 96
LIGNES = 36
ECHELLE_PLANCHE = 0.62
HAUT_PLANCHE = 0.0413 * ECHELLE_PLANCHE


def lecteur(rangs):
    def f(y):
        i = 1
        while i < len(rangs) - 1 and rangs[i][0] < y:
            i += 1
        y0, c0, r0 = rangs[i - 1]
        y1, c1, r1 = rangs[i]
        t = 0 if y1 == y0 else min(1, max(0, (y - y0) / (y1 - y0)))
        return c0 + (c1 - c0) * t, r0 + (r1 - r0) * t
    return f


def couche(p, haut, bas, echelle, cx0, ysol):
    """Même construction que BurgerPhoto.jsx : sommets (repère du site), faces, coordonnées de texture."""
    prof = lecteur(p['rangs'])
    pos, uv, faces = [], [], []
    yb = lambda b, s: p['h'] * (b[0] + (b[1] - b[0]) * s * s)

    def point(ypx, s, c):
        cx, rx = prof(ypx)
        xpx = cx + rx * s
        pos.append(((xpx - cx0) * echelle, (ysol - ypx) * echelle, rx * 0.92 * c * echelle))
        uv.append((xpx / p['l'], 1 - ypx / p['h']))

    for i in range(SEG + 1):
        th = -math.pi + 2 * math.pi * i / SEG
        s, c = math.sin(th), math.cos(th)
        y0, y1 = yb(haut, s), yb(bas, s)
        for j in range(LIGNES):
            point(y0 + (y1 - y0) * j / (LIGNES - 1), s, c)
    for i in range(SEG):
        for j in range(LIGNES - 1):
            a = i * LIGNES + j
            b = (i + 1) * LIGNES + j
            faces.append((a, a + 1, b + 1, b))
    # couvercles : couleur du centre de la tranche (pas de stries), sommets à part
    for k, j in enumerate((0, LIGNES - 1)):
        yc = yb(bas if k else haut, 0)
        cx, _ = prof(yc)
        uc, vc = cx / p['l'], 1 - (yc + (-6 if k else 6)) / p['h']
        centre = len(pos)
        pos.append(((cx - cx0) * echelle, (ysol - yc) * echelle, 0))
        uv.append((uc, vc))
        premier = len(pos)
        for i in range(SEG + 1):
            v = i * LIGNES + j
            pos.append(pos[v])
            uv.append((uc + (uv[v][0] - uc) * 0.04, vc))
        for i in range(SEG):
            a, b = premier + i, premier + i + 1
            faces.append((centre, a, b) if k else (centre, b, a))
    return pos, uv, faces


def objet(nom, pos, uv, faces, collection):
    m = bpy.data.meshes.new(nom)
    m.from_pydata([(x, -z, y) for x, y, z in pos], [], faces)
    couche_uv = m.uv_layers.new(name='UVMap')
    for poly in m.polygons:
        poly.use_smooth = True
        for li in poly.loop_indices:
            couche_uv.data[li].uv = uv[m.loops[li].vertex_index]
    m.update()
    o = bpy.data.objects.new(nom, m)
    collection.objects.link(o)
    return o


def vider():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.use_denoising = False  # (la version Ubuntu de Blender n'a pas de débruiteur : plus d'échantillons)
    return sc


def materiau_photo(nom, image, emission=True):
    """La photo, telle quelle (émission), avec sa transparence (les vides entre les coulures)."""
    mat = bpy.data.materials.new(nom)
    mat.use_nodes = True
    mat.blend_method = 'CLIP'
    n = mat.node_tree.nodes
    l = mat.node_tree.links
    n.clear()
    sortie = n.new('ShaderNodeOutputMaterial')
    tex = n.new('ShaderNodeTexImage')
    tex.image = image
    melange = n.new('ShaderNodeMixShader')
    transp = n.new('ShaderNodeBsdfTransparent')
    if emission:
        em = n.new('ShaderNodeEmission')
        l.new(tex.outputs['Color'], em.inputs['Color'])
        l.new(em.outputs[0], melange.inputs[2])
    else:
        di = n.new('ShaderNodeBsdfDiffuse')
        l.new(tex.outputs['Color'], di.inputs['Color'])
        l.new(di.outputs[0], melange.inputs[2])
    seuil = n.new('ShaderNodeMath')
    seuil.operation = 'GREATER_THAN'
    seuil.inputs[1].default_value = 0.45
    l.new(tex.outputs['Alpha'], seuil.inputs[0])
    l.new(seuil.outputs[0], melange.inputs[0])
    l.new(transp.outputs[0], melange.inputs[1])
    l.new(melange.outputs[0], sortie.inputs['Surface'])
    return mat


def lumiere_principale(sc, energie=60):
    # la lumière principale du site : spot chaud en haut à gauche, devant (-0,4 ; 0,8 ; 0,5) → Blender
    li = bpy.data.lights.new('principale', 'AREA')
    li.size = 0.35
    li.energy = energie
    li.color = (1.0, 0.85, 0.66)
    o = bpy.data.objects.new('principale', li)
    sc.collection.objects.link(o)
    o.location = (-0.4, -0.5, 0.8)
    o.rotation_euler = (Vector((0, 0, 0.05)) - o.location).to_track_quat('-Z', 'Y').to_euler()
    return o


def monde(sc, couleur=(0.05, 0.035, 0.025), force=1.0):
    w = bpy.data.worlds.new('monde')
    sc.world = w
    w.use_nodes = True
    fond = w.node_tree.nodes['Background']
    fond.inputs['Color'].default_value = (*couleur, 1)
    fond.inputs['Strength'].default_value = force


def camera(sc, position, vise, ortho=None, focale=50):
    cam = bpy.data.cameras.new('camera')
    if ortho:
        cam.type = 'ORTHO'
        cam.ortho_scale = ortho
    else:
        cam.lens = focale
    o = bpy.data.objects.new('camera', cam)
    sc.collection.objects.link(o)
    o.location = position
    o.rotation_euler = (Vector(vise) - Vector(position)).to_track_quat('-Z', 'Y').to_euler()
    sc.camera = o
    return o


bilan = []
for id_, bornes in D['bornes'].items():
    p = D['profils'][id_]
    bas = [r for r in p['rangs'] if p['h'] * 0.8 < r[0] < p['h'] * 0.95]
    largeur = max(r[2] for r in bas) * 2
    echelle = LARGEUR_PAIN / largeur
    cx0 = sum(r[1] for r in bas) / len(bas)
    ysol = p['h'] - 6
    geos = [couche(p, bornes[k], bornes[k + 1], echelle, cx0, ysol) for k in range(len(bornes) - 1)]

    # ---------- 1. le modèle (GLB) ----------
    sc = vider()
    col = sc.collection
    objs = [objet(f'couche-{k}', *g, col) for k, g in enumerate(geos)]
    for o in objs:
        o.select_set(True)
    glb = os.path.join(SORTIE, f'{id_}.glb')
    bpy.ops.export_scene.gltf(filepath=glb, use_selection=True, export_format='GLB', export_materials='NONE', export_yup=True, export_normals=True, export_texcoords=True, export_apply=False)

    # ---------- 2. l'ombre sur la planche (vue de dessus, transparente) ----------
    sc = vider()
    col = sc.collection
    photo = bpy.data.images.load(os.path.join(PHOTOS, f'{id_}-hd.webp'))
    mat = materiau_photo('photo', photo, emission=False)
    for k, g in enumerate(geos):
        o = objet(f'couche-{k}', *g, col)
        o.data.materials.append(mat)
        o.visible_camera = False  # il ne compte que pour l'ombre
    bpy.ops.mesh.primitive_plane_add(size=0.36, location=(0, 0, 0))
    sol = bpy.context.active_object
    sol.is_shadow_catcher = True
    lumiere_principale(sc)
    monde(sc, (1, 1, 1), 0.35)  # la lumière ambiante : assombrit le contact (occlusion)
    camera(sc, (0, 0, 1), (0, 0, 0), ortho=0.36)
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = 384
    sc.cycles.samples = 256
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_mode = 'RGBA'
    sc.render.filepath = os.path.join(SORTIE, f'{id_}-ombre.png')
    bpy.ops.render.render(write_still=True)

    # ---------- 3. aperçu : le burger sur sa planche ----------
    if APERCUS:
        sc = vider()
        col = sc.collection
        photo = bpy.data.images.load(os.path.join(PHOTOS, f'{id_}-hd.webp'))
        mat = materiau_photo('photo', photo, emission=True)
        for k, g in enumerate(geos):
            o = objet(f'couche-{k}', *g, col)
            o.data.materials.append(mat)
            o.location.z = HAUT_PLANCHE
        bpy.ops.import_scene.gltf(filepath=PLANCHE)
        for o in bpy.context.selected_objects:
            o.scale = (ECHELLE_PLANCHE,) * 3
        lumiere_principale(sc, 45)
        monde(sc, (0.06, 0.035, 0.02), 1.0)
        camera(sc, (0.0, -0.62, 0.13 + HAUT_PLANCHE), (0, 0, 0.06 + HAUT_PLANCHE), focale=62)
        sc.render.film_transparent = False
        sc.render.resolution_x, sc.render.resolution_y = 960, 600
        sc.cycles.samples = 160
        sc.view_settings.view_transform = 'Standard'
        sc.render.image_settings.file_format = 'JPEG'
        sc.render.filepath = os.path.join(SORTIE, f'{id_}-apercu.jpg')
        bpy.ops.render.render(write_still=True)
    bilan.append(id_)
    print('BURGER', id_, 'ok', flush=True)
print('FINI', len(bilan), flush=True)

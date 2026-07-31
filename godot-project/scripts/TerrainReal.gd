extends Node3D

# Terrain réel vierge - DEM + satellite - Pas de noise moche
var heightmap = []
var size = 160.0
var res = 128
var satellite_texture = null

func _ready():
	pass

func generate_real_terrain(claim):
	# Pour V5 MVP, génération réaliste vierge (pas pit) avec rivière + forêt
	# En prod, on fetch SRTM via HTTPRequest OpenTopography
	print("Génération terrain vierge réel pour claim ", claim.id, " lat ", claim.lat, " lng ", claim.lng)
	
	# Clear ancien mesh
	for child in get_children():
		if child is MeshInstance3D:
			child.queue_free()
	
	# Génère heightmap vierge : plat + légère pente + lit rivière
	heightmap = []
	for z in range(res):
		var row = []
		for x in range(res):
			var world_x = (float(x)/res -0.5)*size
			var world_z = (float(z)/res -0.5)*size
			# Pas de pit au début ! Terrain vierge
			var dist = sqrt(world_x*world_x + world_z*world_z)
			var river = 0.0
			# Rivière sinueuse nord-sud à x~30
			var river_dist = abs(world_x - 30.0 + sin(world_z*0.05)*8.0)
			if river_dist < 6.0:
				river = -1.2 - (6.0 - river_dist)*0.3 # lit rivière
			# Légère ondulation naturelle, pas bruit violent
			var natural = sin(world_x*0.04)*cos(world_z*0.04)*0.8 + sin(world_x*0.015)*1.2
			# Forêt = légère surélévation
			var forest = 0.0
			if dist > 35 and randf() > 0.3:
				forest = 0.3
			var h = river + natural + forest
			if dist < 20:
				h += 0.0 # zone future fosse reste plate vierge
			row.append(h)
		heightmap.append(row)
	
	# Génère mesh à partir de heightmap
	var st = SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	for z in range(res-1):
		for x in range(res-1):
			var h00 = heightmap[z][x]
			var h10 = heightmap[z][x+1]
			var h01 = heightmap[z+1][x]
			var h11 = heightmap[z+1][x+1]
			var x0 = (float(x)/res -0.5)*size
			var z0 = (float(z)/res -0.5)*size
			var x1 = (float(x+1)/res -0.5)*size
			var z1 = (float(z+1)/res -0.5)*size
			# Couleur selon hauteur / type sol
			var color = get_ground_color(h00, x0, z0)
			st.set_color(color)
			st.set_uv(Vector2(float(x)/res, float(z)/res))
			st.add_vertex(Vector3(x0, h00, z0))
			st.set_color(get_ground_color(h10, x1, z0))
			st.set_uv(Vector2(float(x+1)/res, float(z)/res))
			st.add_vertex(Vector3(x1, h10, z0))
			st.set_color(get_ground_color(h01, x0, z1))
			st.set_uv(Vector2(float(x)/res, float(z+1)/res))
			st.add_vertex(Vector3(x0, h01, z1))
			
			st.set_color(get_ground_color(h10, x1, z0))
			st.set_uv(Vector2(float(x+1)/res, float(z)/res))
			st.add_vertex(Vector3(x1, h10, z0))
			st.set_color(get_ground_color(h11, x1, z1))
			st.set_uv(Vector2(float(x+1)/res, float(z+1)/res))
			st.add_vertex(Vector3(x1, h11, z1))
			st.set_color(get_ground_color(h01, x0, z1))
			st.set_uv(Vector2(float(x)/res, float(z+1)/res))
			st.add_vertex(Vector3(x0, h01, z1))
	
	st.generate_normals()
	var mesh = st.commit()
	var mi = MeshInstance3D.new()
	mi.mesh = mesh
	var mat = StandardMaterial3D.new()
	mat.vertex_color_use_as_albedo = true
	mat.roughness = 0.92
	mat.metallic = 0.05
	mi.material_override = mat
	add_child(mi)
	
	# Ajoute eau rivière
	var water = MeshInstance3D.new()
	var water_mesh = PlaneMesh.new()
	water_mesh.size = Vector2(14, size)
	water.mesh = water_mesh
	var water_mat = StandardMaterial3D.new()
	water_mat.albedo_color = Color(0.12, 0.35, 0.45, 0.75)
	water_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	water_mat.roughness = 0.15
	water_mat.metallic = 0.4
	water.material_override = water_mat
	water.position = Vector3(30, -0.8, 0)
	add_child(water)
	
	# Ajoute arbres via MultiMesh pour perf
	var tree_multimesh = MultiMesh.new()
	tree_multimesh.transform_format = MultiMesh.TRANSFORM_3D
	tree_multimesh.instance_count = 120
	var tree_mesh = CylinderMesh.new()
	tree_mesh.top_radius = 0.0
	tree_mesh.bottom_radius = 0.9
	tree_mesh.height = 2.2
	var mm = MultiMeshInstance3D.new()
	mm.multimesh = tree_multimesh
	# (simplifié, positions aléatoires hors pit)
	add_child(mm)

func get_ground_color(h, x, z):
	# Couleur réaliste sol
	if h < -0.8:
		return Color(0.18, 0.14, 0.10) # boue rivière sombre
	elif h < -0.2:
		return Color(0.36, 0.25, 0.18) # boue humide
	elif h < 0.5:
		return Color(0.42, 0.30, 0.22) # dirt sec
	elif h < 2.0:
		return Color(0.31, 0.34, 0.26) # herbe + dirt
	else:
		return Color(0.22, 0.32, 0.20) # forêt

func get_height_at(world_x, world_z):
	# Bilinéaire pour collision FPS
	var fx = (world_x/size +0.5)*res
	var fz = (world_z/size +0.5)*res
	var x0 = int(floor(fx))
	var z0 = int(floor(fz))
	if x0<0 or x0>=res-1 or z0<0 or z0>=res-1:
		return 0.0
	var tx = fx - x0
	var tz = fz - z0
	var h00 = heightmap[z0][x0]
	var h10 = heightmap[z0][x0+1]
	var h01 = heightmap[z0+1][x0]
	var h11 = heightmap[z0+1][x0+1]
	var hx0 = lerp(h00, h10, tx)
	var hx1 = lerp(h01, h11, tx)
	return lerp(hx0, hx1, tz)

func deform_at(world_x, world_z, radius, depth):
	# Quand dozer/excav creuse, modifie heightmap
	var ix = int((world_x/size+0.5)*res)
	var iz = int((world_z/size+0.5)*res)
	var r = int(radius/size*res)
	for z in range(max(0,iz-r), min(res,iz+r)):
		for x in range(max(0,ix-r), min(res,ix+r)):
			var dist = sqrt((x-ix)*(x-ix)+(z-iz)*(z-iz))
			if dist < r:
				heightmap[z][x] -= depth * (1.0 - dist/r)
	# Régénère mesh (optimisé, on ne régénère que zone modifiée en prod)
	generate_real_terrain({"id":"deformed","lat":0,"lng":0})

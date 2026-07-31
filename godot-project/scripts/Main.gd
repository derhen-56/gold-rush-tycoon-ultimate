extends Node3D

# V5 REAL GAME MAIN - C++ logic in GDScript for Godot
# - Terrain verrouillé si pas de claim
# - FPS avec collision heightmap
# - Placement libre convoyeur
# - Vraies machines fidèles

var is_fps = false
var can_move = true
var velocity = Vector3.ZERO
var gravity = 9.8
var current_vehicle = null
var terrain_heightmap = []
var terrain_size = 160
var terrain_res = 128

func _ready():
	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
	print("GOLD RUSH TYCOON V5 - REAL TERRAIN + REAL MACHINES")
	if GameState.state.active_claim_id == "":
		show_locked_mine()
	else:
		load_real_claim(GameState.state.active_claim_id)

func show_locked_mine():
	# Écran verrouillé comme demandé
	print("MINE 3D VERROUILLÉE - Achète une concession sur Carte US")
	# En UI, on affichera logo
	$UI.show_locked_screen()

func load_real_claim(claim_id):
	# Charge DEM réel via fonction (simulée pour V5 MVP, fetch réel via HTTPRequest en prod)
	var claim = null
	for c in GameState.CLAIMS:
		if c.id == claim_id:
			claim = c
			break
	if claim == null:
		return
	print("Chargement terrain réel pour ", claim.id, " lat ", claim.lat, " lng ", claim.lng)
	# Ici on ferait HTTPRequest vers OpenTopography SRTM
	# Pour MVP, on génère heightmap réaliste avec rivière + forêt vierge (pas pit)
	$Terrain.generate_real_terrain(claim)

func _input(event):
	if event is InputEventKey and event.pressed:
		if event.keycode == KEY_V:
			toggle_fps()
		if event.keycode == KEY_E and is_fps:
			try_enter_vehicle()
		if event.keycode == KEY_B and !is_fps:
			start_build_mode()
	if event is InputEventMouseMotion and is_fps:
		rotate_fps_camera(event.relative)

func toggle_fps():
	is_fps = !is_fps
	if is_fps:
		Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
		$CameraOrbit.current = false
		$CameraFPS.current = true
		print("FPS MODE - WASD bouger, Souris regarder, E entrer engin")
	else:
		Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
		$CameraOrbit.current = true
		$CameraFPS.current = false
		if current_vehicle:
			exit_vehicle()

func rotate_fps_camera(rel):
	$CameraFPS.rotate_y(-rel.x * 0.003)
	$CameraFPS.rotate_object_local(Vector3(1,0,0), -rel.y * 0.003)

func _physics_process(delta):
	if !is_fps:
		return
	var input_dir = Vector3.ZERO
	if Input.is_key_pressed(KEY_W): input_dir.z -= 1
	if Input.is_key_pressed(KEY_S): input_dir.z += 1
	if Input.is_key_pressed(KEY_A): input_dir.x -= 1
	if Input.is_key_pressed(KEY_D): input_dir.x += 1
	input_dir = input_dir.normalized()
	var speed = 4.5
	if Input.is_key_pressed(KEY_SHIFT): speed = 7.0
	
	if current_vehicle:
		# Conduite véhicule
		if input_dir.z != 0:
			current_vehicle.translate(Vector3(0,0,input_dir.z * speed * delta * 2.0))
		if input_dir.x != 0:
			current_vehicle.rotate_y(input_dir.x * delta * 1.5)
		$CameraFPS.global_position = current_vehicle.global_position + Vector3(0,2.2,0.6)
	else:
		# Marche à pied avec collision heightmap
		var forward = $CameraFPS.global_transform.basis.z * input_dir.z
		var right = $CameraFPS.global_transform.basis.x * input_dir.x
		var move = (forward + right) * speed * delta
		$CameraFPS.global_position += move
		# Collision sol : get height from terrain
		var h = $Terrain.get_height_at($CameraFPS.global_position.x, $CameraFPS.global_position.z)
		$CameraFPS.global_position.y = h + 1.8 # hauteur yeux

func try_enter_vehicle():
	# Raycast proche véhicules <4m
	var space = get_world_3d().direct_space_state
	var from = $CameraFPS.global_position
	var to = from + $CameraFPS.global_transform.basis.z * -4.0
	var query = PhysicsRayQueryParameters3D.create(from, to)
	var result = space.intersect_ray(query)
	if result:
		var collider = result.collider
		if collider != null and collider.is_in_group("vehicle"):
			current_vehicle = collider.get_parent()
			print("Entré dans ", current_vehicle.name, " - WASD conduire, souris bras si pelle, E sortir")
		else:
			print("Aucun engin à proximité (<4m)")

func exit_vehicle():
	current_vehicle = null
	print("Sorti engin")

func start_build_mode():
	print("Mode construction - Choisis convoyeur/hopper à placer, molette rotation, clic gauche place")

func _on_claim_purchased(claim_id):
	load_real_claim(claim_id)

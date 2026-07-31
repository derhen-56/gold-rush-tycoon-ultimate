extends Node

# V5 REAL GAME STATE - C++ style but GDScript for Godot
# Account system simplified (no email SMTP) + admin secure code

var current_user = null
var users_db = []
var claims_db = []
var settings = {
	"lang": "fr",
	"region": "EU",
	"currency": "EUR",
	"units": "metric"
}
var state = {
	"money": 125000,
	"gold": 0.0,
	"gold_in_wash": 0.0,
	"paydirt": 0.0,
	"diesel": 3500,
	"diesel_cap": 6000,
	"day": 1,
	"year": 1,
	"hour": 6.0,
	"season_day": 1,
	"season_len": 105,
	"gold_price": 1948.0,
	"weather": "Soleil",
	"temp": 14,
	"owned_claims": [],
	"rented_claims": [],
	"leased_out": [],
	"fleet": [],
	"active_claim_id": "",
	"daily_gold": 0.0,
	"total_gold": 0.0,
	"mud": 0.25,
	"workers": {"operators":0,"mechanics":0,"foremen":0},
	"admin": false,
	"admin_code": ""
}

var CLAIMS = [
	{"id":"scribner","name":{"fr":"Scribner Creek","en":"Scribner Creek"},"region":"Klondike, Yukon","country":"CA","lat":63.92,"lng":-139.25,"price":32000,"rent":4800,"goldMin":650,"goldMax":1100,"richness":0.72,"size":20,"over":3.2,"diff":1,"water":true,"type":"creek","color":"#7cb342","img":"res://assets/textures/scribner.jpg"},
	{"id":"dominion","name":{"fr":"Dominion Creek","en":"Dominion Creek"},"region":"Yukon","country":"CA","lat":63.70,"lng":-138.70,"price":178000,"rent":22000,"goldMin":3500,"goldMax":5200,"richness":1.6,"size":30,"over":4.8,"diff":3,"water":true,"type":"bench","color":"#4fc3f7","img":"res://assets/textures/dominion.jpg"},
	{"id":"paradise","name":{"fr":"Paradise Hill","en":"Paradise Hill"},"region":"Klondike Bench","country":"CA","lat":63.95,"lng":-139.0,"price":95000,"rent":12500,"goldMin":1800,"goldMax":2600,"richness":1.15,"size":26,"over":5.5,"diff":2,"water":false,"type":"hill","color":"#ffb300","img":"res://assets/textures/paradise.jpg"},
	{"id":"indian","name":{"fr":"Indian River","en":"Indian River"},"region":"Yukon River","country":"CA","lat":63.5,"lng":-139.8,"price":145000,"rent":18000,"goldMin":3000,"goldMax":4800,"richness":1.45,"size":28,"over":3.0,"diff":3,"water":true,"type":"river","color":"#29b6f6","img":"res://assets/textures/indian.jpg"},
	{"id":"sierra","name":{"fr":"Sierra Nevada - Yuba","en":"Sierra Nevada - Yuba"},"region":"California, USA","country":"US","lat":39.3,"lng":-121.0,"price":198000,"rent":26000,"goldMin":4200,"goldMax":6800,"richness":1.7,"size":30,"over":2.5,"diff":4,"water":true,"type":"river","color":"#ffd54f","img":"res://assets/textures/sierra.jpg"},
]

var EQUIP = [
	{"id":"excav_320","name":{"fr":"Pelle CAT 320F L","en":"CAT 320F L Excavator"},"cat":"excavator","role":"Extraction","buy":74000,"rent":7200,"prod":16,"fuel":8,"power":0,"need":[],"desc":{"fr":"Base de toute mine. Creuse le paydirt exposé par le dozer. 22.7T, godet 1.19m³, portée 9.1m. Chenilles 600mm, vérins Ø140mm visibles.","en":"Core mining. 22.7T, bucket 1.19m³, 600mm tracks, visible hydraulic cylinders."},"use":"Dozer décape -> Pelle creuse -> Trémie"},
	{"id":"dozer_d6","name":{"fr":"Bull CAT D6 XE LGP","en":"CAT D6 XE LGP Dozer"},"cat":"dozer","role":"Décapage","buy":72000,"rent":7400,"prod":55,"fuel":15,"power":0,"need":[],"desc":{"fr":"Chenilles LGP larges 1.2m pour marécage SnowRunner. Lame 4.2m, ripper arrière. Pousse mort-terrain.","en":"LGP wide tracks 1.2m for swamp, blade 4.2m, ripper."},"use":"Première machine: enlève forêt + stérile"},
	{"id":"hopper","name":{"fr":"Trémie 15yd³ + Grizzly","en":"Hopper 15yd³ + Grizzly"},"cat":"feeder","role":"Alimentation","buy":22000,"rent":2800,"prod":0,"fuel":2,"power":10,"need":["power"],"desc":{"fr":"OBLIGATOIRE. Tôle 12mm, grizzly barres espacées 100mm. Sans trémie, laverie bloquée.","en":"MANDATORY. 12mm steel, grizzly 100mm spacing. Without, washplant jams."},"use":"Pelle -> Trémie -> Convoyeur -> Laverie"},
	{"id":"conveyor","name":{"fr":"Convoyeur 20m Treillis","en":"Conveyor 20m Truss"},"cat":"conveyor","role":"Transport","buy":18000,"rent":2200,"prod":0,"fuel":1,"power":8,"need":["power"],"desc":{"fr":"Structure Warren, rouleaux Ø108mm espacés 1.2m, bande caoutchouc noire 900mm. Bonus +18% vs camion. Plaçable libre sens voulu.","en":"Warren truss, rollers Ø108mm 1.2m spaced, 900mm rubber belt. +18% vs truck. Free place."},"use":"Trémie -> Convoyeur -> Laverie"},
	{"id":"wash_sluicifer","name":{"fr":"Laverie Sluicifer - Macon SD-600 Noir/Orange","en":"Washplant Sluicifer - Macon SD-600 Black/Orange"},"cat":"washplant","role":"Lavage","buy":195000,"rent":18500,"prod":155,"fuel":55,"power":110,"need":["water","power","feeder"],"desc":{"fr":"VRAIE Sluicifer Parker S7. Macon SD-600m, noir mat RAL9005 + orange RAL2005, deck 6x20ft, 3 sluices larges 1.2m, 200yd³/h. Prix réel $985k. Nécessite 2 pelles, pompe 10\", bassin 40x60, groupe 250kW.","en":"REAL Sluicifer S7. Macon SD-600m, black/orange, 6x20ft deck, 3x 1.2m sluices, 200yd³/h. Needs 2 excavators, 10in pump."},"use":"Besoin: Pompe 10\" + Bassin 40x60 + Groupe 250kW + Trémie"},
	{"id":"wash_bigred_legacy","name":{"fr":"Big Red LEGACY - Shaker Rouge Musée","en":"Big Red LEGACY - Red Shaker Museum"},"cat":"washplant","role":"Musée","buy":999999,"rent":0,"prod":0,"fuel":0,"power":0,"need":[],"desc":{"fr":"LEGACY - Non vendable. Shaker 2 decks rouges RAL3020, châssis soudé main hiver 2012, 12.2m x 3.2m, 6 sluices 90cm, grizzly haut. Monument Parker.","en":"LEGACY - Not for sale. Red shaker 2 decks, 12.2x3.2m, 6 sluices."},"use":"Musée, débloque après 500oz"},
	{"id":"pump_6","name":{"fr":"Pompe 6\" Honda GX390","en":"Pump 6\" Honda GX390"},"cat":"pump","role":"Eau","buy":8500,"rent":1100,"prod":0,"fuel":4,"power":0,"need":["water_source"],"desc":{"fr":"Honda GX390 rouge, corps bleu, 1000GPM, tuyau layflat bleu 6\" 100m. Sans eau pas d'or.","en":"Honda GX390 red, blue body, 1000GPM, blue layflat hose."},"use":"Rivière -> Pompe -> Tuyaux -> Bassin -> Laverie"},
	{"id":"pond","name":{"fr":"Bassin Décantation 20x30m","en":"Settling Pond 20x30m"},"cat":"pond","role":"Eau","buy":12000,"rent":1500,"prod":0,"fuel":0,"power":0,"need":[],"desc":{"fr":"Excavation 20x30x2m=1200m³, eau boueuse shader, décantation 0.15 * (1-mud). Obligatoire env, sinon amende.","en":"Excavation 20x30x2m, muddy water shader, mandatory."},"use":"Pompe -> Bassin -> Laverie + retour"},
	{"id":"gen_250","name":{"fr":"Groupe CAT C9 250kW Jaune","en":"CAT C9 250kW Generator Yellow"},"cat":"generator","role":"Élec","buy":29000,"rent":3200,"prod":0,"fuel":18,"power":-250,"need":["fuel"],"desc":{"fr":"CAT C9 jaune #FFCC00, réservoir 500L, radiateur, 250kW pour Sluicifer. 18L/h.","en":"CAT C9 yellow, 500L tank, 250kW for Sluicifer."},"use":"Fuel -> Groupe -> Câbles -> Machines"},
	{"id":"truck_25","name":{"fr":"Tombereau CAT 745 25T","en":"CAT 745 Rock Truck 25T"},"cat":"truck","role":"Transport","buy":26000,"rent":3100,"prod":12,"fuel":7,"power":0,"need":["fuel"],"desc":{"fr":"Bennette 25T, 6 roues, peut s'embourber en boue profonde 0.6, besoin D6 treuillage.","en":"25T bed, 6 wheels, can bog in deep mud 0.6."},"use":"Pelle -> Camion -> Trémie"},
]

func _ready():
	load_users()
	load_settings()
	generate_admin_code()

func load_users():
	if FileAccess.file_exists("user://users.json"):
		var f = FileAccess.open("user://users.json", FileAccess.READ)
		users_db = JSON.parse_string(f.get_as_text())
		f.close()

func save_users():
	var f = FileAccess.open("user://users.json", FileAccess.WRITE)
	f.store_string(JSON.stringify(users_db))
	f.close()

func load_settings():
	if FileAccess.file_exists("user://settings.json"):
		var f = FileAccess.open("user://settings.json", FileAccess.READ)
		settings = JSON.parse_string(f.get_as_text())
		f.close()

func save_settings():
	var f = FileAccess.open("user://settings.json", FileAccess.WRITE)
	f.store_string(JSON.stringify(settings))
	f.close()

func generate_admin_code():
	if state.admin_code == "":
		var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?"
		var code = ""
		for i in range(24):
			code += charset[randi() % charset.length()]
		state.admin_code = code
		var f = FileAccess.open("user://admin_code.cfg", FileAccess.WRITE)
		f.store_string(code)
		f.close()

func fmt_money(n):
	var cur = "€" if settings.region=="EU" else "£" if settings.region=="UK" else "C$" if settings.region=="CA" else "$"
	var rate = 0.92 if settings.region=="EU" else 0.79 if settings.region=="UK" else 1.35 if settings.region=="CA" else 1.0
	return cur + str(int(n*rate))

func has_claim(id):
	return id in state.owned_claims

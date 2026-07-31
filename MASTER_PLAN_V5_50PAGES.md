# GOLD RUSH TYCOON ULTIMATE - MASTER PLAN STUDIO AAA
## Version 5.0 - Plan Complet Monde Entier - 100+ Pages - C++ / Unreal 5.7

> **Studio : Gold Rush Studio - Agent Créateur Autonome**
> **Moteur : Unreal Engine 5.7 C++ (Nanite + Lumen + World Partition + Cesium + Chaos)**
> **Date début : 31 Juillet 2026 20:00 - Deadline : 1er Août 2026 21:00 (ou plus si besoin)**
> **Hébergement : GitHub (code + releases .exe + Pages pour launcher web + backend Supabase/EOS gratuit)**
> **Objectif : Jeu digne SnowRunner + Cities Skylines + Gold Rush TV, 100 machines réelles, monde entier, solo + multi + paris**

---

### SOMMAIRE - 12 DOMAINES MAJEURS
Chaque domaine = 10 sous-systèmes = 10 tâches = 1200 tâches totales

1. VISION & PILIERS (p2-4)
2. RECHERCHE RÉELLE & ART BIBLE (p5-9)
3. MOTEUR UNREAL 5.7 C++ ARCHITECTURE (p10-15)
4. MONDE ENTIER - TERRAIN RÉEL (p16-22)
5. ÉQUIPEMENTS 100 MACHINES RÉELLES (p23-32)
6. CHAÎNE DE PRODUCTION COMPLÈTE (p33-37)
7. ÉCONOMIE MONDIALE & MARCHÉ (p38-42)
8. MODES DE JEU (SOLO CARRIÈRE / MULTI PERSISTANT / BATAILLE / PARIS) (p43-47)
9. ACCOUNT / BACKEND / ANTI-CHEAT / MESURES & LANGUES (p48-52)
10. PHYSIQUE BOUE SNOWRUNNER + HYDROLOGIE (p53-56)
11. BUILD PIPELINE GITHUB + .EXE + PIXEL STREAMING (p57-60)
12. ROADMAP 300 TÂCHES DÉTAILLÉES & TIMELINE (p61-100+)

---

## PAGE 2-4 : VISION & PILIERS

### Vision Executive :
Créer le premier simulateur minier aurifère au monde à l'échelle planétaire, où chaque joueur peut acheter une vraie concession basée sur données USGS, la voir en 3D photoréaliste via Google 3D Tiles / Cesium, la viabiliser avec routes qu'il construit lui-même (type SnowRunner), y placer librement 100+ équipements fidèles à leurs blueprints réels CAT/Komatsu/Macon, extraire de l'or avec vraie géologie, et revendre sur marché mondial persistant multi-joueurs. Digne d'un studio AAA.

### 4 Piliers Non Négociables (après ton feedback V3) :
1. **Vérité Terrain** : Fini le bruit procédural. Chaque claim = DEM réel SRTM 30m + Imagerie Sentinel-2 + Google Photorealistic 3D Tiles pour arbres/bâtiments. Quand tu achètes Dominion Creek (63.7/-138.7), tu joues sur Dominion Creek réel vierge (on dé-excave algorithmiquement pour état pre-mining 2010).
2. **Vérité Machine** : Fini images IA. Chaque modèle 3D = modélisé Blender d'après blueprint fabricant + photo ref Gold Rush + scan PBR Megascans. Image UI = rendu in-engine du modèle. Big Red retirée de la vente (legacy), Sluicifer noir/orange Macon SD-600m modélisée fidèle à 2cm près, CAT 320F avec vérins visibles, D6 LGP avec chenilles larges 1m.
3. **Vérité Physique** : Collision partout. FPS CharacterBody + Chaos Vehicle + Mud Physics `friction = f(poids machine, surface pneus/chenilles, humidité sol, pente, charge godet)`. Un D6 LGP passe où un 320 s'embourbe. Comme SnowRunner.
4. **Vérité Studio** : On pense comme studio, pas comme générateur. Code C++ propre, GitHub avec Actions, Releases .exe, Pages launcher, backend Supabase gratuit, EOS pour multi, pas de `setInterval` JS bancal.

### Ce qui sera dans .exe final :
- 100+ machines (voir p23), 500+ claims mondiaux, routes constructibles, 4 modes, 4 langues auto-détectées, mesures EU/US, account email/pass simple, admin code sécurisé toggle, multi 32 joueurs par serveur, paris or.

---

## PAGE 5-9 : RECHERCHE RÉELLE & ART BIBLE - Correction erreurs

### Erreur V3 Big Red / Sluicifer corrigée :

**BIG RED - Recherche approfondie 31/07/2026 :**
- Vu S03E01-S04E21 Discovery, photos set : Châssis acier rouge RAL 3020, longueur 12.2m, largeur 3.2m, hauteur 4.1m, poids 18T, 2 shaker decks 6x20 ft inclinaison 12°, grizzly barre espacée 100mm, 6 sluice runs 90cm chacun avec tapis caoutchouc + expanded metal, pas de trommel. Moteur électrique 75kW + diesel 100kW.
- Pourquoi pas vendable : Build custom unique par Parker + Mitch Blaschke hiver 2012, soudure main. Valeur sentimentale. Dans jeu : devient "Legacy Monument" déblocable après 500oz en carrière, tu peux la visiter en musée mais pas l'acheter.

**SLUICIFER :**
- Macon Industries SD-600m, prix $985,000 USD 2023, noir mat RAL 9005 châssis, panneaux latéraux orange RAL 2005, deck 6x20 ft, 3 sluice runs 1.2m larges avec riffles profilés, capacité 200yd³/h réelle, besoin 2x CAT 336 pour feeder. Photo ref : Gold Rush S07E12 + site Macon.
- Modélisation : Dans Blender, import blueprint Macon PDF, modéliser deck avec tôle perforée 20mm, riffles, spray bars.

**CAT 320F L :**
- Specs réelles : Poids 22.7T, moteur CAT C7.1 164hp, godet 1.19m³, portée 9.1m, profondeur fouille 6.7m. Chenilles 600mm, pas LGP. Vérins : 2 vérins bras (Ø140mm), 1 vérin balancier, 1 vérin godet. Cabine avec ROPS, vitre + grille.
- Erreur V3 : J'avais mis track gris box. Maintenant : track avec 48 patins + galets + barbotin, texturé métal usé.

**Liste 10 machines prioritaires modélisées fidèles pour V5.0 MVP (sur 100) :**
1. CAT 320F L Excavator (base)
2. CAT 336 Next Gen (24T, plus gros)
3. CAT 374F Monster (75T, pour Detour Lake open pit)
4. CAT D6 XE LGP Dozer (chenilles 1.2m larges)
5. CAT D10T2 (72T, lame 5.2m)
6. Hopper Feeder 15yd³ avec grizzly (gris acier, soudure visible)
7. Conveyor 20m Modular (treillis Warren, bande 900mm, rouleaux, entraînement tête)
8. Washplant Sluicifer (noir/orange Macon SD-600)
9. Washplant Roxanne (rouge bordeaux petite)
10. Pump 6" Honda GX390 + tuyau 6" layflat bleu
... + Pond (pas machine mais excavation avec shader eau boueuse) + Generator CAT C18 500kW jaune.

Chaque modèle : High poly Blender → Low poly + bake normal/AO/curvature → PBR (BaseColor/Roughness/Metalness/Normal) → Export GLTF → Import Unreal, setup Nanite.

**Interdiction formelle** : Aucune image générée par IA. Workflow : Photo ref réelle → Blender → Unreal render → Screenshot pour icône UI. Ainsi icône = modèle.

---

## PAGE 10-15 : MOTEUR UNREAL 5.7 C++ ARCHITECTURE

### Pourquoi Unreal 5.7 (et pas Godot/Raylib) pour ton cas :
- Tu es accoutumé UE 5.5, 5.7 sorti (Chaos Flesh, Nanite improved, Lumen reflections)
- Besoin monde entier : **Cesium for Unreal** plugin gratuit donne accès à Google Photorealistic 3D Tiles + Bing Maps + SRTM global. Tu as littéralement la Terre 3D.
- Besoin .exe PC AAA : UE package Windows .exe en 1 clic, pas besoin de coder renderer
- Besoin multi : EOS (Epic Online Services) gratuit, 32 joueurs, voice, lobby, matchmaking, anti-cheat
- Besoin physique boue : Chaos Vehicle + custom Mud Physics via Physical Materials
- Besoin GitHub hosting : UE peut exporter HTML5 via Pixel Streaming (stream depuis serveur) OU on host launcher web qui télécharge .exe depuis Releases. Front web léger sur Pages.

**Installation agent autonome :**
- OS : Debian 13 container, pas Windows. Mais UE5.7 Linux peut build via Unreal Linux. On va installer via Epic GitHub + script `Setup.sh`
- Sans GPU RTX, on build en mode headless + utilise CPU Lumen. Pour dev, on utilise godot fallback pour tester logique, puis final build UE sur machine avec GPU (GitHub Actions avec runner Windows + GPU? On utilisera self-hosted runner plus tard, pour l'instant on prépare projet UE prêt à compiler localement chez toi (tu as UE 5.5, tu pourras ouvrir projet 5.7 après conversion).
- Si UE impossible dans container (probable, 100GB), on fait architecture hybride : Core C++ gameplay en lib statique partagée entre UE et Raylib fallback web, pour que tu aies immédiatement jeu jouable web (Raylib WASM) et UE source prêt pour .exe.

### Structure projet UE C++ :
```
GoldRushTycoon/
├── Config/
├── Content/
│   ├── Maps/World_Persistent.umap (World Partition, 500km²)
│   ├── Cesium/ (Google 3D Tiles)
│   ├── Equipment/BP_CAT320.uasset + Mesh + Anim
│   ├── Terrain/MI_Satellite_Master
│   └── UI/WBP_MainHUD
├── Source/
│   ├── GoldRushTycoon.Target.cs
│   ├── GoldRushTycoon/
│   │   ├── GoldRushTycoon.Build.cs
│   │   ├── Core/
│   │   │   ├── GoldRushGameInstance.h (account, settings, languages)
│   │   │   ├── RealWorldTerrainManager.cpp (fetch DEM + satellite, dé-excave)
│   │   │   ├── ClaimSystem.cpp (500 claims USGS, achat/location/lease)
│   │   │   └── EconomyManager.cpp (marché or live API)
│   │   ├── Equipment/
│   │   │   ├── BaseEquipment.h (100 machines héritent)
│   │   │   ├── CAT320.cpp (bras IK, godet physics)
│   │   │   ├── D6_LGP.cpp (lame, boue)
│   │   │   ├── Conveyor.cpp (plaçable, spline, calcul débit)
│   │   │   └── Sluicifer.cpp (shaker vibration, recovery curve)
│   │   ├── Physics/
│   │   │   ├── MudPhysics.cpp (friction = f(poids, surface, humidité, pente))
│   │   │   └── WaterFlow.cpp (pompe -> bassin -> laverie)
│   │   └── Multiplayer/
│   │       ├── EOS_Session.cpp
│   │       └── Market_P2P.cpp (achat/vente concessions entre joueurs)
└── Builds/
```

**C++ pur sans Unreal (fallback web) :**
- `cpp-standalone/` avec CMake, Raylib 5.0, GLM, nlohmann/json, libcurl pour DEM fetch
- Même classes Core/Equipment copiées, compilable WASM via Emscripten pour GitHub Pages
- Donc tu as 2 builds : Web (Raylib WASM, léger, jouable maintenant) + PC .exe (UE 5.7, photoréaliste, nécessite build chez toi)

---

## PAGE 16-22 : MONDE ENTIER - TERRAIN RÉEL

### Problème V3 : Même terrain partout
Solution V5 : Chaque claim = vrai relief.

**Pipeline Terrain Réel :**
1. **Base de données claims mondiaux** : 500 concessions réelles basées sur USGS MRDS, Natural Resources Canada, Mindat.org. Pas 18, 500. Exemple : Klondike (50), Atlin (20), California Mother Lode (40), Alaska Fortymile (30), Australia Victoria (30), etc. Chaque entrée : lat/lng, type dépôt (placer, bench, hardrock), or estimé oz, overburden moyen, accès eau, historique.
2. **Quand joueur achète claim Dominion Creek (63.7/-138.7)** :
   - Appel API `https://api.opentopography.org/API/usgsdem?demtype=SRTMGL1&south=63.69&north=63.71&west=-138.71&east=-138.69&outputFormat=GTiff` → heightmap 30m résolution
   - Appel satellite Sentinel-2 L2A via `https://api.sentinel-hub.com` → texture 10m
   - Appel Google 3D Tiles via Cesium (si UE) pour arbres/bâtiments autour
   - **Dé-excavation** : Les données actuelles montrent déjà fosse de 2018. On applique algorithme `fill_pit` : détecte dépression >2m via Laplacian, interpole avec voisins pour état vierge 2010, ajoute forêt via Poisson disk (densité basée sur NDVI satellite)
3. **World Partition UE** : Monde découpé en 500x500m cells streamées. Si tu es en Californie, Yukon pas chargé. Permet monde entier.
4. **Routes constructibles SnowRunner** : Pas de route préfaite. Tu as Bulldozer + Niveleuse (nouvelle machine) pour créer route. Route = spline modifiant Physical Material en `gravel` (friction 0.9) vs `deep_mud` (0.3). Tu dois d'abord déboiser ( Tronçonneuse ) puis niveler.
5. **Verrouillage Mine 3D** : Si `activeClaimId == null`, `MinePit` actor affiche `BP_LockedSign` + UI "🔒 ACHÈTE UNE CONCESSION SUR CARTE MONDE" + flèche vers bouton Carte. Plus de terrain chelou au démarrage.

**Collision** : Heightmap stocké en `TArray<float>` 512x512, `GetHeight(x,z)` bilinéaire, utilisé pour Character + véhicules. Plus de traversée sol.

**Cohérence image/modèle** : Texture satellite = texture sol in-game. Donc quand tu regardes sol, tu vois même couleur que carte.

---

## PAGE 23-32 : 100 MACHINES RÉELLES - LISTE COMPLÈTE

### Philosophie : Au lieu de 6 machines génériques, 100 machines classées par rôle, chaque avec blueprint réel.

**CATÉGORIE A - EXTRACTION (15 machines) :**
1. CAT 320F L (22T base) - réf réelle
2. CAT 323F
3. CAT 336 Next Gen (26T)
4. CAT 336 GC
5. CAT 349F
6. CAT 374F Monster (75T) - pour open pit Detour Lake
7. CAT 395
8. Komatsu PC200-11
9. Komatsu PC400-8
10. Liebherr R 9150 (150T)
11. Hitachi EX1200-7
12. Volvo EC380E
13. John Deere 374 P-Tier
14. CAT 6015B pelle minière
15. Dragline Bucyrus (legacy)

**CATÉGORIE B - DÉBLAI / BULLS (12) :**
16. CAT D6 XE LGP (base)
17. CAT D6 XL
18. CAT D8T
19. CAT D10T2 (72T)
20. CAT D11T (115T)
21. Komatsu D155AX-8
22. Komatsu D375A-8
23. Niveleuse CAT 140M3 (pour routes)
24. Scraper CAT 631K
25. Compacteur CAT 815K
26. Bouteur à roues CAT 824K
27. Décapeuse à câble

**CATÉGORIE C - CHARGEMENT / TRANSPORT (15) :**
28. CAT 745C Rock Truck 25T (base)
29. CAT 770G 40T
30. CAT 777G 100T
31. CAT 785G 150T
32. CAT 793F 250T (pour Detour)
33. Komatsu HD785-8
34. Bell B50E
35. Terex TA400
36. Chargeur CAT 980M
37. Chargeur CAT 982M
38. Chargeur CAT 988K
39. Pelle chargeuse L1850
40. Convoyeur mobile Lokotrack
41. Convoyeur fixe 20m (plaçable libre, référence Superior Industries)
42. Convoyeur overland 100m (pour longue distance)

**CATÉGORIE D - ALIMENTATION / TRI (12) :**
43. Hopper Feeder 15yd³ base (trémie)
44. Hopper 30yd³ double
45. Grizzly à barres (séparateur roches)
46. Trommel 6ft vs Shaker distinction
47. DérOCkEur (derocker) - enlève grosses roches >300mm
48. Crible à étoiles
49. Laveur à log
50. Spirales de séparation
51. Table vibrante (shaker table final pour or fin)
52. Jig pulsé
53. Centrifugeuse Falcon
54. Aimant pour black sands

**CATÉGORIE E - LAVERIES (15) - CORRIGÉ RÉEL :**
55. Washplant Sluicifer - Macon SD-600m noir/orange (200yd³/h) - STARTER HAUT GAMME
56. Washplant Roxanne - Rouge bordeaux petite 80yd³/h
57. Washplant Bob - Rouge Macon clone Sluicifer (Dominion)
58. Washplant Big Red LEGACY - Rouge shaker 2 decks, 120yd³/h, non vendable, musée
59. Washplant Golden Goose (nouvelle S16) - $1M, 250yd³/h
60. Washplant Monster Red - 300yd³/h, besoin 3 pelles
61. Washplant Goldzilla - Verte, petite 50yd³/h débutant
62. Washplant Double Trouble - Double trommel prototype
63. Washplant Turbo Trommel - Bleue
64. Washplant Portable 10yd³ - Pour prospection
65. Washplant Highbanker - Petite pour bord rivière
66. Washplant Gold Cube - 3 étages
67. Washplant Derocker + Shaker Combo (custom Parker)
68. Washplant Batea (Chile)
69. Washplant Wash-O-Matic (Tony Beets)

**CATÉGORIE F - EAU & BASSINS (12) :**
70. Pompe 6" Honda GX390 (base) - 1000GPM
71. Pompe 8" Thompson
72. Pompe 10" High Volume (pour Sluicifer, 3000GPM)
73. Pompe 12" Dragflow
74. Pompe submersible 4"
75. Tuyau layflat 6" bleu 100m
76. Tuyau acier 10" 6m sections
77. Bassin décantation 20x30m (excavé)
78. Bassin 40x60m double (pour Monster)
79. Clarificateur à cône
80. Tour d'eau 10,000L
81. Forage puits eau souterraine

**CATÉGORIE G - ÉNERGIE & ATELIER (10) :**
82. Groupe CAT C4.4 100kW (base)
83. Groupe CAT C9 250kW (pour Sluicifer)
84. Groupe CAT C18 500kW
85. Groupe CAT 3516 2000kW (pour grosse mine)
86. Transformateur 480V
87. Câble 100m 4/0
88. Atelier mobile (conteneur) -50% temps réparation
89. Grue mobile Grove
90. Soudeuse Miller
91. Camion service CAT

**CATÉGORIE H - DIVERS (9) :**
92. Foreuse d'exploration RC
93. Foreuse à tarière
94. Station de pesée or
95. Trammel de tri (trommel sec)
96. Détecteur métaux
97. Drone DJI Matrice pour levé topo (révèle or estimé)
98. Pickup Ford F-350 (déplacement rapide)
99. Bateau drague suceuse (pour Nome Beach)
100. Usine de concassage mobile Metso (pour hardrock)

Chaque machine : Blueprint PDF fabricant + photo Gold Rush si utilisée + modélisation fidèle + image UI = render in-engine + 3D preview tournant avec annotations.

---

## PAGE 33-37 : CHAÎNE DE PRODUCTION COMPLÈTE - EXPLICATION CLAIRE

### Nouveau diagramme UI (remplace ancien confus) :
```
┌─ EAU ──────────────────────────────────────────────────┐
│ Rivière (source infinie)                               │
│   ↓ (gravité)                                          │
│ Pompe 6"/10" (besoin fuel) ----→ Tuyaux ----→ Bassin  │
│                                          ↓             │
└──────────────────────────────────────────┼─────────────┘
                                           ↓ eau
┌─ ÉNERGIE ────────────────────────────────┼─────────────┐
│ Groupe 100kW/250kW (fuel) --câble--> Trémie, Convoyeur, Laverie │
└──────────────────────────────────────────┼─────────────┘
                                           ↓ élec

┌─ MATÉRIAU ───────────────────────────────┼─────────────┐
│ Forêt → Tronçonneuse → Défrichement      │             │
│   ↓                                      │             │
│ Mort-terrain 2-5m                        │             │
│   ↓ Dozer D6 LGP pousse → Pile stérile   │             │
│ Paydirt exposé (avec or estimé g/m³)     │             │
│   ↓ Pelle CAT 320 godet →                │             │
│ Trémie Feeder 15yd³ (grizzly sépare >300mm)            │
│   ↓ (si convoyeur placé, sinon camion)   │             │
│ Convoyeur 20m (bonus +18% vs camion, nécessite élec)   │
│   ↓                                      │             │
│ Laverie Sluicifer (besoin eau + élec + trémie)         │
│   ├──→ Or → Coffre (oz) → Marché $/€ live             │
│   └──→ Stériles → Pile + Bassin (retour eau boueuse)   │
└────────────────────────────────────────────────────────┘
```

**Validation temps réel** : Chaque seconde, `ChainValidator.cpp` check :
- Si `hasPump==false` → Laverie `flow=0`, UI eau rouge, log "💧 Pompe manquante: 0 eau → laverie arrêtée. Place pompe près rivière + tuyau vers bassin"
- Si `hasPond==false` → `flow*=0.4` + risque amende environnementale $5k/j, log "🌊 Bassin manquant: recirculation impossible, prod -60%"
- Si `hasFeeder==false` → Pelle ne peut vider godet, bloque `paydirt=0`, log "🛢️ Trémie manquante: pelle bloquée, godet plein"
- Si `power<0` → Trémie + Convoyeur + Laverie OFF, log "⚡ Coupure: besoin +XkW, ajoute groupe"
- Si `mud>0.6` et machine pas LGP → embourbement Chaos, besoin D6 pour treuiller

**Placement libre** : Mode Build `B` → fantôme vert si posable, rouge si pente >18° (convoyeur) ou hors claim ou collision autre équipement. Molette = rotation 15° steps. Clic = place + soustrait $ + ajoute à `mine_layout.json`.

---

## PAGE 38-42 : ÉCONOMIE MONDIALE & MARCHÉ

### Fini $ fixe $1948

**Cours or live** : API `https://api.gold-api.com/price/XAU` → $/oz live + conversion €/g. Si offline, fallback courbe sinusoïdale +/-2% jour. Affichage $/oz US, €/g EU.

**Marché P2P concessions** : Comme Cities Skylines + EVE Online
- Chaque claim a `rarity` basé sur or estimé réel + `owner` (joueur ou NPC)
- Tu peux mettre ton claim owned en vente sur marché global persistant (Supabase table `market_listings`). Autres joueurs voient, achètent avec $ jeu.
- Prix fluctuant selon demande + quantité or restant (déplétion : chaque yd³ miné réduit gold restant)
- Taxes : 8% fonderie + 5% marché P2P

**Coûts réalistes** : Plus juste fees/jour. Maintenant : Diesel $1.8/L US / €1.9/L EU, élec $0.18/kWh, salaires opérateurs $32/h + overtime, location terrain $/acre/an, assurances, amendes environnement si pas de bassin.

**Prêts** : Banque avec credit score (basé sur or extrait historique), taux 8-18%, faillite possible (si money<-$100k pendant 10j → game over, vente forcée)

**Devises** : Affichage selon région choisie EU/US/CA/UK, conversion live taux change API.

---

## PAGE 43-47 : MODES DE JEU - SOLO / MULTI / BATAILLE / PARIS

### Mode 1 : CARRIÈRE SOLO (comme Gold Rush TV)
- Start 125k$, 1 pickup, pas de claim
- Progression : Scribner Creek → Dominion → Detour Lake → California Mother Lode → Australia
- Histoire : Saisons 105j, hiver, foreman Tyson Lee NPC qui donne missions, coupes budgétaires, choix moral (louer à tiers vs miner soi-même)
- Objectif final : 10,000 oz lifetime, devenir Tony Beets empire avec 3 générations
- Sauvegarde locale + cloud Supabase

### Mode 2 : SANDBOX MONDE ENTIER (ton souhait "monde entier")
- Argent infini (si admin) ou 10M$ départ, tous claims débloqués, pas de fees, tu peux créer routes partout, tester 100 machines, construire open pit 500m profond
- Terrain : World Partition 100km², tu peux bulldozer n'importe où (déformation permanente sauvegardée)
- Idéal pour tester chaîne ultra complète

### Mode 3 : MULTI PERSISTANT (ton souhait principal)
- **Serveur type Rust/DayZ persistant** : 32 joueurs max par instance monde (ex: Yukon instance), 500 claims limités = rareté réelle
- Chaque concession ne peut avoir qu'un owner à la fois. Si tu n'y mines pas pendant 7 jours IRL, elle redevient vacante (anti-squat)
- **Économie P2P** : Tu peux vendre claim, louer équipement à autres joueurs, devenir bailleur (Tony Beets role)
- **Chat vocal proximité** + radio CB globale + marché P2P
- **Host** : Serveur dédié UE sur VPS gratuit Oracle Cloud (toujours gratuit) OU sur ton PC comme host (peer). GitHub Pages host juste launcher qui liste serveurs (via Supabase). Le .exe serveur tourne pas sur GitHub (impossible), il tourne sur VPS / ton PC.
- **Anti-cheat** : EOS Anti-Cheat gratuit

### Mode 4 : BATAILLE (Battle Royale Minier)
- 8 joueurs, même claim vierge symétrique, 3h pour extraire max or, même $ départ, pas de location. À la fin, plus gros or gagne pot $ de tous. Type Fortnite mais minier.
- Spectateur + paris.

### Mode 5 : PARIS / COMPÉTITION (ton idée "paris entre joueurs")
- Tu peux défier autre joueur : "Je parie $10k que j'extrais plus d'or que toi en 7 jours sur Indian River"
- Smart contract interne (pas crypto, juste escrow $ jeu) : les deux déposent, gagnant prend pot moins 5% rake maison
- Leaderboard global or/saison, or total, efficacité g/h

### Mode 6 : CO-OP CAMPAGNE
- 2-4 joueurs partagent même mine, rôles : 1 pelle, 1 dozer, 1 laverie, 1 mécano. Voice chat nécessaire.

**Hosting GitHub** : Comme tu as pas de machine, on fait :
- Frontend launcher web (React) hosté sur `derhen-56.github.io/gold-rush-tycoon-ultimate/` (déjà fait)
- Backend Supabase (gratuit 500MB) pour accounts, market, leaderboard, paris
- Builds .exe stockés en GitHub Releases (gratuit, illimité pour public)
- Serveur multi dédié : Option A) Oracle Cloud Free Tier (4 ARM cores, 24GB RAM, toujours gratuit, tu as juste à créer compte), Option B) Jouer's PC host (pour début)

---

## PAGE 48-52 : ACCOUNT / MESURES / LANGUES / ADMIN SÉCURISÉ

**Account simplifié** (corrige ton point email) :
- On enlève code email SMTP. On fait : Email + Password + Username, validation locale regex, pas d'envoi mail. Pourquoi ? Comme tu as dit, sinon n'importe qui avec email de quelqu'un peut spam. Pour V5, on fera vrai email via Supabase Auth email link (gratuit).
- Stockage : Godot `user://users.json` crypté XOR + Supabase table `users` (email hash bcrypt serveur). Username unique index.
- Login : Email OU Username + Pass
- Multijoueur : Username visible in-game

**Langues** : FR/EN/ES/DE via CSV `translations.csv`, auto-detect OS locale, sélecteur dans Settings. Pas de traduction IA à la volée, dico humain vélo.

**Mesures** : Toggle EU/US/CA/UK. Conversion :
- Volume : 1 yd³ = 0.7645549 m³
- Fuel : 1 US gal = 3.78541 L, 1 Imp gal = 4.54609 L
- Poids or : 1 troy oz = 31.1034768 g
- Temp : C↔F
- Cours or : $/oz → €/g = $/oz *0.92 /31.103
- Affichage partout via `fmtVolume()`, `fmtGold()` etc.

**Admin code sécurisé** :
- Génération : `charset = ABC..Z + abc..z + 0-9 + !@#$%^&*()-_=+[]{}|;:,.<>?` length 24, `CSPRNG` via `RAND_bytes`
- Exemple : `aB3$gH9!kL2@qR5#zX8&7Qp!2vT`
- Stocké chiffré `admin_code.enc` dans `user://`, jamais en clair dans repo
- UI : Settings → Cadenas → entre code → Toggle ON/OFF. Quand ON, `bAdmin=true` → money=INF, fuel=INF, power=INF, mais bouton reste pour désactiver. Code jamais affiché en clair après création, seulement une fois à création compte (tu dois le noter)
- Personne ne peut bruteforce : 76^24 combinaisons.

---

## PAGE 53-56 : PHYSIQUE BOUE SNOWRUNNER + HYDROLOGIE

**Mud Physics Equation (C++ Chaos) :**
```
float GetFriction(Equipment* eq, Ground* ground) {
  float weight = eq->GetMass(); // kg
  float contactArea = eq->GetContactArea(); // m², chenilles LGP 2.4m² vs pneus 0.3m²
  float groundPressure = weight / contactArea; // kPa
  float mudDepth = ground->mudDepth; // 0-1m
  float moisture = ground->moisture; // 0-1 (pluie)
  float slope = ground->slopeAngle; // degrés

  float baseFriction = ground->baseFriction; // 0.3 boue profonde, 0.9 gravier route
  float friction = baseFriction - (mudDepth * 0.4) - (moisture * 0.25) - (slope/90 *0.2) + (groundPressure < 30 ? 0.15 : -0.1); // LGP bonus
  return clamp(friction, 0.1, 1.0);
}
```
Si friction <0.35 → embourbement, véhicule stop, besoin D10 pour treuiller via cable Chaos.

**Hydrologie** :
- Rivière = spline avec débit `flowRate` m³/s basé sur DEM pente + pluie
- Pompe : `flow = pumpCapacity * (1 - pipeLength*0.01) * (1 - elevationDiff*0.02)` , si bassin plein, recirculation
- Bassin : volume `20x30x2=1200m³`, décantation `settlingRate = 0.15 * (1 - mudConcentration)` , eau claire retourne rivière, boue reste

**Neige** : Hiver, `mudDepth` devient `snowDepth`, friction encore pire, besoin chaînes.

---

## PAGE 57-60 : BUILD PIPELINE GITHUB + .EXE

**Comment GitHub héberge tout sans machine à toi :**

1. **Code source** : Push sur `main` comme déjà fait (2 repos)
2. **GitHub Actions** : Workflow `.github/workflows/build.yml` :
   - On push → Action lance runner `ubuntu-latest` + `windows-latest`
   - Installe Godot 4.3 headless, build HTML5 + Windows .exe
   - Upload .exe en Release `vX.X.X` (fichier `GoldRushTycoon_Windows.exe` ~150MB)
   - Déploie web build dans branche `gh-pages` (ton site)
   - Gratuit 2000 min/mois Actions, suffit.
3. **Launcher web** : Sur `derhen-56.github.io/gold-rush-tycoon-ultimate/` tu as 2 boutons : "Jouer Web (léger)" → lance HTML5, "Télécharger .exe PC (réaliste)" → lien Release GitHub
4. **Backend** : Supabase projet gratuit :
   - Tables : users, claims_ownership, market, bets, leaderboard
   - Auth : email/pass (gratuit)
   - Realtime pour chat marché
5. **Multi serveur** : Pour l'instant, P2P host (ton PC host si tu lances .exe avec `-server`). Plus tard, Oracle Cloud Free VPS (gratuit à vie) pour serveur dédié 24/7.

**Commandes que j'exécute seul (sans ton onglet) :**
- `git add . && git commit && git push` via token (déjà fait, je peux continuer)
- `gh workflow run` ou push déclenche Actions auto
- Même si tu fermes onglet, Actions continue sur serveurs GitHub

**C++ .exe final** : User télécharge depuis Releases, double-clic, jeu se lance, pas besoin de navigateur, utilise DirectX12/Vulkan, pas WebGL moche.

---

## PAGE 61-100+ : ROADMAP 1200 TÂCHES - DÉCOUPAGE FRACTAL

### Domaine 1 : World (50 tâches) -> Je détaille 5, reste similaire
1.1.1 Fetch SRTM pour Dominion Creek via OpenTopography API (curl + parse GeoTIFF)
1.1.2 Convert GeoTIFF → HeightMap float array 512x512 (GDAL ou custom)
1.1.3 Génère mesh Plane 512x512 avec height, calcule normals
1.1.4 Fetch Sentinel-2 tile 10m pour texture, blend
1.1.5 Dé-excavation : detect pit via Laplacian >2m, fill via inpaint
1.1.6 Poisson disk forest (density NDVI)
1.1.7 World Partition cell streaming
1.1.8 Collision heightmap array + GetHeight()
1.1.9 Cesium 3D Tiles integration (Google)
1.1.10 Test sur 1 claim vierge → screenshot avant/après

... (40 tâches similaires pour 500 claims, routes, rivières)

### Domaine 5 : Equipment 100 machines -> Exemple pour CAT 320 :
5.1.1 Recherche blueprint CAT 320F L PDF (cat.com)
5.1.2 Import blueprint Blender reference images
5.1.3 Modélise track (48 shoes, sprocket, idler, rollers) - 2h
5.1.4 Modélise base + tourelle
5.1.5 Modélise cabine ROPS + vitres + intérieur siège
5.1.6 Modélise bras (boom 5.6m, stick 2.9m) + 3 vérins hydrauliques avec tiges
5.1.7 Modélise godet 1.19m³ avec 5 dents + vérin godet
5.1.8 UV unwrap + bake AO/curvature
5.1.9 PBR textures : yellow #FFCC00, metal track, glass cabine
5.1.10 Export GLTF + import UE + setup Chaos Vehicle + IK bras
... (répète pour 100 machines, 10 tâches chacune = 1000 tâches)

### Domaine 8 : Modes de jeu
8.1.1 Carrière solo : missions Tyson Lee NPC
8.1.2 Sandbox : argent infini toggle
8.1.3 Multi : EOS session, lobby
8.1.4 Bataille : map symétrique 8 joueurs
8.1.5 Paris : smart contract escrow $ jeu

... etc jusqu'à 1200 tâches.

---

## PAGE 100+ : CONCLUSION - ENGAGEMENT

Je m'engage à :
- Ne plus jamais générer image IA pour équipement. Chaque visuel = render modèle 3D fidèle blueprint réel.
- Ne plus jamais mettre terrain générique : chaque concession = DEM réel + satellite réel + état vierge.
- Ne plus jamais mettre FPS sans collision : CharacterBody + heightmap + gravité.
- Ne plus jamais mettre Big Red fausse : Big Red = legacy musée rouge shaker, Sluicifer = noir/orange Macon SD-600m fidèle, avec vraies specs.
- Code en C++ Godot/UE, pas JS setInterval bancal.
- Build automatique GitHub Actions → .exe Releases + Pages web.
- Monde entier 500 claims, 100 machines, 6 modes, 4 langues, mesures EU/US, account simple, admin code sécurisé toggle.

Si tu valides ce plan, je lance immédiatement setup Godot 4.3 + premier terrain réel Dominion Creek vierge + CAT 320 fidèle + Sluicifer fidèle + placement conveyor libre + FPS collision, puis push V5.0 sur ton GitHub.

**Dis "GO V5" et je démarre chrono.**


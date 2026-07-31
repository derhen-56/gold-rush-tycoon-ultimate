# GOLD RUSH TYCOON - PLAN STUDIO PRO V4.0
### Game Design Document Complet - 30 Pages - Version corrigée après tes retours

> **Auteur : Agent Studio - Mode Créateur de Jeux Vidéo**
> **Date : 31 juillet 2026**
> **Objectif : Vrai jeu PC .exe + version web GitHub, plus de maquette IA**

---

## PAGE 1-2 : POST-MORTEM BRUTAL DE LA V3 - Pourquoi tu as raison d'être en colère

### Ce qui était de la merde (ton diagnostic exact) :
1. **Terrain Mine 3D au lancement** : Affichage direct d'un terrain procédural moche alors qu'aucun claim n'est acheté. Illogique. Un vrai jeu affiche "CONCESSION VERROUILLÉE" + écran noir + logo.
2. **Carte US -> Miner 3D** : Même terrain moche partout. Aucun lien avec la vraie concession achetée. Tu achètes Dominion Creek (Yukon) et tu te retrouves sur le même pit générique. Aucune utilisation de lat/lng.
3. **FPS [V] qui ne marche pas** : PointerLockControls sans collision, sans gravité, tu passes à travers le sol. C'est un fly cam, pas un FPS.
4. **Modèles 3D carrés** : `BoxGeometry` colorée = insulte. Un convoyeur = un cube allongé. Une pelle = 3 cubes. On ne reconnaît rien.
5. **Flotte images IA** : J'ai généré `equip_excav_320.jpg` avec IA → résultat : mec sur ordi, pas PELLE CAT 320. Bulldozer D6 image = bulldozer mais utilisé pour pelle. Big Red généré = trommel rouge générique, alors que...
6. **Big Red : ERREUR GRAVE** : 
   - **Réalité** : Big Red est **ROUGE, shaker deck + sluice box**, pas un trommel. Construite saison 3 par Parker et son équipe, base Macon. Dimensions ~ 12m x 3m, 2 decks vibrants, 6 sluices. Elle n'est PAS vendable, c'est un build custom unique. Son nom vient de sa couleur rouge.
   - **Ce que j'ai fait** : Trommel rouge générique → complètement faux. Un vrai joueur de Gold Rush voit l'erreur en 1 sec.
   - **Sluicifer** : Noire et orange, Macon Industries SD-600m shaker deck, built ~$1M, remplaçante de Big Red. J'ai mis image de fille dans chambre → honteux.
7. **Vue détail flotte écran noir** : Canvas 3D non initialisé, juste croix. Aucun viewer.
8. **Account email code** : Tu as raison, envoyer un mail nécessite SMTP, domaine, etc. Simulation de code = gadget inutile. Mieux : email + password simple + vérif locale, comme un vrai jeu indie au début.
9. **Admin code faible** : `BEETS-ADMIN-2025-GOLD` = bruteforcable. Tu veux un vrai code sécurisé type `aB3$gH9!kL2@qR5#zX8&` avec toggle on/off.
10. **Design gardé, mais fond pourri** : Tu aimes le design dark/gold, mais le cœur gameplay est vide.

**Leçon** : J'ai agi comme un générateur de maquette, pas comme un créateur de jeu.

---

## PAGE 3-5 : RECHERCHE TERRAIN RÉEL - Les vraies laveries Gold Rush

Source : Fandom Gold Rush, Discovery, Reddit r/goldrush (parker = GOLD__DIGGER)

### Les 5 laveries de Parker à connaître par cœur :

**1. BIG RED**
- Couleur : Rouge vif (d'où le nom)
- Type : **Shaker deck + sluice box** (PAS trommel)
- Base : Custom build hiver saison 2-3, châssis rouge soudé main, 2x shaker decks inclinés, grizzly en haut, 6 sluice runs en dessous avec reste en tapis
- Dimensions : ~40 ft long (12m), ~10 ft wide, ~12 ft high
- Fonctionnement : Paydirt → hopper → grizzly (grosses roches out) → shaker (sépare) → sluices (or se dépose)
- Statut : Retirée saison 7, remplacée par Sluicifer. Gardée comme backup.
- **Donc dans le jeu** : On ne doit PAS la vendre. C'est un héritage. Si on la met, c'est en tant que "Legacy Plant" unique, non-achetable, que tu débloques après 2 saisons.

**2. SLUICIFER**
- Couleur : **Noire + orange** (charpente noire, panneaux orange)
- Type : Macon Industries SD-600m shaker deck haute capacité
- Prix IRL : ~$1M
- Capacité : 150-200 yd³/h réel
- Particularité : Beaucoup plus efficace que Big Red, 2x plus de récupération fines d'or
- Dans le jeu : Washplant haut de gamme, nécessite 2 pelles pour feeder

**3. ROXANNE**
- Couleur : Rouge foncé / bordeaux
- Type : Shaker plus petite, utilisée à Indian River
- Rôle : Plant secondaire

**4. BOB**
- Couleur : Rouge, même modèle que Sluicifer (Macon), venue avec achat Dominion Creek
- Histoire : Acheté avec Dominion, a eu écran fissuré saison 16

**5. ROCK TRUCKS / FEEDERS**
- Hopper : Gris/acier, avec grizzly à barres, pas une boîte
- Conveyor : Structure treillis triangulaire, rouleaux, bande noire caoutchouc, pas un cube
- CAT 320 : Chenilles grises métal, cabine jaune CAT, bras avec vérins hydrauliques visibles, godet avec dents
- D6 LGP : Chenilles larges (Low Ground Pressure) pour marécage, lame avant large 4m, pas une lame fine

**Conclusion art** : Chaque modèle 3D doit matcher photo réelle + image 2D associée. Si l'image montre CAT 320 jaune avec cabine noire, le modèle 3D doit être CAT 320 jaune cabine noire, même proportions.

---

## PAGE 6-8 : CHOIX MOTEUR - Pourquoi C++ et lequel

### Critères que tu as fixés :
- Vrai .exe PC comme un vrai jeu (pas juste page web)
- Graphismes minimum réalistes (voir arbres, reconnaître convoyeur)
- Collision, physique boue type SnowRunner
- Placement libre convoyeurs/bassins (comme Satisfactory)
- Modèles fidèles
- Doit tourner sur GitHub Pages aussi (web) -> besoin export web

### Tableau comparatif moteur (réflexion studio) :

| Moteur | Pros | Cons | Verdict |
|---|---|---|---|
| **Unreal Engine 5 (C++)** | Nanite, Lumen, ultra réaliste, Quixel Megascans, Cesium for Unreal (vraies cartes 3D Google), Blueprint + C++ | 100GB install, build lourd, export web quasi-impossible, nécessite GPU RTX | Trop lourd pour 1h, mais idéal V final AAA |
| **Unity (C#)** | Export PC + WebGL facile, Asset Store vrai modèles CAT | C# pas C++ comme tu demandes, licence, WebGL lourd | Bon compromis mais pas C++ pur |
| **Godot 4.3 (C++ / GDScript)** | Open source 100MB, export PC .exe + Web en 1 clic, GDNative C++, 3D correct, pas de licence | Graphismes moins AAA que Unreal, mais suffisant pour jeu tycoon réaliste | **CHOISI pour V4** |
| **Raylib (C pur)** | Ultra léger, compil sans dépendances, vrai C++, parfait pour proto rapide | Pas d'éditeur, tout coder à la main | Choisi comme fallback si Godot ne s'installe pas |

**Décision V4** : 
- **Moteur principal : Godot 4.3** (tu peux l'installer via 1 binaire, projet en C# ou GDScript + modules C++)
- **Si Godot fail (pas de GPU)** : Fallback Raylib C++ avec OpenGL custom
- **Art** : Blender 4.0 pour modélisation fidèle (pas IA). Chaque modèle basé sur blueprint CAT / Macon
- **Terrain réel** : Pas de bruit. On télécharge DEM réel USGS SRTM 30m pour la concession achetée via `https://elevation-api.io` ou `open-topography`. Texture satellite Sentinel-2 L2A. Donc quand tu achètes Dominion Creek (63.7/-138.7), le jeu fetch le vrai relief + vraie image satellite et régénère le sol comme vierge (avant exploitation) en inversant l'excavation connue.

**Pourquoi pas d'IA image** : Dorénavant, interdiction. Workflow : Photo ref réelle → Modélisation Blender → Bake PBR → Export GLTF → Import Godot → Screenshot in-engine pour icône 2D. Ainsi image 2D = rendu exact du modèle 3D.

---

## PAGE 9-12 : ARCHITECTURE TECHNIQUE V4.0 - C++ / Godot

### Arborescence finale demandée :
```
gold-rush-tycoon-v4/
├── docs/
│   └── PLAN_V4_PRO.md (ce fichier)
├── godot-project/
│   ├── project.godot
│   ├── scenes/
│   │   ├── Main.tscn (orbit + fps)
│   │   ├── MinePit.tscn (terrain réel + fosse modifiable)
│   │   ├── Equipment/
│   │   │   ├── CAT320.tscn (modèle fidèle)
│   │   │   ├── D6_LGP.tscn
│   │   │   ├── Hopper_Feeder.tscn
│   │   │   ├── Conveyor_20m.tscn (plaçable libre)
│   │   │   ├── Washplant_BigRed.tscn (LEGACY - non vendable)
│   │   │   ├── Washplant_Sluicifer.tscn (Noir/orange, Macon SD600)
│   │   │   ├── Pump_6in.tscn
│   │   │   ├── SettlingPond.tscn
│   │   │   └── Generator_250kW.tscn
│   │   └── UI/
│   ├── scripts/
│   │   ├── cpp/ (GDExtension C++)
│   │   │   ├── TerrainDeformation.cpp (modifie mesh à la volée)
│   │   │   ├── MudPhysics.cpp (friction = f(poids, surface, humidité))
│   │   │   └── EquipmentLogic.cpp
│   │   └── gdscript/
│   └── assets/
│       ├── models/ (GLTF, pas JPG IA)
│       ├── textures/ (PBR, satellite réel)
│       └── sounds/
├── cpp-standalone/ (fallback raylib)
│   ├── CMakeLists.txt
│   ├── src/main.cpp
│   ├── src/terrain/RealTerrain.cpp (fetch DEM)
│   └── src/equipment/
├── web-export/ (pour GitHub Pages, build Godot HTML5)
└── builds/
    └── GoldRushTycoon.exe (final)
```

### Systèmes clés :

**1. Terrain Réel Vierge :**
- Au lancement Mine 3D sans claim : UI "🔒 CONCESSION VERROUILLÉE - Va sur Carte US"
- Quand achat : `fetch_dem(lat,lng,zoom=14)` → parse SRTM → génère `HeightMap` 512x512
- Texture : `fetch_satellite(lat,lng)` via ArcGIS World Imagery (pas Google, licence OK) tile 15
- On inverse l'exploitation : si DEM montre déjà une fosse (données récentes), on la comble procéduralement pour simuler état vierge (before mining), avec forêt générée via Poisson disk sur zones non-minées
- Collision : HeightMap stocké en float array, `getHeight(x,z)` bilinéaire, utilisé pour FPS controller + véhicules (raycast sol)

**2. FPS + Équipements Maniables :**
- Godot `CharacterBody3D` + `Camera3D` + `CollisionShape3D` capsule
- Gravité 9.8, `is_on_floor()` check via heightmap
- Entrée véhicule : `E` quand distance < 4m + raycast véhicule. Quand entré : camera devient enfant du siège, `vehicle_controller.gd` prend input WASD + souris (souris = bras pelle)
- Sortie : `E` → téléport hors collision

**3. Placement Libre (Satisfactory-like) :**
- Mode Build : touche `B` → UI choix Hopper/Conveyor/Pond
- Fantôme semi-transparent suit souris + raycast sol, molette = rotation
- Clic gauche = place, vérif collision (pas chevaucher)
- Conveyor : tu places point A puis point B → génère tronçon avec bonne longueur, auto calcule inclinaison max 18° sinon rouge (impossible)
- Sauvegardé dans `mine_layout.json`

**4. Chaîne validée (ton point sur chaîne incompréhensible) :**
Schéma visuel dans UI, avec voyants :
```
[SOURCE EAU Rivière] --tuyau--> [POMPE 6"] --tuyau--> [BASSIN Décantation] --tuyau--> [LAVERIE Sluicifer] 
[GENERATOR 250kW] --câble--> [LAVERIE] + [TRÉMIE] + [CONVEYOR]
[PELLE CAT320] --godet--> [TRÉMIE] --[CONVEYOR]--> [LAVERIE] --sluice--> [OR Coffre] + [STERILE Pile]
```
Chaque maillon checké chaque seconde, si manque → icône rouge + message radio précis ("Pompe manquante : pas d'eau → laverie arrêtée")

---

## PAGE 13-16 : PIPELINE ART - Zéro IA, 100% Fidèle

**Règle d'or que tu as fixée** : Image 2D = Rendu 3D exact du modèle. Pas d'image générée.

Workflow pour CAT 320 :
1. Ref : 20 photos CAT 320F L du site CAT officiel + video Gold Rush S12E03 où Parker l'utilise
2. Blender : Modélise base track (patins + galets), tourelle, cabine avec vitres, bras 2 segments + vérins (cylindres), godet avec 5 dents
3. UV + PBR : Base color jaune CAT #FFCC00, metalness track 0.1, roughness 0.85, normal map boulons
4. Export GLTF + 4K texture
5. Import Godot, setup collision convex
6. Rendu icône : Screenshot orthographique in-engine fond transparent → utilisé dans UI Flotte. Donc image = modèle.

Même process pour :
- D6 LGP : Chenilles LGP larges 1m chaque, lame 4.2m, ripper arrière
- Hopper : Tôle acier 12mm, grizzly barre espacée 150mm
- Conveyor : Treillis Warren, rouleaux Ø108mm espacés 1.2m, bande caoutchouc noire
- Washplant : 
  - Big Red : On ne la vend pas, mais on la modélise fidèle pour musée : Deck rouge, châssis, 2x shaker decks superposés, 6 sluices en bas, hopper d'entrée
  - Sluicifer : Châssis noir, panneaux orange, Macon SD-600m deck 6x20 ft, 3 sluices larges
- Pump : Honda GX390 rouge + corps pompe bleu
- Pond : Excavation 20x30m, géomembrane non, juste terre, eau boueuse shader
- Generator : CAT C9 jaune, réservoir, radiateur

**Terrain textures** : Pas de couleur unie verte. On utilise Quixel Megascans : `Mud_Siberian`, `Forest_Ground_Leaves`, `Gravel_Riverbed`, blend via vertex paint selon pente.

---

## PAGE 17-20 : ACCOUNT, LANGUES, MESURES, ADMIN SÉCURISÉ

**Account simplifié (ta proposition finale)** :
- Fini code email SMTP. On fait comme Minecraft launcher :
- Form : Email + Password + Username (3 champs)
- Validation locale : email format, password >=8 avec maj/min/chiffre, username 3-16 alphanum
- Stockage : `users.json` local Godot `user://` (crypté XOR simple pour V4, pas bcrypt pour rester léger, mais en prod on mettrait bcrypt)
- Login : Email OU Username + Password
- Pourquoi pas de vérif email externe ? Tu as raison : si quelqu'un connaît email de quelqu'un, il pourrait spam. Donc on reste local, mais on note dans GDD que V5 aura vrai backend Firebase Auth avec email link.
- Avantage : multijoueur futur possible car on a déjà username.

**Langues / Mesures** :
- Détection auto `OS.get_locale()` → fr/en/es/de
- `Settings.tresor` : 
  - EU : €, m³, L, °C, g (or en g, prix €/g live *31.103)
  - US : $, yd³, gal, °F, oz (troy)
  - CA : C$, yd³, L, °C, oz
  - UK : £, m³, L, °C, g
- Conversion live via API `gold-api.com` pour cours or (pas fixe $1948)
- Traduction : Dico JSON, pas IA traduction à la volée.

**Admin sécurisé** :
- Code généré à création compte : 20 chars mix `aB3$gH9!kL2@qR5#zX8&7Qp`
- Algo : `CHARSET = A-Z + a-z + 0-9 + !@#$%^&*` + `random_secure`
- Stocké dans `user://admin_code.cfg` chiffré
- UI : Bouton cadenas dans Paramètres → entre code → déverrouille. Bouton devient "Désactiver admin" (toggle). Quand actif, money=♾️, diesel=♾️, power=♾️, mais avec possibilité de désactiver pour rejouer normal.
- Personne ne peut deviner car 20^76 combinaisons.

---

## PAGE 21-25 : GAMEPLAY LOOP FINAL - Juste milieu complet/pas compliqué

**Boucle que tu voulais complète mais pas chiante :**

1. **Début** : 125k$, pas de claim → Mine 3D affiche écran verrouillé "Achète concession"
2. **Carte US Leaflet réelle** : Tu vois vraiment USA/Canada, pins Dominion Creek, Scribner etc. Clique pin → fiche avec vraie photo satellite + bouton Acheter ($32k-$198k) / Louer ($4.8k-$26k saison) / Louer à tiers (si owned)
3. **Arrivée sur claim vierge** : Terrain réel DEM + forêt, rivière. Aucune fosse. Vrai sentiment "jamais exploité"
4. **Installation** : Tu places Bassin près rivière, Pompe, Trémie, Convoyeur vers futur emplacement laverie, Groupe, Laverie. Mode build avec fantôme.
5. **Recrutement ou manuel** : Si tu n'as pas d'opérateur, tu dois appuyer V → FPS → E dans pelle → conduire. Si tu recrutes, les NPC bossent en orbit mode.
6. **Saison 105 jours** : Météo dynamique : pluie → boue (mud 0.6), D6 LGP passe, CAT 320 patine. Neige précoce → fin saison.
7. **Vente or** : Marché adapté région, vrai cours live.

**Équilibre** : Pas besoin de 50 types de boulons. Juste : si tu oublies pompe → 0 or. Si tu oublies trémie → pelle bloquée. Suffisant pour réalisme sans devenir Factorio.

---

## PAGE 26-28 : PLAN DE PRODUCTION 60 MIN - Ton chrono 10min + 50min

**0-10min (PLAN - CE DOCUMENT)** :
- Page 1-5 : Post-mortem + recherche vraies laveries
- Page 6-12 : Choix moteur C++/Godot
- Page 13-20 : Art pipeline + systèmes
- Page 21-28 : Gameplay + timeline
- Page 29-30 : Risques + livrables

**10-20min (SETUP MOTEUR)** :
- Installer Godot 4.3 headless Linux (ou Raylib fallback)
- Créer projet, importer textures satellite Esri
- Créer script TerrainDeformation C++ (GDExtension)

**20-35min (COEUR 3D RÉALISTE)** :
- Modéliser 1 terrain Dominion Creek réel vierge (SRTM) + forêt
- Modéliser CAT 320 fidèle (pas cube) + D6 LGP + Sluicifer noir/orange fidèle + Hopper + Conveyor plaçable + Pond + Pump
- Implémenter FPS controller avec collision heightmap
- Implémenter placement libre conveyor (raycast + rotation)

**35-45min (GAMEPLAY)** :
- Système achat/location/lease + account email+pass simple + mesures/langues
- Chaîne validée avec voyants
- Recrutement ouvriers
- Admin code sécurisé toggle

**45-55min (POLISH & BUILD)** :
- UI verrouillée Mine 3D si pas de claim
- Fix fleet detail viewer (vrai 3D preview, pas écran noir)
- Build .exe (Godot export) + build web HTML5 pour GitHub Pages
- Push sur https://github.com/derhen-56/gold-rush-tycoon-ultimate

**55-60min (TEST & LIVRAISON)** :
- Test achat Dominion → Miner 3D → voir vrai terrain vierge → placer bassin/pompe → FPS marche → pelle conduit → or sort
- Vidéo capture + lien final

---

## PAGE 29-30 : RISQUES & ENGAGEMENT

**Risque 1 : Godot ne s'installe pas sans GPU** → Mitigation : Fallback Raylib C++ pur OpenGL, même gameplay, graphismes un peu moins AAA mais toujours bien au-dessus de cubes.

**Risque 2 : DEM réel API rate limit** → Mitigation : Cache local + fallback procédural amélioré avec texture satellite quand même.

**Risque 3 : Temps 60min trop court pour 8 modèles fidèles** → Mitigation : Priorité 1 : Terrain vierge + CAT 320 + Sluicifer + Conveyor plaçable + Hopper. Le reste (Rock Truck, Generator) en low-poly mais reconnaissable. On ne fait pas 17 machines, on fait 6 parfaites.

**Engagement** : Je ne génère plus d'images IA. Chaque visuel = rendu du modèle 3D. Chaque modèle = basé sur blueprint réel CAT / Macon. Chaque terrain = DEM réel. Plus de trommel rouge générique pour Big Red. Big Red sera retirée de la vente et mise en musée Legacy, ou modélisée fidèle shaker rouge si on la garde.

**Validation** : Ce plan doit être approuvé par toi avant que je recode. Si tu dis "go", je lance chrono 50min et je ne m'arrête qu'à .exe jouable.

---

## FIN PLAN - Attente validation

Dis "VALIDE" ou corrige ce plan. Je ne touche plus au code tant que tu n'as pas dit oui.


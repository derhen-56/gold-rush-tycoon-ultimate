# GOLD RUSH TYCOON ULTIMATE - 3D
Version ultra-réaliste 3D pour ordinateur (Windows/Mac/Linux) + PWA.

## 🚀 Ce que c'est
- **Moteur 3D Three.js** avec terrain déformable, shadows, trommel qui tourne, excavatrice avec bras animé, camions qui roulent, boue SnowRunner physique
- **18 concessions réelles** : Yukon, Alaska, BC, Montana, Colorado, California, Dakota, Ontario, Quebec
- **Système économique complet** :
  - **ACHAT** définitif ($32k-$340k)
  - **LOCATION** saisonnière (tu payes 105j, moins cher, comme Cities Skylines)
  - **BAILLEUR** : tu achètes une concession et tu la loues à un NPC (Parker Inc.) qui te reverse $/jour + 14-22% royalty en or — revenu passif style Tony Beets empire
  - Location d'équipement aussi (CAT 320F $3800/saison)
- **Flotte 3D 17 machines** : CAT 320/336/374 MONSTER, D6/D10 Dozer, 50/100/150 Big Red/250 Monster Red, pompes, gen, rock trucks
- **Physique boue** : mudFactor 0.25-0.65 selon météo (Soleil, Pluie, Bourbier SnowRunner). Affecte prod, fuel, usure, traction par poids machine
- **Desktop App Electron** : `npm run desktop` ou `npm run build:desktop` pour créer .exe / .dmg / AppImage

## 🖥️ Installation locale (App Bureau)
```bash
npm install
npm run desktop    # lance app desktop
npm run build:desktop  # build installateurs dans dist_electron/
npm run dev        # lance version web http://localhost:3000
```

## 🌐 Hébergement gratuit (0 action de toi)
Ce dossier est prêt pour GitHub Pages :
```bash
git init
git remote add origin https://github.com/TONUSER/gold-rush-tycoon-ultimate.git
git add .
git commit -m "Ultimate 3D"
git push -u origin main
npm run build:web
npm run deploy   # pousse dist/ vers branche gh-pages automatiquement
```
Ensuite active GitHub Pages dans Settings > Pages > branche gh-pages.

Alternative **Vercel/Netlify** : drag & drop le dossier `dist/` (après build) — gratuit, HTTPS, domaine.

## 🎮 Comment jouer 3D
1. CARTE > choisis concession : Acheter définitif ou Louer
2. FLOTTE > achète ou loue une pelleteuse + dozer + laverie + pompe + groupe
3. Déploie en 3D (bouton DEPLOY) — tu vois la machine apparaître dans le pit 3D avec ombres
4. Vitesse x1/x3/x10/x30, DISPATCH camion pour bonus
5. Gère diesel, power (kW), météo, pannes
6. MARCHÉ > vend ton or, emprunte
7. PORTEFEUILLE > deviens bailleur : tu loues tes claims à des tiers

## 🔧 Modèles 3D
Pas de GLTF pour rester léger — modèles procéduraux PBR générés en code (performant, customisable). Tu peux remplacer par vrais modèles CAT (.glb) dans `public/models/`.

## 📜 Licence MIT — Fais-en ce que tu veux, monte ton empire.


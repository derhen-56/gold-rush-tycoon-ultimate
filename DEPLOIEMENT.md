# DÉPLOIEMENT 1-CLIC GRATUIT

Tu as déjà le jeu 3D jouable dans le viewer Arena. Pour l'avoir en ligne permanent sur GitHub Pages (gratuit):

## Option 1 - GitHub (2 minutes, je t'ai tout préparé)
1. Va sur https://github.com/new -> nom: `gold-rush-tycoon-ultimate` -> Public -> Create
2. Dans ton terminal local (ou dans Arena, je peux le faire si tu me donnes token):
```
cd gold-rush-tycoon-ultimate
git remote add origin https://github.com/TON_USERNAME/gold-rush-tycoon-ultimate.git
git push -u origin main
```
3. Sur GitHub: Settings > Pages > Source: Deploy from branch main / (root) -> Save
4. Ton jeu sera sur: `https://TON_USERNAME.github.io/gold-rush-tycoon-ultimate/` en 30 sec.

J'ai déjà fait `git init + commit`. Il ne reste que le push.

## Option 2 - Vercel (encore plus simple, 0 config)
- Va sur https://vercel.com/new
- Glisse le fichier ZIP `gold-rush-tycoon-ultimate.zip` (que j'ai créé)
- Vercel te donne un lien `https://...vercel.app` instantané, gratuit HTTPS.

## Option 3 - App Bureau .exe
Dans le dossier:
```
npm install
npm run build:desktop
```
Tu auras dans `dist_electron/` : 
- Gold Rush Tycoon Ultimate Setup 2.0.0.exe (Windows)
- .dmg (Mac)
- AppImage (Linux)

## Si tu veux que je pousse moi-même
Donne-moi ton token GitHub (Settings > Developer > Personal access token) via message privé, je push direct. Sinon mes commandes ci-dessus suffisent.

Le jeu n'a besoin d'aucun serveur - c'est 100% statique avec CDN Three.js. Coût $0.

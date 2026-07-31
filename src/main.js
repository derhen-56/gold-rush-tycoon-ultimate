import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ====== DATA ULTIMATE ======
const CLAIMS_ULTIMATE = [
  { id:'scribner', name:'Scribner Creek', region:'Klondike, Yukon', country:'CA', price:32000, rent:4800, leaseIncome:2200, royalty:0.15, goldMin:650, goldMax:1100, richness:0.72, size:20, overburden:3.2, difficulty:1, type:'creek', lat:63.9, lng:-139.2, water:true, desc:'Parfait débutant, ancien Parker.', color:'#7cb342' },
  { id:'paradise', name:'Paradise Hill', region:'Klondike Bench', country:'CA', price:95000, rent:12500, leaseIncome:5800, royalty:0.18, goldMin:1800, goldMax:2600, richness:1.15, size:26, overburden:5.5, difficulty:2, type:'hill', lat:63.95, lng:-139.0, water:false, desc:'Hill pay nécessitant stripping massif.', color:'#ffb300' },
  { id:'dominion', name:'Dominion Creek', region:'Yukon', country:'CA', price:178000, rent:22000, leaseIncome:9500, royalty:0.20, goldMin:3500, goldMax:5200, richness:1.6, size:30, overburden:4.8, difficulty:3, type:'bench', lat:63.7, lng:-138.7, water:true, desc:'Bench riche mais permafrost.', color:'#4fc3f7' },
  { id:'indian', name:'Indian River', region:'Yukon River', country:'CA', price:145000, rent:18000, leaseIncome:7200, royalty:0.16, goldMin:3000, goldMax:4800, richness:1.45, size:28, overburden:3.0, difficulty:3, type:'river', lat:63.5, lng:-139.8, water:true, desc:'Marécageux type SnowRunner.', color:'#29b6f6' },
  { id:'atlin', name:'Atlin - Surprise Lake', region:'BC, Canada', country:'CA', price:68000, rent:8900, leaseIncome:3800, royalty:0.15, goldMin:1200, goldMax:2000, richness:0.95, size:22, overburden:2.8, difficulty:2, type:'lake', lat:59.57, lng:-133.7, water:true, desc:'BC Gold Rush historique.', color:'#81c784' },
  { id:'barkerville', name:'Barkerville', region:'Cariboo, BC', country:'CA', price:88000, rent:11500, leaseIncome:5100, royalty:0.17, goldMin:1600, goldMax:2700, richness:1.05, size:24, overburden:4.1, difficulty:2, type:'creek', lat:53.06, lng:-121.51, water:true, desc:'1870s gold rush town.', color:'#aed581' },
  { id:'eureka', name:'Eureka Creek', region:'Alaska', country:'US', price:52000, rent:7000, leaseIncome:3100, royalty:0.14, goldMin:900, goldMax:1600, richness:0.88, size:18, overburden:3.6, difficulty:2, type:'creek', lat:63.82, lng:-150.3, water:true, desc:'Alaska Range, saison courte.', color:'#ce93d8' },
  { id:'nome', name:'Nome Beach', region:'Alaska - Bering Sea', country:'US', price:41000, rent:5600, leaseIncome:2800, royalty:0.22, goldMin:750, goldMax:1400, richness:0.65, size:32, overburden:1.5, difficulty:2, type:'beach', lat:64.5, lng:-165.4, water:true, desc:'Or noir des plages. Tempêtes.', color:'#90a4ae' },
  { id:'porcupine', name:'Porcupine Creek', region:'Colorado, USA', country:'US', price:73000, rent:9600, leaseIncome:4200, royalty:0.15, goldMin:1300, goldMax:2300, richness:0.92, size:20, overburden:3.3, difficulty:2, type:'mountain', lat:39.5, lng:-106.1, water:false, desc:'High altitude Rockies.', color:'#ff8a65' },
  { id:'alder', name:'Alder Gulch', region:'Montana, USA', country:'US', price:155000, rent:19500, leaseIncome:8500, royalty:0.19, goldMin:2800, goldMax:4500, richness:1.35, size:26, overburden:4.0, difficulty:3, type:'gulch', lat:45.3, lng:-112.0, water:true, desc:'Virginia City - 30M$ historique.', color:'#ffb74d' },
  { id:'deadwood', name:'Deadwood', region:'South Dakota, USA', country:'US', price:112000, rent:14200, leaseIncome:6200, royalty:0.16, goldMin:2000, goldMax:3400, richness:1.1, size:24, overburden:5.0, difficulty:3, type:'hill', lat:44.37, lng:-103.73, water:false, desc:'Black Hills, terrain dur.', color:'#a1887f' },
  { id:'sierra', name:'Sierra Nevada - Yuba', region:'California, USA', country:'US', price:198000, rent:26000, leaseIncome:11200, royalty:0.21, goldMin:4200, goldMax:6800, richness:1.7, size:30, overburden:2.5, difficulty:4, type:'river', lat:39.3, lng:-121.0, water:true, desc:'California Gold Rush, ultra riche alluvionnaire.', color:'#ffd54f' },
  { id:'porcupine_ca', name:'Porcupine Gold Belt', region:'Ontario, Canada', country:'CA', price:125000, rent:16000, leaseIncome:7000, royalty:0.18, goldMin:2200, goldMax:3800, richness:1.25, size:28, overburden:6.2, difficulty:4, type:'hardrock', lat:48.47, lng:-81.33, water:false, desc:'Hard rock, besoin de dynamitage.', color:'#78909c' },
  { id:'red_lake', name:'Red Lake', region:'Ontario, Canada', country:'CA', price:142000, rent:18500, leaseIncome:7800, royalty:0.19, goldMin:2600, goldMax:4300, richness:1.4, size:26, overburden:4.5, difficulty:3, type:'lake', lat:51.01, lng:-93.83, water:true, desc:'High grade Canada.', color:'#4db6ac' },
  { id:'detour', name:'Detour Lake', region:'Quebec/Ontario', country:'CA', price:165000, rent:21000, leaseIncome:9000, royalty:0.20, goldMin:3200, goldMax:5100, richness:1.55, size:32, overburden:5.8, difficulty:4, type:'openpit', lat:49.9, lng:-79.7, water:false, desc:'Open pit moderne, besoin gros fleet.', color:'#ffb300' },
  { id:'klondyke_goldbottom', name:'Gold Bottom Creek', region:'Yukon', country:'CA', price:89000, rent:11800, leaseIncome:5300, royalty:0.16, goldMin:1500, goldMax:2500, richness:1.0, size:22, overburden:3.9, difficulty:2, type:'creek', lat:63.88, lng:-138.9, water:true, desc:'Tributaire Dominion, bon ROI.', color:'#dce775' },
  { id:'fortymile', name:'Fortymile River', region:'Alaska/Yukon Border', country:'US', price:67000, rent:8800, leaseIncome:3900, royalty:0.15, goldMin:1100, goldMax:1900, richness:0.90, size:20, overburden:2.2, difficulty:2, type:'river', lat:64.2, lng:-141.0, water:true, desc:'Frontière, isolé, transport cher.', color:'#4fc3f7' },
  { id:'tulameen', name:'Tulameen River', region:'BC, Canada', country:'CA', price:54000, rent:7200, leaseIncome:3300, royalty:0.14, goldMin:950, goldMax:1700, richness:0.87, size:18, overburden:2.9, difficulty:1, type:'river', lat:49.54, lng:-120.76, water:true, desc:'Platine + or, très beau.', color:'#aed581' },
];

const EQUIP_ULTIMATE = [
  { id:'excav_320_u', name:'CAT 320F Used', cat:'excavator', buy:32000, rent:3800, prod:11, fuel:6, power:0, weight:22, mud:0.7, health:65, icon:'🚜' },
  { id:'excav_320', name:'CAT 320F New', cat:'excavator', buy:74000, rent:7200, prod:16, fuel:8, power:0, weight:22, mud:0.72, health:100, icon:'🚜' },
  { id:'excav_336', name:'CAT 336 Next Gen', cat:'excavator', buy:145000, rent:13500, prod:28, fuel:14, power:0, weight:36, mud:0.65, health:100, icon:'🏗️' },
  { id:'excav_374', name:'CAT 374F MONSTER', cat:'excavator', buy:285000, rent:26000, prod:52, fuel:28, power:0, weight:75, mud:0.55, health:100, icon:'🦖' },
  { id:'dozer_d6_u', name:'D6 LGP Used', cat:'dozer', buy:38000, rent:4200, prod:35, fuel:10, power:0, weight:18, mud:0.85, health:70, icon:'🚚' },
  { id:'dozer_d6', name:'CAT D6 XE', cat:'dozer', buy:72000, rent:7400, prod:55, fuel:15, power:0, weight:23, mud:0.9, health:100, icon:'🚚' },
  { id:'dozer_d10', name:'CAT D10T2 Dozer', cat:'dozer', buy:185000, rent:17800, prod:110, fuel:32, power:0, weight:70, mud:0.92, health:100, icon:'🚜' },
  { id:'wash_50', name:'Shaker Deck 50 TPH', cat:'washplant', buy:48000, rent:5500, prod:50, fuel:18, power:25, weight:8, mud:0.5, health:80, icon:'🌀' },
  { id:'wash_100', name:'Trommel 100 TPH', cat:'washplant', buy:115000, rent:12000, prod:100, fuel:32, power:60, weight:18, mud:0.5, health:95, icon:'🌀' },
  { id:'wash_150', name:'BIG RED 150 TPH', cat:'washplant', buy:195000, rent:18500, prod:155, fuel:55, power:110, weight:35, mud:0.5, health:100, icon:'🔥' },
  { id:'wash_250', name:'MONSTER RED 250 TPH', cat:'washplant', buy:340000, rent:32000, prod:250, fuel:85, power:200, weight:60, mud:0.5, health:100, icon:'🌋' },
  { id:'pump_6', name:'Pump 6" Honda', cat:'pump', buy:8500, rent:1100, prod:0, fuel:4, power:0, weight:0.5, mud:0.9, health:85, icon:'💧' },
  { id:'pump_10', name:'Pump 10" High Vol', cat:'pump', buy:18500, rent:2200, prod:0, fuel:9, power:0, weight:1.2, mud:0.9, health:95, icon:'🌊' },
  { id:'gen_100', name:'GenSet 100kW', cat:'generator', buy:12000, rent:1500, prod:0, fuel:8, power:-100, weight:1, mud:0.8, health:90, icon:'⚡' },
  { id:'gen_250', name:'CAT 250kW', cat:'generator', buy:29000, rent:3200, prod:0, fuel:18, power:-250, weight:3, mud:0.8, health:100, icon:'⚡' },
  { id:'truck_25', name:'Rock Truck 25T', cat:'truck', buy:26000, rent:3100, prod:12, fuel:7, power:0, weight:25, mud:0.68, health:80, icon:'🚛' },
  { id:'truck_40', name:'CAT 745 40T', cat:'truck', buy:78000, rent:7800, prod:28, fuel:16, power:0, weight:38, mud:0.75, health:95, icon:'🚛' },
];

// ====== THREEJS SETUP ======
let scene, camera, renderer, controls;
let terrainMesh, waterMesh, fleetGroup, particleSystem;
let sunLight, ambientLight;
let clock = new THREE.Clock();
const loadTxt = document.getElementById('loadTxt');
const loadBar = document.getElementById('loadBar');

function updateLoader(p, txt){
  loadBar.style.width = p+'%';
  loadTxt.textContent = txt;
}

async function init3D(){
  updateLoader(10,'Init Three.js...');
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d1210, 0.012);
  scene.background = new THREE.Color(0x0e1411);

  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 2000);
  camera.position.set(55, 38, 55);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d'), antialias:true, powerPreference:'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.1;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping=true;
  controls.dampingFactor=0.08;
  controls.maxPolarAngle=Math.PI/2.05;
  controls.minDistance=6;
  controls.maxDistance=220;

  updateLoader(25,'Lumières + Sky...');
  sunLight = new THREE.DirectionalLight(0xfff7e0, 2.2);
  sunLight.position.set(80,120,60);
  sunLight.castShadow=true;
  sunLight.shadow.mapSize.set(2048,2048);
  sunLight.shadow.camera.left=-120; sunLight.shadow.camera.right=120;
  sunLight.shadow.camera.top=120; sunLight.shadow.camera.bottom=-120;
  sunLight.shadow.camera.near=1; sunLight.shadow.camera.far=400;
  scene.add(sunLight);
  ambientLight = new THREE.AmbientLight(0x9bb6a8, 0.45);
  scene.add(ambientLight);
  const hemi = new THREE.HemisphereLight(0x9dc9b5, 0x271e14, 0.6);
  scene.add(hemi);

  // sky gradient via large sphere
  const skyGeo = new THREE.SphereGeometry(1200,32,32);
  const skyMat = new THREE.ShaderMaterial({
    side:THREE.BackSide,
    vertexShader:`varying vec3 vWorldPosition; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vWorldPosition=wp.xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader:`varying vec3 vWorldPosition; void main(){ float h=normalize(vWorldPosition).y; float t=clamp((h+0.25)/0.8,0.,1.); vec3 top=vec3(0.53,0.8,0.92); vec3 mid=vec3(0.25,0.36,0.45); vec3 bot=vec3(0.09,0.13,0.10); vec3 col=mix(bot,mid,smoothstep(0.,0.45,t)); col=mix(col,top,smoothstep(0.45,1.,t)); gl_FragColor=vec4(col,1.0); }`
  });
  scene.add(new THREE.Mesh(skyGeo, skyMat));

  updateLoader(45,'Génération terrain réaliste...');
  createTerrain();
  createWater();
  fleetGroup = new THREE.Group();
  scene.add(fleetGroup);

  createAtmosphereParticles();

  window.addEventListener('resize', ()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  updateLoader(100,'Prêt!');
  setTimeout(()=>{ document.getElementById('loading').classList.add('hidden'); }, 600);
  animate();
}

function createTerrain(){
  const size=140;
  const segs=120;
  const geo=new THREE.PlaneGeometry(size,size,segs,segs);
  // noise displacement
  const pos=geo.attributes.position;
  const colors=[];
  const col=new THREE.Color();
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i), y=pos.getY(i);
    // multilayer noise pseudo
    const n1=Math.sin(x*0.07)*Math.cos(y*0.07)*3.2;
    const n2=Math.sin(x*0.015)*Math.cos(y*0.02)*6.0;
    const pit= -Math.max(0, 18 - Math.sqrt(x*x+y*y)*0.45) * 1.1; // central pit
    const bench= (Math.floor((x+size/2)/12)%2===0?0.4:0);
    const h=n1+n2+pit+bench;
    pos.setZ(i,h);
    // color based on height + gold hint
    if(h<-6){ col.setHex(0x3d2b1f); } 
    else if(h<-2){ col.setHex(0x5d4037); }
    else if(h<1){ col.setHex(0x6d4c41); }
    else { col.setHSL(0.22+Math.random()*0.08, 0.28, 0.32+Math.random()*0.1); }
    colors.push(col.r,col.g,col.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
  geo.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.92, metalness:0.05 });
  terrainMesh=new THREE.Mesh(geo, mat);
  terrainMesh.rotation.x=-Math.PI/2;
  terrainMesh.receiveShadow=true;
  scene.add(terrainMesh);

  // add gold veins visual as small emissive spots
  for(let i=0;i<140;i++){
    const x=(Math.random()-0.5)*90;
    const z=(Math.random()-0.5)*90;
    if(Math.sqrt(x*x+z*z)>45) continue;
    const h=getTerrainHeight(x,z)+0.05+Math.random()*0.6;
    const g=new THREE.SphereGeometry(0.12+Math.random()*0.25,6,6);
    const m=new THREE.MeshStandardMaterial({ color:0xffd54f, emissive:0xff8f00, emissiveIntensity:0.2+Math.random()*0.5, roughness:0.3, metalness:0.8 });
    const mesh=new THREE.Mesh(g,m);
    mesh.position.set(x,h,z);
    mesh.scale.set(1,0.5,1);
    scene.add(mesh);
  }
}
function getTerrainHeight(x,z){
  if(!terrainMesh) return 0;
  // crude: sample near central pit formula for game logic, not exact geo sampling
  const dist=Math.sqrt(x*x+z*z);
  const pit= -Math.max(0, 18 - dist*0.45) * 1.1;
  return pit + Math.sin(x*0.07)*Math.cos(z*0.07)*1.0;
}
function createWater(){
  const geo=new THREE.PlaneGeometry(55,32,1,1);
  const mat=new THREE.MeshStandardMaterial({ color:0x1e5a73, transparent:true, opacity:0.72, roughness:0.15, metalness:0.4, envMapIntensity:1.2 });
  waterMesh=new THREE.Mesh(geo, mat);
  waterMesh.rotation.x=-Math.PI/2;
  waterMesh.position.set(45, -0.6, -35);
  waterMesh.receiveShadow=true;
  scene.add(waterMesh);
}
function createAtmosphereParticles(){
  const count=700;
  const geo=new THREE.BufferGeometry();
  const pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){ pos[i*3]=(Math.random()-0.5)*180; pos[i*3+1]=5+Math.random()*60; pos[i*3+2]=(Math.random()-0.5)*180; }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const mat=new THREE.PointsMaterial({ size:0.25, color:0xffffff, transparent:true, opacity:0.18 });
  particleSystem=new THREE.Points(geo, mat);
  scene.add(particleSystem);
}

// ====== EQUIP 3D MODELS ======
function createExcavatorModel(scale=1, used=false){
  const g=new THREE.Group();
  const baseMat=new THREE.MeshStandardMaterial({ color: used?0x9a9a3a:0xffcc00, roughness:0.6, metalness:0.2 });
  const trackMat=new THREE.MeshStandardMaterial({ color:0x2a2a2a, roughness:0.9 });
  const metalMat=new THREE.MeshStandardMaterial({ color:0x44403c, roughness:0.55, metalness:0.6 });
  // tracks
  const trackGeo=new THREE.BoxGeometry(1.2*scale,0.5*scale,3.2*scale);
  const left=new THREE.Mesh(trackGeo, trackMat); left.position.set(-1.1*scale,0.25*scale,0); left.castShadow=true;
  const right=left.clone(); right.position.x=1.1*scale;
  g.add(left,right);
  // base
  const base=new THREE.Mesh(new THREE.BoxGeometry(2.6*scale,0.6*scale,2.4*scale), baseMat); base.position.y=0.8*scale; base.castShadow=true; g.add(base);
  // cab
  const cab=new THREE.Mesh(new THREE.BoxGeometry(1.1*scale,1.0*scale,1.0*scale), new THREE.MeshStandardMaterial({color:0x111827})); cab.position.set(0.4*scale,1.6*scale,0.2*scale); g.add(cab);
  // arm1
  const arm1Group=new THREE.Group(); arm1Group.position.set(-0.9*scale,1.2*scale,0);
  const arm1=new THREE.Mesh(new THREE.BoxGeometry(0.35*scale,2.4*scale,0.35*scale), metalMat); arm1.position.y=1.2*scale; arm1.castShadow=true; arm1Group.add(arm1);
  // arm2
  const arm2Group=new THREE.Group(); arm2Group.position.set(0,2.4*scale,0);
  const arm2=new THREE.Mesh(new THREE.BoxGeometry(0.28*scale,2.0*scale,0.28*scale), metalMat); arm2.position.y=0.9*scale; arm2.castShadow=true; arm2Group.add(arm2);
  const bucket=new THREE.Mesh(new THREE.BoxGeometry(0.9*scale,0.6*scale,0.7*scale), new THREE.MeshStandardMaterial({color:0x3f3f46})); bucket.position.y=2.0*scale; bucket.castShadow=true; arm2Group.add(bucket);
  arm1Group.add(arm2Group);
  g.add(arm1Group);
  g.userData={arm1Group,arm2Group,bucket,animPhase:0};
  return g;
}
function createDozerModel(scale=1, used=false){
  const g=new THREE.Group();
  const col=used?0x8d6e63:0xff6f00;
  const mat=new THREE.MeshStandardMaterial({color:col, roughness:0.65});
  const track=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.55,2.8), new THREE.MeshStandardMaterial({color:0x222})); track.position.set(-0.9,0.28,0); track.castShadow=true;
  const track2=track.clone(); track2.position.x=0.9; g.add(track,track2);
  const body=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.9,1.8), mat); body.position.y=0.95; body.castShadow=true; g.add(body);
  const blade=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.0,0.25), new THREE.MeshStandardMaterial({color:0x44403c, metalness:0.6})); blade.position.set(0,0.4,1.6); blade.castShadow=true; g.add(blade);
  g.userData={blade};
  return g;
}
function createWashplantModel(typeId){
  const g=new THREE.Group();
  const isBig=typeId.includes('150')||typeId.includes('250');
  const size=isBig?1.6:1.0;
  // frame
  const frame=new THREE.Mesh(new THREE.BoxGeometry(4*size,0.5*size,2*size), new THREE.MeshStandardMaterial({color:0xb91c1c})); frame.position.y=0.25*size; frame.castShadow=true; g.add(frame);
  // trommel
  const tromGeo=new THREE.CylinderGeometry(0.7*size,0.7*size,3.6*size,18,1,true);
  const tromMat=new THREE.MeshStandardMaterial({color: isBig?0xef4444:0xf59e0b, roughness:0.5, metalness:0.4, side:THREE.DoubleSide});
  const trom=new THREE.Mesh(tromGeo, tromMat); trom.rotation.z=Math.PI/2; trom.position.set(0,1.6*size,0); trom.castShadow=true; g.add(trom);
  // conveyor
  const conv=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.15,5*size), new THREE.MeshStandardMaterial({color:0x222})); conv.position.set(0,0.9*size,2.6*size); conv.rotation.x=0.25; g.add(conv);
  g.userData={trom, spin:0};
  return g;
}
function createTruckModel(){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.0,3.0), new THREE.MeshStandardMaterial({color:0xfacc15})); body.position.y=1.0; body.castShadow=true; g.add(body);
  const cab=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.9,1.0), new THREE.MeshStandardMaterial({color:0x1f2937})); cab.position.set(0,1.2,-1.0); g.add(cab);
  const wheels=[]; for(let x of [-1.0,1.0]) for(let z of [-1.1,0.2,1.1]){ const w=new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.38,0.4,12), new THREE.MeshStandardMaterial({color:0x111})); w.rotation.z=Math.PI/2; w.position.set(x,0.38,z); g.add(w); wheels.push(w); }
  g.userData={wheels, moveT:0};
  return g;
}

// ====== ULTIMATE GAME STATE ======
let state={
  companyName:'YUKON GOLD ULTIMATE',
  money:125000,
  gold:0,
  goldInWash:0,
  paydirt:0,
  diesel:3200,
  dieselCap:6000,
  day:1,
  year:1,
  hour:6,
  seasonDay:1,
  seasonLen:105,
  goldPrice:1948,
  weather:'Soleil',
  temp:14,
  ownedClaims:[],
  rentedClaims:[], // {id, untilDay}
  leasedOut:[], // claims leased to NPC
  fleet:[],
  activeClaimId:null,
  claimData:{},
  dailyGold:0,
  totalGold:0,
  totalPay:0,
  loan:0,
  speed:1,
  mudFactor:0.25,
};

function fmtMoney(n){ return (n<0?'-':'')+'$'+Math.abs(Math.round(n)).toLocaleString('fr-FR'); }
function fmtOz(n){ return n.toFixed(2)+' oz'; }
function log(msg,type='info'){
  const el=document.getElementById('gameLog');
  if(!el) return;
  const d=document.createElement('div');
  d.className='entry '+type;
  const time=String(state.hour).padStart(2,'0')+':'+String(Math.floor((state.hour%1)*60)).padStart(2,'0');
  d.innerHTML='<span style="color:#666">['+time+']</span> '+msg;
  el.prepend(d);
  if(el.children.length>80) el.lastChild.remove();
}

function getClaim(id){ return CLAIMS_ULTIMATE.find(c=>c.id===id); }
function getClaimData(id){
  if(!state.claimData[id]){
    const c=getClaim(id);
    const size=c.size;
    const grid=[];
    for(let y=0;y<size;y++){
      const row=[];
      for(let x=0;x<size;x++){
        const goldBase=(Math.random()*0.9+0.3)*c.richness*(Math.random()<0.18?1.8:1);
        row.push({ overburden:1.5+Math.random()*c.overburden, pay:38+Math.random()*32, gold:goldBase, cleared:false, mined:false });
      }
      grid.push(row);
    }
    state.claimData[id]={grid, cellsCleared:0, cellsMined:0};
  }
  return state.claimData[id];
}
function calcPower(claimId){
  let bal=0;
  state.fleet.filter(f=>f.claimId===claimId && f.deployed && !f.broken).forEach(f=>{
    const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId);
    if(t.cat==='generator') bal+= -t.power;
    else if(t.power) bal-=t.power;
  });
  return bal;
}
function calcFuelPerDay(){
  let perH=0;
  state.fleet.filter(f=>f.deployed && !f.broken).forEach(f=>{ perH+=EQUIP_ULTIMATE.find(x=>x.id===f.typeId).fuel; });
  return perH*12;
}

// ====== 3D FLEET SPAWNER ======
const meshByFleetUid=new Map();
function spawnFleetMesh(f){
  const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId);
  let mesh;
  if(t.cat==='excavator') mesh=createExcavatorModel(0.9+Math.random()*0.1, t.buy<50000);
  else if(t.cat==='dozer') mesh=createDozerModel(1, t.buy<50000);
  else if(t.cat==='washplant') mesh=createWashplantModel(f.typeId);
  else if(t.cat==='truck') mesh=createTruckModel();
  else {
    mesh=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.8,0.8), new THREE.MeshStandardMaterial({color:0x666}));
  }
  // position in mine pit spread
  const angle=Math.random()*Math.PI*2;
  const rad=5+Math.random()*22;
  mesh.position.set(Math.cos(angle)*rad, getTerrainHeight(Math.cos(angle)*rad, Math.sin(angle)*rad)+0.5, Math.sin(angle)*rad);
  mesh.rotation.y=Math.random()*Math.PI*2;
  fleetGroup.add(mesh);
  meshByFleetUid.set(f.uid, mesh);
  return mesh;
}
function removeFleetMesh(uid){
  const m=meshByFleetUid.get(uid);
  if(m){ fleetGroup.remove(m); meshByFleetUid.delete(uid); }
}

// ====== UI VIEWS ======
let currentView='mine';
function setupUI(){
  document.querySelectorAll('.navb').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.navb').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      switchView(b.dataset.view);
    });
  });
  document.querySelectorAll('.speed').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.speed').forEach(x=>{x.classList.remove('btn-gold'); x.classList.add('btn-dark');});
      b.classList.remove('btn-dark'); b.classList.add('btn-gold');
      state.speed=parseInt(b.dataset.speed);
    });
  });
  document.getElementById('endDayBtn').addEventListener('click', ()=>endDay(false));
  document.getElementById('fuelBtn').addEventListener('click', ()=>buyFuel(1500));
  document.getElementById('dispatchTruckBtn').addEventListener('click', dispatchTruck);
  document.getElementById('saveBtn').addEventListener('click', saveGame);
  document.getElementById('photoBtn').addEventListener('click', ()=>{ controls.enabled=!controls.enabled; log(controls.enabled?'Mode photo OFF':'Mode photo ON - WASD + souris', 'info'); });
  document.getElementById('cheat').addEventListener('keydown', e=>{ if(e.key==='Enter'){ handleCheat(e.target.value); e.target.value=''; } });
  // initial
  renderMapPins();
  renderClaimsGrid();
  renderPortfolio();
  renderHUD();
}

function switchView(v){
  currentView=v;
  document.getElementById('mapView').classList.toggle('hidden', v!=='map');
  document.getElementById('claimsView').classList.toggle('hidden', v!=='claims');
  // mine is 3D background, so hide overlay, keep canvas visible
  if(v==='mine'){
    document.getElementById('viewOverlay').innerHTML='';
    log('Retour chantier 3D — caméras drones activées', 'info');
  } else if(v==='fleet'){
    renderFleetMarket(document.getElementById('viewOverlay'));
  } else if(v==='market'){
    renderMarket(document.getElementById('viewOverlay'));
  } else if(v==='finance'){
    renderFinance(document.getElementById('viewOverlay'));
  } else if(v!=='map' && v!=='claims'){
    document.getElementById('viewOverlay').innerHTML=`<div class="card" style="margin:20px;background:rgba(0,0,0,0.85)">Vue ${v} en construction 3D</div>`;
  }
  renderHUD();
}

function renderMapPins(){
  const container=document.getElementById('mapPinsDom');
  const svgPins=document.getElementById('pins');
  container.innerHTML='';
  svgPins.innerHTML='';
  // place claims by lat lng approx mapped to x,y
  CLAIMS_ULTIMATE.forEach(c=>{
    // map lat lng to position
    const x = ((c.lng + 170) / 100) * 780; // rough
    const y = ((70 - c.lat) / 35) * 620;
    const pin=document.createElement('div');
    pin.className='concession-pin';
    pin.style.left=x+'px'; pin.style.top=y+'px';
    pin.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center"><div class="dot" style="background:${c.color}"></div><div style="background:#000;color:#fff;font-size:8px;padding:2px 5px;border-radius:999px;margin-top:2px;border:1px solid #333;white-space:nowrap">${c.name}</div></div>`;
    pin.addEventListener('click',()=>showClaimDetail(c.id));
    container.appendChild(pin);
    const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',x); circle.setAttribute('cy',y); circle.setAttribute('r', state.ownedClaims.includes(c.id)?12:6);
    circle.setAttribute('fill', state.ownedClaims.includes(c.id)?'#ffb300':'#222');
    circle.setAttribute('stroke', c.color); circle.setAttribute('stroke-width','1.5');
    svgPins.appendChild(circle);
  });
}

function showClaimDetail(id){
  const c=getClaim(id);
  const owned=state.ownedClaims.includes(id);
  const rented=state.rentedClaims.find(r=>r.id===id);
  const leased=state.leasedOut.find(l=>l.id===id);
  const panel=document.getElementById('claimDetailPanel');
  const feeDaily=c.rent/30;
  panel.innerHTML=`
    <div style="display:flex;gap:12px">
      <div style="width:56px;height:56px;border-radius:14px;background:${c.color};display:flex;align-items:center;justify-content:center;font-size:28px">⛏️</div>
      <div><div class="font-anton" style="font-size:22px;line-height:1">${c.name}</div><div style="font-size:11px;color:#aaa;font-family:JetBrains Mono">${c.region} • ${c.country} • Type ${c.type} • Diff ${'★'.repeat(c.difficulty)}</div><div style="font-size:10px;color:#888;margin-top:2px">${c.lat.toFixed(2)}N ${c.lng.toFixed(2)}W • Overburden ${c.overburden}m • Water ${c.water?'Oui':'Non'}</div></div>
    </div>
    <div style="margin-top:12px;font-size:12px;color:#bbb;line-height:1.5">${c.desc}</div>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-family:JetBrains Mono;font-size:11px">
      <div style="background:#000;border:1px solid #222;border-radius:10px;padding:8px"><div style="color:#777;font-size:9px">ESTIMATION OR</div><div style="color:#ffb300;font-weight:700">${c.goldMin}-${c.goldMax} oz</div><div style="color:#666">${c.richness}x richesse</div></div>
      <div style="background:#000;border:1px solid #222;border-radius:10px;padding:8px"><div style="color:#777;font-size:9px">PRODUCTION MOY</div><div>${(c.richness*0.9).toFixed(2)} oz /100yd³</div><div style="color:#666">${c.size*c.size} cells</div></div>
    </div>
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
      ${!owned && !rented?`
        <button onclick="buyClaim('${c.id}')" class="btn btn-gold" style="width:100%;justify-content:space-between;display:flex"><span>ACHETER DÉFINITIF</span><span>${fmtMoney(c.price)}</span></button>
        <button onclick="rentClaim('${c.id}')" class="btn btn-dark" style="width:100%;justify-content:space-between;display:flex"><span>LOUER SAISON (105j)</span><span>${fmtMoney(c.rent)}</span></button>
      `: owned?`
        <div style="background:#1a1500;border:1px solid #3a2a00;border-radius:10px;padding:8px;font-size:11px">✅ Propriétaire • Revente ${fmtMoney(c.price*0.75)} • Fee $0 si tu mines</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button onclick="activateClaim('${c.id}')" class="btn btn-gold">MINER ICI ⛏️</button>
          ${!leased?`<button onclick="leaseOutClaim('${c.id}')" class="btn btn-dark">LOUER À UN TIERS 💰</button>`:`<button onclick="cancelLease('${c.id}')" class="btn btn-dark">Reprendre bail</button>`}
        </div>
        <div style="font-size:10px;color:#888">Louer à un tiers : tu deviens proprio bailleur. Un NPC mine pour toi, te reverse ${fmtMoney(c.leaseIncome)}/j + ${Math.round(c.royalty*100)}% royalty or. Idéal revenu passif façon Tony Beets.</div>
      `:`
        <div style="background:#001a12;border:1px solid #003a2a;border-radius:10px;padding:8px;font-size:11px">🟢 Loué jusqu'à J${rented.untilDay} • Renouvelable</div>
        <button onclick="activateClaim('${c.id}')" class="btn btn-gold" style="width:100%">MINER (LOUÉ)</button>
        <button onclick="buyClaim('${c.id}')" class="btn btn-dark" style="width:100%">Passer en Achat -${fmtMoney(c.rent*0.3)} discount</button>
      `}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px;color:#666;font-family:JetBrains Mono"><span>🚛 Transport piste: ${fmtMoney(300+ c.difficulty*180)}/j diesel</span><span>📍 Distance base: ${Math.floor(Math.random()*280+60)} km boueux</span></div>
    </div>
  `;
}

function renderClaimsGrid(){
  const grid=document.getElementById('claimsGrid');
  grid.innerHTML=CLAIMS_ULTIMATE.map(c=>{
    const owned=state.ownedClaims.includes(c.id);
    const rented=state.rentedClaims.some(r=>r.id===c.id);
    return `<div class="card" style="${owned?'border-color:#ffb30066':''}"><div style="display:flex;justify-content:space-between"><div style="font-weight:800;font-size:13px">${c.name}</div><div style="font-size:9px;padding:3px 7px;border-radius:999px;background:#000;border:1px solid #333">${c.country} • ${c.type}</div></div><div style="font-size:10px;color:#777;margin-top:2px">${c.region}</div><div style="margin-top:8px;display:flex;gap:6px"><div style="flex:1;background:#000;border-radius:8px;padding:6px;text-align:center"><div style="font-size:8px;color:#666">ACHAT</div><div style="font-family:JetBrains Mono;font-size:11px;font-weight:700">${fmtMoney(c.price)}</div></div><div style="flex:1;background:#000;border-radius:8px;padding:6px;text-align:center"><div style="font-size:8px;color:#666">LOC</div><div style="font-family:JetBrains Mono;font-size:11px">${fmtMoney(c.rent)}</div></div><div style="flex:1;background:#000;border-radius:8px;padding:6px;text-align:center"><div style="font-size:8px;color:#666">OR EST</div><div style="font-family:JetBrains Mono;font-size:11px;color:#ffb300">${c.goldMin}-${c.goldMax}</div></div></div><div style="margin-top:10px;display:flex;gap:6px"><button onclick="showClaimDetail('${c.id}')" class="btn btn-dark" style="flex:1;font-size:10px;padding:8px">DÉTAILS</button>${!owned&&!rented?`<button onclick="buyClaim('${c.id}')" class="btn btn-gold" style="flex:1;font-size:10px">ACHETER</button>`:`<button onclick="activateClaim('${c.id}')" class="btn btn-gold" style="flex:1;font-size:10px">GO</button>`}</div></div>`;
  }).join('');
}

function renderPortfolio(){
  const statsEl=document.getElementById('portfolioStats');
  const listEl=document.getElementById('portfolioList');
  if(!statsEl) return;
  const ownedValue=state.ownedClaims.reduce((a,id)=>a+(getClaim(id)?.price||0),0);
  const rentCost=state.rentedClaims.reduce((a,r)=>a+(getClaim(r.id)?.rent||0),0);
  const leaseIncome=state.leasedOut.reduce((a,l)=>{ const c=getClaim(l.id); return a + c.leaseIncome; },0);
  const royalties=state.leasedOut.length*2.3; // fake
  statsEl.innerHTML=`
    <div class="card"><div style="font-size:9px;color:#777;letter-spacing:1px">VALEUR PORTEFEUILLE</div><div style="font-family:JetBrains Mono;font-size:22px;font-weight:800">${fmtMoney(ownedValue)}</div><div style="font-size:11px;color:#666">${state.ownedClaims.length} possédés + ${state.rentedClaims.length} loués</div></div>
    <div class="card"><div style="font-size:9px;color:#777">REVENUS PASSIFS BAILLEUR</div><div style="font-family:JetBrains Mono;font-size:22px;color:#4ade80;font-weight:800">+${fmtMoney(leaseIncome)}/j</div><div style="font-size:11px;color:#666">+ ${royalties.toFixed(1)} oz/j royalties • ${state.leasedOut.length} claims loués à des tiers</div></div>
    <div class="card"><div style="font-size:9px;color:#777">COÛTS LOCATION</div><div style="font-family:JetBrains Mono;font-size:22px;color:#fb7185">-${fmtMoney(rentCost)}/saison</div><div style="font-size:11px;color:#666">À renouveler J105</div></div>
  `;
  listEl.innerHTML=[...state.ownedClaims.map(id=>({id, type:'owned'})), ...state.rentedClaims.map(r=>({id:r.id,type:'rented', until:r.untilDay})), ...state.leasedOut.map(l=>({id:l.id,type:'leasedOut'}))].map(item=>{
    const c=getClaim(item.id);
    const data=state.claimData[item.id];
    const mined=data?`${data.cellsMined}/${c.size*c.size}`:'0';
    const status=item.type==='owned'?'PROPRIÉTAIRE':item.type==='rented'?`LOUÉ J${item.until}`:'LOUÉ À TIERS';
    const color=item.type==='owned'?'#ffb300':item.type==='rented'?'#22d3ee':'#a3e635';
    return `<div class="card"><div style="display:flex;justify-content:space-between"><span style="font-weight:800">${c.name}</span><span style="font-size:9px;padding:3px 8px;border-radius:999px;background:${color}22;color:${color};border:1px solid ${color}66">${status}</span></div><div style="font-size:10px;color:#777;margin-top:4px">${c.region} • ${mined} cells minés • ${c.goldMin}-${c.goldMax} oz</div><div style="margin-top:10px;display:flex;gap:6px"><button onclick="activateClaim('${c.id}')" class="btn btn-gold" style="flex:1;font-size:11px">MINER 3D</button><button onclick="showClaimDetail('${c.id}')" class="btn btn-dark" style="flex:1;font-size:11px">GÉRER</button></div></div>`;
  }).join('') || '<div style="color:#666">Aucune concession. Va sur CARTE.</div>';
}

function renderFleetMarket(container){
  container.style.pointerEvents='auto';
  container.innerHTML=`<div style="background:rgba(8,8,8,0.92);backdrop-filter:blur(14px);border:1px solid #222;border-radius:20px;margin:16px;padding:16px;overflow:auto;max-height:100%">
    <h2 class="font-anton" style="font-size:28px">🚜 FLOTTE & ÉQUIPEMENT - ACHAT / LOCATION</h2>
    <div style="font-size:11px;color:#888;margin-top:4px">Loue pour tester sans t'endetter à la Cities Skylines. Usure, boue SnowRunner simulée (poids vs traction).</div>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">${['all','excavator','dozer','washplant','truck','pump','generator'].map(cat=>`<button onclick="filterFleet('${cat}')" class="btn ${cat==='all'?'btn-gold':'btn-dark'}" data-cat="${cat}" style="font-size:11px;padding:8px 14px;border-radius:999px">${cat.toUpperCase()}</button>`).join('')}</div>
    <div id="fleetGrid" style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px"></div>
    <div style="margin-top:20px"><h3 style="font-weight:800;font-size:14px">INVENTAIRE (${state.fleet.length}) — Clique pour déployer en 3D</h3><div id="inventoryList" style="margin-top:10px;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:8px"></div></div>
  </div>`;
  window.filterFleet=(cat)=>{
    document.querySelectorAll('[data-cat]').forEach(b=>{b.classList.remove('btn-gold'); b.classList.add('btn-dark');});
    document.querySelector(`[data-cat="${cat}"]`)?.classList.add('btn-gold');
    fillFleetGrid(cat);
  };
  function fillFleetGrid(cat='all'){
    const grid=container.querySelector('#fleetGrid');
    grid.innerHTML=EQUIP_ULTIMATE.filter(t=>cat==='all'||t.cat===cat).map(t=>`
      <div class="card"><div style="display:flex;justify-content:space-between"><span style="font-size:24px">${t.icon}</span><span style="font-size:10px;padding:4px 8px;border-radius:999px;background:#000;border:1px solid #333">${t.cat} • ${t.weight}T • Mud ${t.mud}</span></div>
      <div style="font-weight:800;margin-top:6px">${t.name}</div><div style="font-size:11px;color:#888;margin-top:2px">Prod ${t.prod} • Fuel ${t.fuel}L/h • Power ${t.power||0} • Health ${t.health}%</div>
      <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px"><button onclick="buyEquip('${t.id}')" class="btn btn-gold" style="font-size:11px">ACHETER ${fmtMoney(t.buy)}</button><button onclick="rentEquip('${t.id}')" class="btn btn-dark" style="font-size:11px">LOUER ${fmtMoney(t.rent)}/saison</button></div>
      </div>
    `).join('');
  }
  fillFleetGrid('all');
  const inv=container.querySelector('#inventoryList');
  function refreshInv(){
    inv.innerHTML=state.fleet.map(f=>{
      const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId);
      return `<div class="card" style="display:flex;gap:10px;align-items:center"><div style="font-size:22px">${t.icon}</div><div style="flex:1"><div style="font-weight:700;font-size:12px">${t.name} ${f.rented?'[LOUÉ]':''}</div><div style="font-size:10px;color:#777;font-family:JetBrains Mono">${f.health.toFixed(0)}% • ${f.hours.toFixed(0)}h • ${f.broken?'PANNE':f.deployed?'DÉPLOYÉ':'STOCK'}</div></div><div style="display:flex;gap:4px"><button onclick="deployFleet('${f.uid}')" class="btn btn-gold" style="font-size:10px;padding:6px 10px">3D DEPLOY</button><button onclick="sellFleet('${f.uid}')" class="btn btn-dark" style="font-size:10px;padding:6px 8px">Vendre</button></div></div>`;
    }).join('') || '<div style="color:#666">Vide</div>';
  }
  refreshInv();
  window.refreshInv=refreshInv;
}

function renderMarket(container){
  container.style.pointerEvents='auto';
  const goldVal=state.gold*state.goldPrice;
  container.innerHTML=`<div style="background:rgba(8,8,8,0.92);backdrop-filter:blur(14px);border:1px solid #222;border-radius:20px;margin:16px;padding:18px;overflow:auto;max-height:100%">
    <h2 class="font-anton" style="font-size:28px">🏦 MARCHÉ OR & FINANCE - CITIES SKYLINES STYLE</h2>
    <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:16px;margin-top:16px">
      <div class="card"><div style="display:flex;gap:16px"><div style="flex:1;background:#000;border-radius:12px;padding:14px;border:1px solid #222"><div style="font-size:9px;color:#777">OR COFFRE</div><div style="font-family:JetBrains Mono;font-size:28px;font-weight:800;color:#ffd54f">${fmtOz(state.gold)}</div><div style="font-size:12px;color:#777">${fmtMoney(goldVal)} valeur</div><div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><button onclick="sellGold(0.25)" class="btn btn-dark" style="font-size:11px">25%</button><button onclick="sellGold(0.5)" class="btn btn-dark" style="font-size:11px">50%</button><button onclick="sellGold(1)" class="btn btn-gold" style="font-size:11px">TOUT VENDRE</button></div></div><div style="flex:1;background:#000;border-radius:12px;padding:14px;border:1px solid #222"><div style="font-size:9px;color:#777">COURS LIVE</div><div style="font-family:JetBrains Mono;font-size:28px;font-weight:800;color:#ffb300">$${state.goldPrice.toFixed(0)}</div><div style="font-size:11px;color:#4ade80">▲ marché haussier, demande Chine</div><div style="margin-top:8px;height:60px;display:flex;gap:2px;align-items:end">${Array.from({length:30},()=>`<div style="flex:1;background:linear-gradient(180deg,#ffb300,#ff8f00);border-radius:2px 2px 0 0;height:${20+Math.random()*80}%"></div>`).join('')}</div></div></div></div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="card"><div style="font-weight:800;font-size:13px">💸 BANQUE & PRÊTS</div><div style="font-size:11px;color:#888;margin-top:4px">Emprunte comme Cities Skylines. Taux 10-18%.</div><div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px"><button onclick="takeLoan(50000)" class="btn btn-dark" style="font-size:11px">+$50k (10%)</button><button onclick="takeLoan(200000)" class="btn btn-gold" style="font-size:11px">+$200k (15%)</button></div><div style="margin-top:8px;font-family:JetBrains Mono;font-size:11px;color:#aaa">Dette: ${fmtMoney(state.loan)} • Intérêt ${fmtMoney(state.loan*0.0007)}/j</div></div>
        <div class="card"><div style="font-weight:800;font-size:13px">📦 LOGISTIQUE SNOWRUNNER</div><div style="font-size:11px;color:#888;margin-top:4px">Transport inter-claims : boue profonde, chaînes nécessaires, conso x2. Le D10 tracte mieux.</div><button onclick="buyFuel(1500)" class="btn btn-dark" style="width:100%;margin-top:8px;font-size:11px">Commander Fuel +1500L ${fmtMoney(1500*1.35)}</button></div>
      </div>
    </div>
  </div>`;
}
function renderFinance(container){
  container.style.pointerEvents='auto';
  const ownedValue=state.ownedClaims.reduce((a,id)=>a+(getClaim(id)?.price||0),0);
  const fleetValue=state.fleet.reduce((a,f)=>{ const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId); return a+t.buy*0.68; },0);
  const netWorth=state.money + state.gold*state.goldPrice + ownedValue*0.8 + fleetValue - state.loan;
  const dailyCost=calcFuelPerDay()*1.35 + state.fleet.length*320 + state.rentedClaims.length*180;
  container.innerHTML=`<div style="background:rgba(8,8,8,0.92);backdrop-filter:blur(14px);border:1px solid #222;border-radius:20px;margin:16px;padding:18px;overflow:auto;max-height:100%">
    <h2 class="font-anton" style="font-size:28px">📊 BILAN FINANCIER - ${state.companyName}</h2>
    <div style="margin-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div class="card" style="background:#000"><div style="font-size:9px;color:#777">TRÉSORERIE</div><div style="font-family:JetBrains Mono;font-size:20px;font-weight:800">${fmtMoney(state.money)}</div></div>
      <div class="card" style="background:#000;border-color:#3a2a00"><div style="font-size:9px;color:#777">OR</div><div style="font-family:JetBrains Mono;font-size:20px;color:#ffb300;font-weight:800">${fmtMoney(state.gold*state.goldPrice)}</div></div>
      <div class="card" style="background:#000"><div style="font-size:9px;color:#777">VALEUR NETTE</div><div style="font-family:JetBrains Mono;font-size:20px;color:${netWorth>0?'#4ade80':'#fb7185'};font-weight:800">${fmtMoney(netWorth)}</div><div style="font-size:10px;color:#666">${dailyCost>0?'-':''}${fmtMoney(dailyCost)}/j coûts</div></div>
      <div class="card" style="background:#000"><div style="font-size:9px;color:#777">TOTAL MINÉ</div><div style="font-family:JetBrains Mono;font-size:20px;font-weight:800">${state.totalGold.toFixed(1)} oz</div><div style="font-size:10px;color:#666">${state.totalPay.toFixed(0)} yd³ lavés</div></div>
    </div>
    <div style="margin-top:16px" class="card"><div style="font-weight:800">OBJECTIFS LÉGENDE (comme Parker Schnabel TV)</div><div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:12px">${[
      {l:'50 oz saison', d: state.totalGold>=50},
      {l:'Big Red possédé', d: state.fleet.some(f=>f.typeId==='wash_150')},
      {l:'Devenir bailleur (louer 2 claims à tiers)', d: state.leasedOut.length>=2},
      {l:'$300k banque', d: state.money>=300000},
      {l:'3 claims owned', d: state.ownedClaims.length>=3},
      {l:'Monster 250 TPH', d: state.fleet.some(f=>f.typeId==='wash_250')},
    ].map(o=>`<div style="display:flex;gap:8px;align-items:center;color:${o.d?'#4ade80':'#666'}"><div style="width:20px;height:20px;border-radius:50%;border:1px solid ${o.d?'#4ade80':'#333'};display:flex;align-items:center;justify-content:center;background:${o.d?'#4ade80':'transparent'};color:${o.d?'#000':'#666'}">${o.d?'✓':'•'}</div>${o.l}</div>`).join('')}</div></div>
  </div>`;
}

// ====== GAME ACTIONS ======
function buyClaim(id){
  const c=getClaim(id);
  if(state.money<c.price){ log(`Fonds insuffisant pour ${c.name}`, 'bad'); return; }
  if(state.ownedClaims.includes(id)) return;
  state.money-=c.price;
  state.ownedClaims.push(id);
  state.rentedClaims=state.rentedClaims.filter(r=>r.id!==id);
  getClaimData(id);
  state.activeClaimId=id;
  log(`Achat définitif ${c.name} ${fmtMoney(c.price)} — titre enregistré Yukon`, 'gold');
  renderMapPins(); renderClaimsGrid(); renderPortfolio(); renderHUD(); saveGame();
  switchView('mine');
}
function rentClaim(id){
  const c=getClaim(id);
  if(state.money<c.rent){ log('Pas assez pour louer', 'bad'); return; }
  if(state.ownedClaims.includes(id) || state.rentedClaims.some(r=>r.id===id)) return;
  state.money-=c.rent;
  state.rentedClaims.push({id, untilDay: state.seasonDay+105});
  getClaimData(id);
  state.activeClaimId=id;
  log(`Location ${c.name} pour 105 jours ${fmtMoney(c.rent)}`, 'info');
  renderMapPins(); renderClaimsGrid(); renderPortfolio(); renderHUD(); saveGame();
  switchView('mine');
}
function leaseOutClaim(id){
  if(state.leasedOut.some(l=>l.id===id)) return;
  state.leasedOut.push({id, since: state.day});
  const c=getClaim(id);
  log(`📜 ${c.name} loué à Parker Schnabel Inc. Revenu ${fmtMoney(c.leaseIncome)}/j + ${Math.round(c.royalty*100)}% royalty or.`, 'gold');
  renderPortfolio(); renderHUD(); saveGame();
}
function cancelLease(id){ state.leasedOut=state.leasedOut.filter(l=>l.id!==id); log('Bail résilié, tu reprends exploitation', 'warn'); renderPortfolio(); saveGame(); }
function activateClaim(id){ state.activeClaimId=id; getClaimData(id); log(`🚛 Convoi SnowRunner vers ${getClaim(id).name} — ${Math.floor(Math.random()*3+1)}h de piste boueuse`, 'info'); renderHUD(); switchView('mine'); }

function buyEquip(typeId){
  const t=EQUIP_ULTIMATE.find(x=>x.id===typeId);
  if(state.money<t.buy){ log('Pas assez $', 'bad'); return; }
  state.money-=t.buy;
  state.fleet.push({uid:'f'+Date.now()+Math.random().toString(36).slice(2,5), typeId:t.id, health:t.health, hours:0, broken:false, deployed:false, claimId:null, rented:false});
  log(`Achat ${t.name} ${fmtMoney(t.buy)}`, 'info');
  renderHUD(); saveGame();
  if(window.refreshInv) window.refreshInv();
}
function rentEquip(typeId){
  const t=EQUIP_ULTIMATE.find(x=>x.id===typeId);
  if(state.money<t.rent){ log('Pas assez $', 'bad'); return; }
  state.money-=t.rent;
  state.fleet.push({uid:'f'+Date.now()+Math.random().toString(36).slice(2,5), typeId:t.id, health:100, hours:0, broken:false, deployed:false, claimId:null, rented:true, rentUntil: state.seasonDay+105});
  log(`Location ${t.name} saison ${fmtMoney(t.rent)}`, 'info');
  renderHUD(); saveGame();
  if(window.refreshInv) window.refreshInv();
}
function deployFleet(uid){
  const f=state.fleet.find(x=>x.uid===uid);
  if(!f) return;
  if(!state.activeClaimId){ log('Choisis une concession d\'abord', 'bad'); return; }
  f.deployed=true; f.claimId=state.activeClaimId;
  const mesh=spawnFleetMesh(f);
  log(`Déploiement 3D ${EQUIP_ULTIMATE.find(t=>t.id===f.typeId).name} à ${getClaim(state.activeClaimId).name}`, 'info');
  renderHUD(); saveGame();
}
function sellFleet(uid){
  const idx=state.fleet.findIndex(x=>x.uid===uid);
  if(idx<0) return;
  const f=state.fleet[idx];
  const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId);
  const price=Math.round(t.buy*0.55*(f.health/100));
  state.money+=price;
  removeFleetMesh(uid);
  state.fleet.splice(idx,1);
  log(`Vendu ${t.name} pour ${fmtMoney(price)}`, 'info');
  renderHUD(); saveGame();
  if(window.refreshInv) window.refreshInv();
}
function buyFuel(liters){
  const cost=liters*1.35;
  if(state.money<cost){ log('Pas de $ diesel', 'bad'); return; }
  state.money-=cost;
  state.diesel=Math.min(state.dieselCap, state.diesel+liters);
  log(`⛽ Fuel +${liters}L ${fmtMoney(cost)}`, 'info');
  renderHUD();
}
function sellGold(frac){
  if(state.gold<=0){ log('Pas d\'or', 'bad'); return; }
  const amt=state.gold*frac;
  const net=amt*state.goldPrice*0.92;
  state.gold-=amt; state.money+=net;
  log(`Vente ${amt.toFixed(2)} oz => ${fmtMoney(net)} (8% taxe fonderie)`, 'gold');
  renderHUD();
}
function takeLoan(amt){
  state.money+=amt; state.loan+=amt*1.12;
  log(`Emprunt ${fmtMoney(amt)} — dette ${fmtMoney(state.loan)}`, 'warn');
  renderHUD();
}
function dispatchTruck(){
  const trucks=state.fleet.filter(f=>f.claimId===state.activeClaimId && f.deployed && EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='truck' && !f.broken);
  if(trucks.length===0){ log('Aucun camion déployé pour dispatch!', 'bad'); return; }
  const f=trucks[0];
  const mesh=meshByFleetUid.get(f.uid);
  if(!mesh) return;
  log(`🚛 ${EQUIP_ULTIMATE.find(t=>t.id===f.typeId).name} dispatch vers laverie 3D...`, 'info');
  // animate truck moving
  let t=0;
  const start=mesh.position.clone();
  const target=new THREE.Vector3( (Math.random()-0.5)*10, start.y, (Math.random()-0.5)*10 );
  function animTruck(){
    t+=0.015;
    mesh.position.lerpVectors(start, target, t);
    mesh.rotation.y=Math.atan2(target.x-start.x, target.z-start.z);
    if(t<1) requestAnimationFrame(animTruck);
    else { log('Camion arrivé, paydirt bonus +28 yd³', 'gold'); state.paydirt+=28; renderHUD(); }
  }
  animTruck();
}
function endDay(auto=false){
  const fuelCost=calcFuelPerDay()*1.35;
  const wages=state.fleet.length*320;
  const rentFees=state.rentedClaims.length?180:0;
  const leaseInc=state.leasedOut.reduce((a,l)=>a+getClaim(l.id).leaseIncome,0);
  const royaltyGold=state.leasedOut.reduce((a,l)=>a+ (Math.random()*1.8+0.4)*getClaim(l.id).royalty,0);
  const interest=state.loan*0.0007;
  const totalCost=fuelCost+wages+rentFees+interest;
  state.money=state.money - totalCost + leaseInc;
  state.gold+=royaltyGold;
  if(royaltyGold>0) log(`💰 Royalties bailleur: +${royaltyGold.toFixed(2)} oz + ${fmtMoney(leaseInc)}`, 'gold');
  if(!auto) log(`🌙 Fin J${state.seasonDay} — Coûts ${fmtMoney(totalCost)} (fuel ${fmtMoney(fuelCost)} + salaires ${fmtMoney(wages)}) + Bailleur +${fmtMoney(leaseInc)}`, 'warn');
  state.dailyGold=0;
  state.day++; state.seasonDay++; state.hour=6;
  // check rented expiry
  state.rentedClaims=state.rentedClaims.filter(r=>{
    if(r.untilDay<=state.seasonDay){ log(`📜 Location ${getClaim(r.id).name} expire, renouvelable`, 'warn'); return false; }
    return true;
  });
  // check fleet rented expiry
  state.fleet=state.fleet.filter(f=>{
    if(f.rented && f.rentUntil<=state.seasonDay){ log(`🚜 Location ${EQUIP_ULTIMATE.find(t=>t.id===f.typeId).name} terminée, rendu`, 'warn'); removeFleetMesh(f.uid); return false; }
    return true;
  });
  state.goldPrice+= (Math.random()-0.5)*10;
  state.goldPrice=Math.max(1650, Math.min(2350, state.goldPrice));
  // weather
  if(Math.random()<0.15){ const ws=['Soleil','Nuageux','Pluie battante','Bourbier SnowRunner','Neige précoce']; state.weather=ws[Math.floor(Math.random()*ws.length)]; state.temp=Math.floor(2+Math.random()*20); state.mudFactor= state.weather==='Bourbier SnowRunner'?0.65: state.weather==='Pluie battante'?0.48:0.25; if(state.weather.includes('Bourbier')) log(`🌧️ MUD SEASON! Boue profonde 0.${Math.floor(state.mudFactor*100)} traction — prod -35%`, 'warn'); }
  if(state.seasonDay>state.seasonLen){
    log(`❄️ FIN SAISON ${state.year} — Hiver arrive, -5% health`, 'warn');
    state.fleet.forEach(f=>f.health=Math.max(5,f.health-5-Math.random()*5));
    state.year++; state.seasonDay=1; state.seasonLen=105;
  }
  renderHUD(); saveGame();
}

// ====== SIMULATION LOOP - REALISTIC ======
function simulate(hours){
  if(!state.activeClaimId) return;
  const data=getClaimData(state.activeClaimId);
  const fleet=state.fleet.filter(f=>f.claimId===state.activeClaimId && f.deployed);
  if(fleet.length===0) return;
  let dieselNeed=0;
  fleet.forEach(f=>{ if(!f.broken){ const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId); dieselNeed+=t.fuel*hours; f.hours+=hours; } });
  if(state.diesel<dieselNeed){ if(Math.random()<0.2) log('⚠️ PANNE SÈCHE diesel!', 'bad'); return; }
  state.diesel-=dieselNeed;

  const power=calcPower(state.activeClaimId);
  if(power<0){ if(Math.random()<0.1) log(`⚡ Coupure élec ${power}kW — ajoute groupe`, 'bad'); return; }

  // mud factor
  const mudSlow=1 - state.mudFactor*0.5;

  // dozer
  const dozers=fleet.filter(f=>EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='dozer' && !f.broken);
  let dozerProd=dozers.reduce((a,f)=>a+EQUIP_ULTIMATE.find(t=>t.id===f.typeId).prod*hours*mudSlow,0);
  for(let y=0;y<data.grid.length && dozerProd>0;y++){
    for(let x=0;x<data.grid[0].length && dozerProd>0;x++){
      const cell=data.grid[y][x];
      if(!cell.cleared){
        const need=cell.overburden;
        if(dozerProd>=need){ cell.cleared=true; data.cellsCleared++; dozerProd-=need; }
        else { cell.overburden-=dozerProd; dozerProd=0; }
      }
    }
  }

  // excav
  const excavs=fleet.filter(f=>EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='excavator' && !f.broken);
  let excavProd=excavs.reduce((a,f)=>a+EQUIP_ULTIMATE.find(t=>t.id===f.typeId).prod*hours*mudSlow,0);
  let payMined=0, goldInPay=0;
  for(let y=0;y<data.grid.length && excavProd>0;y++){
    for(let x=0;x<data.grid[0].length && excavProd>0;x++){
      const cell=data.grid[y][x];
      if(cell.cleared && !cell.mined){
        if(excavProd>=cell.pay){ excavProd-=cell.pay; payMined+=cell.pay; goldInPay+=cell.gold; cell.mined=true; data.cellsMined++; }
        else { const ratio=excavProd/cell.pay; payMined+=excavProd; goldInPay+=cell.gold*ratio; cell.pay-=excavProd; cell.gold*=1-ratio; excavProd=0; }
      }
    }
  }
  if(payMined>0){
    const trucks=fleet.filter(f=>EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='truck' && !f.broken).length;
    if(trucks>0) payMined*=1+trucks*0.14;
    state.paydirt+=payMined;
    state.goldInWash+=goldInPay;
  }

  // washplant
  const washes=fleet.filter(f=>EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='washplant' && !f.broken);
  let washCap=washes.reduce((a,f)=>a+EQUIP_ULTIMATE.find(t=>t.id===f.typeId).prod*hours,0);
  const pumps=fleet.filter(f=>EQUIP_ULTIMATE.find(t=>t.id===f.typeId).cat==='pump' && !f.broken).length;
  if(pumps===0 && washCap>0){ washCap=0; }
  if(washCap>0 && state.paydirt>0){
    const toProcess=Math.min(washCap, state.paydirt);
    const ratio=toProcess/state.paydirt;
    const goldProd=state.goldInWash*ratio*(0.84+Math.random()*0.24)*(1-state.mudFactor*0.2);
    state.paydirt-=toProcess;
    state.goldInWash-=state.goldInWash*ratio;
    if(state.goldInWash<0) state.goldInWash=0;
    state.gold+=goldProd; state.dailyGold+=goldProd; state.totalGold+=goldProd; state.totalPay+=toProcess;
    if(goldProd>0.6) log(`✨ Trommel crache ${goldProd.toFixed(2)} oz 3D!`, 'gold');
  }

  // wear
  fleet.forEach(f=>{
    if(f.broken) return;
    const wear=0.035*hours + Math.random()*0.05*hours + (f.health<35?0.25:0);
    f.health-=wear;
    if(f.health<=0){ f.health=0; f.broken=true; log(`🚨 PANNE ${EQUIP_ULTIMATE.find(t=>t.id===f.typeId).name} health 0%`, 'bad'); }
    else if(Math.random() < (100-f.health)*0.0003*state.speed){ f.broken=true; log(`⚠️ Panne ${EQUIP_ULTIMATE.find(t=>t.id===f.typeId).name}`, 'bad'); }
  });
}

// 3D animation + game tick
function animate(){
  requestAnimationFrame(animate);
  const dt=clock.getDelta();
  // rotate trommels
  fleetGroup.children.forEach(m=>{
    if(m.userData.trom){ m.userData.spin+=dt* (1+state.speed*0.3); m.userData.trom.rotation.x=m.userData.spin; }
    if(m.userData.arm1Group){ m.userData.animPhase+=dt*0.8*state.speed; const s=Math.sin(m.userData.animPhase); m.userData.arm1Group.rotation.x= -0.2 + s*0.25; m.userData.arm2Group.rotation.x= -0.6 + Math.cos(m.userData.animPhase*1.2)*0.5; }
    if(m.userData.wheels){ m.userData.wheels.forEach(w=>w.rotation.x+=dt*2*state.speed); }
  });
  // water anim
  if(waterMesh){ waterMesh.material.color.setHSL(0.54+Math.sin(Date.now()*0.0003)*0.03,0.6,0.35); }
  if(particleSystem){ particleSystem.rotation.y+=dt*0.02; }
  controls.update();
  renderer.render(scene, camera);
}

// Game loop timer
let tickInt=null;
function startLoop(){
  if(tickInt) clearInterval(tickInt);
  tickInt=setInterval(()=>{
    if(state.speed===0) return;
    const hours=state.speed*1.1;
    state.hour+=hours;
    if(state.hour>=18){ endDay(true); return; }
    simulate(hours);
    if(Math.random()<0.5) renderHUD();
  }, 650);
}

function renderHUD(){
  document.getElementById('hudMoney').textContent=fmtMoney(state.money);
  document.getElementById('hudGold').textContent=fmtOz(state.gold);
  document.getElementById('hudGoldVal').textContent=fmtMoney(state.gold*state.goldPrice);
  document.getElementById('hudPay').textContent=Math.round(state.paydirt)+' yd³';
  document.getElementById('hudFuel').textContent=Math.round(state.diesel)+' L';
  document.getElementById('fuelBar').style.width=Math.min(100, state.diesel/state.dieselCap*100)+'%';
  document.getElementById('fuelBar').style.background=state.diesel<800?'#ef4444':'#f59e0b';
  document.getElementById('hudYear').textContent=state.year;
  document.getElementById('hudDay').textContent=state.seasonDay;
  document.getElementById('hudGoldPrice').textContent='$'+state.goldPrice.toFixed(0)+' /oz';
  document.getElementById('hudWeather').textContent=state.weather+' '+state.temp+'°C';
  document.getElementById('hudCompany').textContent=state.companyName;
  document.getElementById('seasonLabel').textContent='J'+state.seasonDay+' / '+state.seasonLen;
  document.getElementById('seasonBar').style.width=(state.seasonDay/state.seasonLen*100)+'%';
  document.getElementById('dailyProd').textContent=state.dailyGold.toFixed(2)+' oz';
  document.getElementById('activeClaimName').textContent=state.activeClaimId?getClaim(state.activeClaimId).name:'AUCUNE';
  document.getElementById('hudPower').textContent='⚡ '+(calcPower(state.activeClaimId)>=0?'+':'')+calcPower(state.activeClaimId)+'kW';

  const fleetList=document.getElementById('fleetList3d');
  const noFleet=document.getElementById('noFleet3d');
  const active=state.fleet.filter(f=>f.claimId===state.activeClaimId && f.deployed);
  if(active.length===0){ fleetList.innerHTML=''; noFleet.style.display='block'; }
  else { noFleet.style.display='none'; fleetList.innerHTML=active.map(f=>{
    const t=EQUIP_ULTIMATE.find(x=>x.id===f.typeId);
    return `<div style="background:#111;border:1px solid ${f.broken?'#7f1d1d':'#222'};border-radius:10px;padding:8px;display:flex;gap:8px;align-items:center"><div style="font-size:20px">${t.icon}</div><div style="flex:1"><div style="font-size:11px;font-weight:800">${t.name} ${f.rented?'[LOC]':''}</div><div style="font-size:10px;color:#777;font-family:JetBrains Mono">${f.health.toFixed(0)}% • ${f.hours.toFixed(0)}h • Mud ${t.mud}</div><div style="height:3px;background:#000;border-radius:99px;margin-top:4px"><div style="height:100%;width:${f.health}%;background:${f.broken?'#ef4444':'#ffb300'}"></div></div></div><div style="font-size:9px;font-weight:800;color:${f.broken?'#ef4444':'#22c55e'}">${f.broken?'PANNE':'ON'}</div></div>`;
  }).join(''); }
}

function handleCheat(code){
  if(code==='gold'){ state.gold+=15; log('CHEAT +15 oz', 'gold'); }
  else if(code==='money'){ state.money+=100000; log('CHEAT +100k', 'gold'); }
  else if(code==='fuel'){ state.diesel+=5000; log('CHEAT fuel full', 'info'); }
  else if(code==='bigred'){ buyEquip('wash_150'); }
  renderHUD();
}

function saveGame(){ localStorage.setItem('goldRushUltimate', JSON.stringify(state)); log('💾 Sauvegarde auto', 'info'); }
function loadGame(){
  const raw=localStorage.getItem('goldRushUltimate');
  if(!raw) return false;
  try{ const loaded=JSON.parse(raw); state={...state, ...loaded}; if(!state.rentedClaims) state.rentedClaims=[]; if(!state.leasedOut) state.leasedOut=[]; }catch(e){ return false; }
  // respawn 3D meshes
  state.fleet.forEach(f=>{ if(f.deployed) spawnFleetMesh(f); });
  return true;
}

window.buyClaim=buyClaim; window.rentClaim=rentClaim; window.leaseOutClaim=leaseOutClaim; window.cancelLease=cancelLease; window.activateClaim=activateClaim; window.showClaimDetail=showClaimDetail;
window.buyEquip=buyEquip; window.rentEquip=rentEquip; window.deployFleet=deployFleet; window.sellFleet=sellFleet; window.buyFuel=buyFuel; window.sellGold=sellGold; window.takeLoan=takeLoan; window.dispatchTruck=dispatchTruck; window.filterFleet=null; window.refreshInv=null;

(async()=>{
  updateLoader(5,'Chargement Three.js...');
  if(!loadGame()){
    state.money=125000;
    log('Bienvenue ULTIMATE — 18 claims Canada/USA. Achète ta concession sur CARTE, puis Flotte pour déployer en 3D.', 'gold');
    log('Nouveau: loue une concession ou deviens bailleur et touche royalties passives!', 'info');
  } else {
    log('Partie Ultimate chargée', 'gold');
  }
  await init3D();
  setupUI();
  startLoop();
  renderHUD();
})();

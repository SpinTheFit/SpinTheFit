let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

/* COLORS */
function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
}

function pastelHex() {
  const r = Math.floor(Math.random()*127+128);
  const g = Math.floor(Math.random()*127+128);
  const b = Math.floor(Math.random()*127+128);
  return rgbToHex({r,g,b});
}

function rgbToHex({r,g,b}) {
  return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
}

/* RENDERERS */
function renderColor(id, hex) {
  document.getElementById(id).innerHTML = `
    <div class="color-item">
      <div class="color-box" style="background:${hex}"></div>
      <div>${hex}</div>
    </div>
  `;
}

function renderMultiple(id, arr) {
  document.getElementById(id).innerHTML = arr.map(hex => `
    <div class="color-item">
      <div class="color-box" style="background:${hex}"></div>
      <div>${hex}</div>
    </div>
  `).join("");
}

/* BASE */
function spinBase(){
  currentBase = randomHex();
  renderColor("baseResult", currentBase);
}

function spinPastel(){
  currentBase = pastelHex();
  renderColor("pastelResult", currentBase);
}

/* HARMONY */
function spinComplementary(){
  const c = parseInt(currentBase.slice(1),16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6,"0");
  renderColor("complementaryResult", comp);
}

function spinAnalogous(){
  const base = randomHex();
  const c = parseInt(base.slice(1),16);

  const c1 = "#" + ((c + 0x202020) & 0xffffff).toString(16).padStart(6,"0");
  const c2 = "#" + ((c - 0x202020) & 0xffffff).toString(16).padStart(6,"0");

  renderMultiple("analogousResult", [c1, c2]);
}

/* MONOCHROME */
function spinMonochrome(){
  const base = randomHex();

  const shade = (hex,p)=>{
    let n=parseInt(hex.slice(1),16);
    let r=(n>>16)+p;
    let g=((n>>8)&255)+p;
    let b=(n&255)+p;
    return rgbToHex({
      r:Math.min(255,Math.max(0,r)),
      g:Math.min(255,Math.max(0,g)),
      b:Math.min(255,Math.max(0,b))
    });
  };

  renderMultiple("monoResult", [
    shade(base,50),
    base,
    shade(base,-50)
  ]);
}

/* TEXTURE */
const textures=["denim","velvet","leather","silk","lace"];

function spinTexture(){
  document.getElementById("textureResult").innerHTML =
    `<div class="texture-card">${textures[Math.floor(Math.random()*textures.length)]}</div>`;
}

/* WHEEL */
const themes=[
  "Zombie Diner","Alien Blend In","Runway Apocalypse","Haunted Doll",
  "Popstar Breakdown","Time Traveler","Princess Evil","Villain Gala",
  "Fairy Chaos","Cyberpunk Queen","Ice Empress","Galaxy Girl"
];

function spinThemeWheel(){
  if(spinning) return;
  spinning = true;

  const wheel = document.getElementById("themeWheel");
  const result = document.getElementById("themeResult");

  const index = Math.floor(Math.random()*themes.length);
  const angle = 360/themes.length;

  rotation += 1800 + index*angle;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(()=>{
    result.innerHTML = `<div class="theme-card">${themes[index]}</div>`;
    spinning = false;
  },4000);
}

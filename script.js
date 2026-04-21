// Store the current base colour
let currentBase = "#ff0000"; // default initial colour

/* COLOR HELPERS */
function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16).padStart(6, "0");
}

function pastelHex() {
  const r = Math.floor(Math.random() * 127 + 128);
  const g = Math.floor(Math.random() * 127 + 128);
  const b = Math.floor(Math.random() * 127 + 128);
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

function shadeColor(hex, percent) {
  let num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, "0");
}

/* DOM HELPERS */
function clear(id) {
  document.getElementById(id).innerHTML = "";
}

function addColor(id, color) {
  const item = document.createElement("div");
  item.className = "color-item";

  const box = document.createElement("div");
  box.className = "color-box";
  box.style.background = color;

  const label = document.createElement("div");
  label.textContent = color;

  item.append(box, label);
  document.getElementById(id).appendChild(item);
}

/* BASE COLOUR */
function spinBase() {
  clear("baseResult");
  currentBase = randomHex();
  addColor("baseResult", currentBase);
}

function spinPastel() {
  clear("pastelResult");
  currentBase = pastelHex();
  addColor("pastelResult", currentBase);
}

/* COMPLEMENTARY & ANALOGOUS */
function spinComplementary() {
  clear("complementaryResult");
  const c = parseInt(currentBase.slice(1), 16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6, "0");
  addColor("complementaryResult", comp);
}

function spinAnalogous() {
  clear("analogousResult");
  const base = hexToRgb(currentBase);
  const analog1 = shiftHue(base, 30);
  const analog2 = shiftHue(base, -30);
  addColor("analogousResult", rgbToHex(analog1));
  addColor("analogousResult", rgbToHex(analog2));
}

/* MONOCHROME */
function spinMonochrome() {
  clear("monoResult");
  const base = randomHex();
  addColor("monoResult", shadeColor(base, 60));
  addColor("monoResult", base);
  addColor("monoResult", shadeColor(base, -60));
}

/* TEXTURES */
const textures = ["denim","velvet","leather","satin","silk","knit","fur","lace","mesh","suede"];
function spinTexture() {
  clear("textureResult");
  const card = document.createElement("div");
  card.className = "texture-card";
  card.textContent = textures[Math.floor(Math.random()*textures.length)];
  document.getElementById("textureResult").appendChild(card);
}

/* --- Helper functions for Analogous --- */
function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  return { r: (num >> 16), g: ((num >> 8) & 0x00ff), b: (num & 0x0000ff) };
}

function shiftHue({r,g,b}, deg) {
  let {h,s,l} = rgbToHsl(r,g,b);
  h = (h + deg) % 360;
  if(h < 0) h += 360;
  return hslToRgb(h,s,l);
}

function rgbToHex({r,g,b}) {
  return "#" + [r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
}

/* RGB / HSL conversions */
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;

  if(max===min) h=s=0;
  else{
    const d=max-min;
    s=l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d +4; break;
    }
    h*=60;
  }
  return {h,s,l};
}

function hslToRgb(h,s,l){
  let r,g,b;
  if(s===0){
    r=g=b=l;
  } else {
    const hue2rgb=(p,q,t)=>{
      if(t<0) t+=1;
      if(t>1) t-=1;
      if(t<1/6) return p+(q-p)*6*t;
      if(t<1/2) return q;
      if(t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    };
    const q = l<0.5 ? l*(1+s) : l+s-l*s;
    const p = 2*l - q;
    r=hue2rgb(p,q,h/360 + 1/3);
    g=hue2rgb(p,q,h/360);
    b=hue2rgb(p,q,h/360 - 1/3);
  }
  return {r:Math.round(r*255), g:Math.round(g*255), b:Math.round(b*255)};
}
/* THEME WHEEL */

const themes = [
  "Zombie Diner Waitress",
  "Alien Trying to Blend In",
  "Runway Model in the Apocalypse",
  "Haunted Doll Escaped",
  "Popstar After Breakup",
  "Time Traveler Stuck in 2007",
  "Princess Turned Evil",
  "Villain at a Gala",
  "Fairy Who Hates Humans",
  "Angel Fallen From Heaven",
  "Mermaid on Land",
  "Celebrity in Disguise",
  "Spy on a Mission",
  "Cursed Royalty",
  "Reality TV Star",
  "Influencer Scandal Era",
  "Barbie Gone Wrong",
  "Y2K Club Kid",
  "Soft Girl but Evil",
  "Dark Academia Student",
  "Rich Mom at Brunch",
  "Office Siren",
  "After Party at 3AM",
  "Cyberpunk Future",
  "Ice Queen",
  "Fire Goddess",
  "Galaxy Girl",
  "Robot Learning Fashion"
];

function spinTheme() {
  const resultBox = document.getElementById("themeResult");
  resultBox.innerHTML = "";

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  const card = document.createElement("div");
  card.className = "theme-card";
  card.textContent = randomTheme;

  resultBox.appendChild(card);
}

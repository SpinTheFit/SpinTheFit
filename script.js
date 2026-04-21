let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

/* =========================
   COLORS
========================= */

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

/* =========================
   RENDER
========================= */

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

/* =========================
   COLOR FUNCTIONS
========================= */

function spinBase(){
  currentBase = randomHex();
  renderColor("baseResult", currentBase);
}

function spinPastel(){
  currentBase = pastelHex();
  renderColor("pastelResult", currentBase);
}

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

function spinMonochrome(){
  const base = randomHex();

  const shade = p => {
    let n=parseInt(base.slice(1),16);
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
    shade(50),
    base,
    shade(-50)
  ]);
}

const textures=["denim","velvet","leather","silk","lace"];

function spinTexture(){
  document.getElementById("textureResult").innerHTML =
    `<div class="texture-card">${textures[Math.floor(Math.random()*textures.length)]}</div>`;
}

/* =========================
   🎡 WHEEL (FINAL FIXED VERSION)
========================= */

const themes = [
  "Zombie Diner Waitress",
  "Alien Trying to Blend In",
  "Runway Apocalypse",
  "Haunted Doll Escaped",
  "Popstar Breakup Era",
  "Cyberpunk Diva",
  "Ice Queen Couture",
  "Galaxy Girl",
  "Barbie Glitch",
  "Dark Academia",
  "Cottagecore Dream",
  "Y2K Pop Star",
  "Grunge Revival",
  "Soft Goth",
  "Old Money Elegance",
  "Clowncore Glam",
  "Royal Vampire",
  "Fairycore Angel"
];

window.addEventListener("load", buildWheel);

function buildWheel() {
  const wheel = document.getElementById("themeWheel");
  if (!wheel) return;

  wheel.innerHTML = "";

  const angle = 360 / themes.length;

  themes.forEach((t, i) => {
    const slice = document.createElement("div");
    slice.className = "slice";

    // 🔥 FIX: correct wheel positioning
    slice.style.transform = `
      rotate(${i * angle}deg)
      translate(0, -50%)
    `;

    slice.innerHTML = `<span>${t}</span>`;
    wheel.appendChild(slice);
  });
}

function spinThemeWheel() {
  if (spinning) return;
  spinning = true;

  const wheel = document.getElementById("themeWheel");
  const result = document.getElementById("themeResult");

  const index = Math.floor(Math.random() * themes.length);
  const angle = 360 / themes.length;

  rotation += 1800 + index * angle;

  wheel.style.transition = "transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.innerHTML = `<div class="theme-card">${themes[index]}</div>`;
    spinning = false;
  }, 4000);
}

let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

/* =========================
   COLOUR HELPERS
========================= */

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
}

function pastelHex() {
  const r = Math.floor(Math.random() * 127 + 128);
  const g = Math.floor(Math.random() * 127 + 128);
  const b = Math.floor(Math.random() * 127 + 128);
  return rgbToHex({ r, g, b });
}

function shadeColor(hex, p) {
  let n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + p;
  let g = ((n >> 8) & 255) + p;
  let b = (n & 255) + p;

  return rgbToHex({
    r: Math.min(255, Math.max(0, r)),
    g: Math.min(255, Math.max(0, g)),
    b: Math.min(255, Math.max(0, b))
  });
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

/* =========================
   🟦 IMPORTANT FIX: COLOR DISPLAY
========================= */

function showColor(id, hex) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  const card = document.createElement("div");
  card.className = "color-item";

  const box = document.createElement("div");
  box.className = "color-box";
  box.style.background = hex;

  const text = document.createElement("div");
  text.textContent = hex;

  card.appendChild(box);
  card.appendChild(text);
  el.appendChild(card);
}

function showColors(id, arr) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  arr.forEach(hex => {
    const card = document.createElement("div");
    card.className = "color-item";

    const box = document.createElement("div");
    box.className = "color-box";
    box.style.background = hex;

    const text = document.createElement("div");
    text.textContent = hex;

    card.appendChild(box);
    card.appendChild(text);
    el.appendChild(card);
  });
}

/* =========================
   BASE COLOURS
========================= */

function spinBase() {
  currentBase = randomHex();
  showColor("baseResult", currentBase);
}

function spinPastel() {
  currentBase = pastelHex();
  showColor("pastelResult", currentBase);
}

/* =========================
   HARMONY
========================= */

function spinComplementary() {
  const c = parseInt(currentBase.slice(1), 16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6, "0");
  showColor("complementaryResult", comp);
}

function spinAnalogous() {
  const base = randomHex();
  showColor("analogousResult", base);
}

/* =========================
   MONOCHROME
========================= */

function spinMonochrome() {
  const base = randomHex();
  showColors("monoResult", [
    shadeColor(base, 50),
    base,
    shadeColor(base, -50)
  ]);
}

/* =========================
   TEXTURES
========================= */

const textures = [
  "denim", "velvet", "leather", "silk", "lace",
  "satin", "fur", "mesh", "suede", "knit"
];

function spinTexture() {
  const el = document.getElementById("textureResult");
  el.innerHTML = "";

  const card = document.createElement("div");
  card.className = "texture-card";
  card.textContent = textures[Math.floor(Math.random() * textures.length)];

  el.appendChild(card);
}

/* =========================
   🎡 FULL WHEEL FIX (ALL THEMES SHOWN)
========================= */

const themes = [
  "Zombie Diner Waitress",
  "Alien Trying to Blend In",
  "Runway Model Apocalypse",
  "Haunted Doll Escaped",
  "Popstar Breakup Era",
  "Time Traveler 2007",
  "Princess Turned Evil",
  "Villain at Gala",
  "Fairy Who Hates Humans",
  "Fallen Angel",
  "Mermaid on Land",
  "Spy Mission",
  "Cursed Royalty",
  "Reality TV Star",
  "Influencer Chaos",
  "Barbie Gone Wrong",
  "Y2K Club Kid",
  "Soft Girl Evil",
  "Dark Academia",
  "Rich Mom Brunch",
  "Office Siren",
  "3AM After Party",
  "Cyberpunk Future",
  "Ice Queen",
  "Fire Goddess",
  "Galaxy Girl",
  "Robot Fashion",
  "Clowncore Glam",
  "Witch in Paris",
  "Royal Vampire",
  "Disco Apocalypse"
];

/* BUILD WHEEL VISUALLY (FIXED) */
function buildWheel() {
  const wheel = document.getElementById("themeWheel");
  wheel.innerHTML = "";

  const angle = 360 / themes.length;

  themes.forEach((t, i) => {
    const seg = document.createElement("div");

    seg.style.position = "absolute";
    seg.style.width = "50%";
    seg.style.height = "50%";
    seg.style.top = "50%";
    seg.style.left = "50%";
    seg.style.transformOrigin = "0 0";
    seg.style.transform = `rotate(${i * angle}deg) skewY(-60deg)`;

    seg.style.background = i % 2 ? "#f8d7da" : "#dbeafe";

    const text = document.createElement("div");
    text.textContent = themes[i];

    text.style.position = "absolute";
    text.style.left = "10px";
    text.style.top = "10px";
    text.style.fontSize = "9px";
    text.style.transform = "skewY(60deg) rotate(90deg)";
    text.style.width = "120px";

    seg.appendChild(text);
    wheel.appendChild(seg);
  });
}

window.addEventListener("load", buildWheel);

/* SPIN */
function spinThemeWheel() {
  if (spinning) return;
  spinning = true;

  const wheel = document.getElementById("themeWheel");
  const result = document.getElementById("themeResult");

  const index = Math.floor(Math.random() * themes.length);
  const angle = 360 / themes.length;

  rotation += 5 * 360 + index * angle;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.innerHTML = `<div class="theme-card">${themes[index]}</div>`;
    spinning = false;
  }, 4000);
}

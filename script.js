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
  let g = (n >> 8 & 255) + p;
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
   RENDERERS
========================= */

function renderColor(id, hex) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  const card = document.createElement("div");
  card.className = "color-item";

  const box = document.createElement("div");
  box.className = "color-box";
  box.style.backgroundColor = hex;

  const label = document.createElement("div");
  label.textContent = hex;

  card.appendChild(box);
  card.appendChild(label);
  el.appendChild(card);
}

function renderMultiple(id, colors) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  colors.forEach(hex => {
    const card = document.createElement("div");
    card.className = "color-item";

    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = hex;

    const label = document.createElement("div");
    label.textContent = hex;

    card.appendChild(box);
    card.appendChild(label);
    el.appendChild(card);
  });
}

/* =========================
   BASE / HARMONY
========================= */

function spinBase() {
  currentBase = randomHex();
  renderColor("baseResult", currentBase);
}

function spinPastel() {
  currentBase = pastelHex();
  renderColor("pastelResult", currentBase);
}

function spinComplementary() {
  const c = parseInt(currentBase.slice(1), 16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6, "0");
  renderColor("complementaryResult", comp);
}

/* FIXED ANALOGOUS (2 REAL VARIATIONS) */
function spinAnalogous() {
  const base = parseInt(randomHex().slice(1), 16);

  const c1 = "#" + ((base + 0x202020) & 0xffffff).toString(16).padStart(6, "0");
  const c2 = "#" + ((base - 0x202020) & 0xffffff).toString(16).padStart(6, "0");

  renderMultiple("analogousResult", [c1, c2]);
}

/* =========================
   MONOCHROME / TEXTURE
========================= */

function spinMonochrome() {
  const base = randomHex();

  renderMultiple("monoResult", [
    shadeColor(base, 50),
    base,
    shadeColor(base, -50)
  ]);
}

const textures = [
  "denim", "velvet", "leather", "silk", "lace",
  "satin", "fur", "mesh", "suede", "knit"
];

function spinTexture() {
  const el = document.getElementById("textureResult");
  if (!el) return;

  el.innerHTML = "";

  const card = document.createElement("div");
  card.className = "texture-card";
  card.textContent = textures[Math.floor(Math.random() * textures.length)];

  el.appendChild(card);
}

/* =========================
   🎡 WHEEL (FULL FIX)
========================= */

const themes = [
  "Zombie Diner Waitress",
  "Alien Trying to Blend In",
  "Runway Apocalypse",
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

/* BUILD WHEEL */
function buildWheel() {
  const wheel = document.getElementById("themeWheel");
  if (!wheel) return;

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

window.addEventListener("DOMContentLoaded", () => {
  buildWheel();

  // IMPORTANT fallback binding (fixes "button does nothing" cases)
  const btn = document.getElementById("spinWheelBtn");
  if (btn) btn.addEventListener("click", spinThemeWheel);
});

/* =========================
   SPIN FIXED (REAL ANIMATION RESET)
========================= */

function spinThemeWheel() {
  if (spinning) return;
  spinning = true;

  const wheel = document.getElementById("themeWheel");
  const result = document.getElementById("themeResult");

  if (!wheel) {
    spinning = false;
    return;
  }

  const index = Math.floor(Math.random() * themes.length);
  const angle = 360 / themes.length;

  rotation += 2160 + index * angle;

  // FORCE RESET ANIMATION (THIS FIXES “NOT SPINNING” BUG)
  wheel.style.transition = "none";
  wheel.offsetHeight; // force reflow

  wheel.style.transition = "transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.innerHTML = `<div class="theme-card">${themes[index]}</div>`;
    spinning = false;
  }, 4000);
}

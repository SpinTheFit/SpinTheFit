let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

/* =========================
   COLOUR HELPERS
========================= */

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
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
   🟦 FIXED COLOUR DISPLAY
========================= */

function renderColor(id, hex) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  const item = document.createElement("div");
  item.className = "color-item";

  const box = document.createElement("div");
  box.className = "color-box";
  box.style.background = hex;

  const label = document.createElement("div");
  label.textContent = hex;

  item.appendChild(box);
  item.appendChild(label);
  container.appendChild(item);
}

function renderMultiple(id, colors) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  colors.forEach(hex => {
    const item = document.createElement("div");
    item.className = "color-item";

    const box = document.createElement("div");
    box.className = "color-box";
    box.style.background = hex;

    const label = document.createElement("div");
    label.textContent = hex;

    item.appendChild(box);
    item.appendChild(label);
    container.appendChild(item);
  });
}

/* =========================
   BASE COLOURS
========================= */

function spinBase() {
  currentBase = randomHex();
  renderColor("baseResult", currentBase);
}

function spinPastel() {
  currentBase = pastelHex();
  renderColor("pastelResult", currentBase);
}

/* =========================
   HARMONY
========================= */

function spinComplementary() {
  const c = parseInt(currentBase.slice(1), 16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6, "0");
  renderColor("complementaryResult", comp);
}

function spinAnalogous() {
  const base = randomHex();
  renderColor("analogousResult", base);
}

/* =========================
   MONOCHROME (FIXED VISUAL)
========================= */

function spinMonochrome() {
  const base = randomHex();

  const lighter = shadeColor(base, 50);
  const darker = shadeColor(base, -50);

  renderMultiple("monoResult", [lighter, base, darker]);
}

/* =========================
   TEXTURES
========================= */

const textures = ["denim", "velvet", "leather", "silk", "lace"];

function spinTexture() {
  const container = document.getElementById("textureResult");
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "texture-card";
  card.textContent = textures[Math.floor(Math.random() * textures.length)];

  container.appendChild(card);
}

/* =========================
   🎡 FULL WORKING WHEEL
========================= */

const themes = [
  "Zombie Diner",
  "Alien Blending In",
  "Runway Apocalypse",
  "Haunted Doll",
  "Popstar Breakdown",
  "Cyberpunk Queen",
  "Ice Empress",
  "Galaxy Girl",
  "Barbie Glitch",
  "Fairy Chaos",
  "Villain Gala",
  "Time Traveler",
  "Angel Fallen",
  "Mermaid on Land"
];

/* build visible wheel */
function buildWheel() {
  const wheel = document.getElementById("themeWheel");
  const angle = 360 / themes.length;

  wheel.innerHTML = "";

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

    const text = document.createElement("span");
    text.textContent = themes[i];
    text.style.position = "absolute";
    text.style.left = "10px";
    text.style.top = "10px";
    text.style.fontSize = "10px";
    text.style.transform = "skewY(60deg) rotate(90deg)";

    seg.appendChild(text);
    wheel.appendChild(seg);
  });
}

window.addEventListener("load", buildWheel);

/* spin logic */
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

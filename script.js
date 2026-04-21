
// =====================
// STATE
// =====================

let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

const spinSound = new Audio(
  "https://www.soundjay.com/buttons/sounds/button-16.mp3"
);

// =====================
// COLOR HELPERS
// =====================

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
  return "#" + [r, g, b]
    .map(v => v.toString(16).padStart(2, "0"))
    .join("");
}

// =====================
// BASE COLOURS
// =====================

function spinBase() {
  currentBase = randomHex();
  const el = document.getElementById("baseResult");
  if (el) el.innerHTML = currentBase;
}

function spinPastel() {
  currentBase = pastelHex();
  const el = document.getElementById("pastelResult");
  if (el) el.innerHTML = currentBase;
}

// =====================
// COLOUR HARMONY
// =====================

function spinComplementary() {
  const el = document.getElementById("complementaryResult");
  if (!el) return;

  const c = parseInt(currentBase.slice(1), 16);
  const comp = "#" + (0xffffff ^ c).toString(16).padStart(6, "0");

  el.innerHTML = comp;
}

function spinAnalogous() {
  const el = document.getElementById("analogousResult");
  if (!el) return;

  el.innerHTML = currentBase + " + shifted tones";
}

// =====================
// MONOCHROME
// =====================

function spinMonochrome() {
  const el = document.getElementById("monoResult");
  if (!el) return;

  const base = randomHex();

  el.innerHTML =
    shadeColor(base, 50) +
    " " +
    base +
    " " +
    shadeColor(base, -50);
}

// =====================
// TEXTURES
// =====================

const textures = ["denim", "velvet", "leather", "silk", "lace"];

function spinTexture() {
  const el = document.getElementById("textureResult");
  if (!el) return;

  el.innerHTML =
    textures[Math.floor(Math.random() * textures.length)];
}

// =====================
// 🎡 REAL SPIN WHEEL
// =====================

const themes = [
  "Zombie Diner Waitress",
  "Alien Blending In",
  "Runway Apocalypse",
  "Haunted Doll",
  "Popstar Breakdown",
  "Cyberpunk Queen",
  "Ice Empress",
  "Galaxy Girl",
  "Barbie Glitch",
  "Time Traveler 2007",
  "Villain Gala Night",
  "Fairy Chaos"
];

function spinThemeWheel() {
  const wheel = document.getElementById("themeWheel");
  const result = document.getElementById("themeResult");

  if (!wheel || !result || spinning) return;

  spinning = true;
  result.innerHTML = "";

  // sound
  try {
    spinSound.currentTime = 0;
    spinSound.play();
  } catch (e) {
    // ignore audio errors (browser blocking)
  }

  const index = Math.floor(Math.random() * themes.length);
  const degPerItem = 360 / themes.length;

  rotation += 5 * 360 + index * degPerItem;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const div = document.createElement("div");
    div.className = "theme-card";
    div.textContent = themes[index];

    result.appendChild(div);
    spinning = false;
  }, 3000);
}

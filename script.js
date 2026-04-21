let currentBase = "#ff0000";

/* =========================
   COLORS
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

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
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
   BASE + HARMONY
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

function spinAnalogous() {
  const base = randomHex();
  const c = parseInt(base.slice(1), 16);

  const c1 = "#" + ((c + 0x202020) & 0xffffff).toString(16).padStart(6, "0");
  const c2 = "#" + ((c - 0x202020) & 0xffffff).toString(16).padStart(6, "0");

  renderMultiple("analogousResult", [c1, c2]);
}

function spinMonochrome() {
  const base = randomHex();

  const shade = (hex, p) => {
    let n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + p;
    let g = ((n >> 8) & 255) + p;
    let b = (n & 255) + p;

    return rgbToHex({
      r: Math.min(255, Math.max(0, r)),
      g: Math.min(255, Math.max(0, g)),
      b: Math.min(255, Math.max(0, b))
    });
  };

  renderMultiple("monoResult", [
    shade(base, 50),
    base,
    shade(base, -50)
  ]);
}

/* =========================
   TEXTURES
========================= */

const textures = [
  "denim", "velvet", "leather", "silk", "lace",
  "satin", "fur", "mesh", "suede", "knit",
  "linen", "corduroy", "chiffon", "tweed", "organza"
];

function spinTexture() {
  document.getElementById("textureResult").innerHTML =
    `<div class="texture-card">${textures[Math.floor(Math.random() * textures.length)]}</div>`;
}

/* =========================
   🎡 FULL GLOBAL FASHION + DRESS TO IMPRESS WHEEL
========================= */

const themes = [
  // chaotic fashion fantasy
  "Zombie Diner Waitress",
  "Alien Trying to Blend In",
  "Runway Apocalypse",
  "Haunted Doll Escaped",
  "Popstar Breakup Era",
  "Villain at Gala",
  "Fallen Angel",
  "Cursed Royalty",
  "Reality TV Star Meltdown",
  "Barbie Glitch Core",
  "Cyberpunk Neon Diva",
  "Ice Queen Couture",
  "Fire Goddess Look",
  "Galaxy Girl Aesthetic",
  "Clowncore Glam",
  "Witch in Paris",
  "Royal Vampire Ball",
  "Disco Apocalypse",

  // dress to impress / modern aesthetics
  "Clean Girl Aesthetic",
  "Old Money Elegance",
  "Coquette Soft Pink Look",
  "Baddie Streetwear Fit",
  "Model Off Duty Look",
  "Pinterest Baddie Core",
  "Minimalist Chic Outfit",
  "Y2K Pop Star Outfit",
  "Grunge Revival Fit",
  "Dark Academia Scholar",
  "Light Academia Soft Look",
  "Cottagecore Dream Dress",
  "Fairycore Garden Outfit",
  "Angelcore White Fit",
  "Soft Goth Aesthetic",
  "E-Girl TikTok Fit",
  "E-Boy Street Style",
  "Skater Girl Casual Fit",

  // global fashion inspiration
  "Harajuku Tokyo Street Style",
  "K-Pop Idol Stage Outfit",
  "Seoul Street Fashion Chic",
  "Paris Haute Couture Look",
  "Italian Luxury Street Style",
  "London Indie Sleaze Outfit",
  "New York Streetwear Fit",
  "Dubai Luxury Glam Look",
  "Mumbai Bollywood Glam",
  "African Ankara Modern Fashion",
  "Middle Eastern Royal Elegance",
  "Scandinavian Minimal Style"
];

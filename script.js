let currentBase = "#ff0000";
let spinning = false;
let rotation = 0;

const spinSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

/* COLORS */
function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6,"0");
}

function pastelHex() {
  const r = Math.floor(Math.random()*127+128);
  const g = Math.floor(Math.random()*127+128);
  const b = Math.floor(Math.random()*127+128);
  return rgbToHex({r,g,b});
}

function shadeColor(hex,p){
  let n=parseInt(hex.slice(1),16);
  let r=(n>>16)+p;
  let g=((n>>8)&255)+p;
  let b=(n&255)+p;
  return rgbToHex({
    r:Math.min(255,Math.max(0,r)),
    g:Math.min(255,Math.max(0,g)),
    b:Math.min(255,Math.max(0,b))
  });
}

function rgbToHex({r,g,b}){
  return "#" + [r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
}

/* BASE */
function spinBase(){
  currentBase=randomHex();
  document.getElementById("baseResult").innerHTML=currentBase;
}

function spinPastel(){
  currentBase=pastelHex();
  document.getElementById("pastelResult").innerHTML=currentBase;
}

function spinComplementary(){
  const c=parseInt(currentBase.slice(1),16);
  document.getElementById("complementaryResult").innerHTML =
    "#" + (0xffffff ^ c).toString(16).padStart(6,"0");
}

function spinAnalogous(){
  document.getElementById("analogousResult").innerHTML=currentBase;
}

function spinMonochrome(){
  const b=randomHex();
  document.getElementById("monoResult").innerHTML =
    shadeColor(b,50)+" "+b+" "+shadeColor(b,-50);
}

const textures=["denim","velvet","leather","silk","lace"];
function spinTexture(){
  document.getElementById("textureResult").innerHTML =
    textures[Math.floor(Math.random()*textures.length)];
}

/* 🎡 WHEEL */
const themes=[
  "Zombie Diner",
  "Alien Blend In",
  "Runway Apocalypse",
  "Haunted Doll",
  "Popstar Breakdown",
  "Cyberpunk Queen",
  "Ice Empress",
  "Galaxy Girl",
  "Barbie Glitch"
];

function spinThemeWheel(){
  if(spinning)return;
  spinning=true;

  const wheel=document.getElementById("themeWheel");
  const result=document.getElementById("themeResult");

  const index=Math.floor(Math.random()*themes.length);
  const angle=360/themes.length;

  rotation+=5*360+index*angle;

  wheel.style.transform=`rotate(${rotation}deg)`;

  setTimeout(()=>{
    result.innerHTML=`<div class="theme-card">${themes[index]}</div>`;
    spinning=false;
  },4000);
}

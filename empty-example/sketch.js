//// character
let img;
///// end-character

let currentScene;
let landScene;
let shopScene;

let mineralTexture;
let foodTexture;
let treeTexture;
function preload(){
  landScene = new Scene();
  shopScene = new ShopScene();
  landScene.grassTexture = loadImage('../addons/grass.JPG');
  img = loadImage('../addons/character.png');
  treeTexture = loadImage('../addons/tree.png');
  landScene.treeTexture = treeTexture; 
  mineralTexture = loadImage('../addons/minerals.png');
  landScene.mineralTexture = mineralTexture;
  foodTexture = loadImage('../addons/food.png');
  landScene.shopTexture = loadImage('../addons/shop.png');
  landScene.wolfTexture = loadImage('../addons/wolf.png');
  shopScene.shopFloorTexture = loadImage('../addons/woodenfloor.JPG');
  shopScene.img = loadImage('../addons/character.png');
}

function setup() {
  createCanvas(1400, 400);
  currentScene = landScene;
}

function draw(){
  currentScene.draw();
}

setInterval(() => {
  currentScene.physics();
}, 1000/60);

setInterval(() => {
  currentScene.gathering();
}, 1000);

document.getElementsByTagName('html')[0].onkeydown = (event) => {
  if(!currentScene.keysDown.includes(event.code)) {
    currentScene.keysDown.push(event.code);
  }
}

document.getElementsByTagName('html')[0].onkeyup = (event) => {
  if(currentScene.keysDown.includes(event.code)) {
    currentScene.keysDown.splice(currentScene.keysDown.indexOf(event.code), 1);
  }
}

function colides(x,y,h,w,xTree,yTree,hTree,wTree){
  if(x+w < xTree || x > xTree + wTree) return false;
  if(y+h < yTree || y > yTree + hTree) return false;
  return true;
}



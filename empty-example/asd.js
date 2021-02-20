class Scene() {
    constructor(draw, physics sdf) {
        this.draw = draw; 
        this.physics = physics;
    }
}


/////

function landDraw() {

}

function landPhysics() {
    
}

function landinterval() {

}
let landScene = new Scene(landDraw, landPhysics, landInterval);
///

draw(){
    currentScene.draw();
}

setInterval(() => {
    currentScene.physics();
}, 1000/60)

setInterval(() => {
    currentScene.interval();
}, 1000)

///
//InputManager.js

let input = {
    keysPressed: [],
    get = (key) => {
        return input.keysPressed.contains(key);
    }
}
document.getElementsByTagName('html')[0].onkeydown = (event) => {
    if(!input.keysPressed.contains(event.key))
    {
        input.keysPressed.push(event.key);
    }
}

document.getElementsByTagName('html')[0].onkeyup = (event) => {
    input.keysPressed.splice(input.keysPressed.indexOf(event.key), 1);
}


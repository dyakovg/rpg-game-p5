let zoom = 100;
let camX = 0;
let camY = 0;
function setup() {
    let canvas = createCanvas(300, 300);
}

function draw() {
    for(let y = 0; y < 300; y++) {
        for(let x = 0; x < 300; x++) {
            let height = noise((x + camX)/zoom, (y + camY)/zoom);
            let heightVal = Math.floor(height * 25) * 10;

            let ring = 0;

            if(Math.floor(height * 255) % 10 == 0) {
                ring = 60;
            }

            let c = color(100 + height*80 - ring, 200 + height*80 - ring, 100 + height*80 - ring);
            if(heightVal < 83) {
                c = color(50 + height*80 - ring, 50 + height*80 - ring, 220 + height*80 - ring);
            } 
            if(heightVal > 150) {
                c = color(128 + height*80 - ring);
            }
            if(heightVal > 200) {
                c = color(220 + height*80 - ring);
            }

            
            fill(c);
            noStroke();
            rect(x, y, 1, 1);
        }
    }
}

document.getElementsByTagName('html')[0].onkeydown = (evt) => {
    if(evt.key == 'w') {
        camY -= 20;
    }
    if(evt.key == 'a') {
        camX -= 20;
    }
    if(evt.key == 's') {
        camY += 20;
    }
    if(evt.key == 'd') {
        camX += 20;
    }
}
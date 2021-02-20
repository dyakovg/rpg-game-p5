let resources = {
    action: 'Idle',
    wood: 100,
    minerals: 100,
    food:100,

    draw: () => {
        resources.shadowText(`Current action: ${resources.action}`, 50,50);
        resources.shadowText(`${resources.wood}`, 50,75);
        image(treeTexture, 25,50,25,25);
        resources.shadowText(`${resources.minerals}`, 50,100);
        image(mineralTexture, 25,75,25,25);
        resources.shadowText(`${resources.food}`, 50,125);
        image(foodTexture, 25,100,25,25);
    },

    shadowText: (string, x, y) => {
        textSize(24);
        fill(0,0,0);
        text(string, x+1, y+1);
        fill(255);
        text(string, x, y);
    }

}   

let statistics = {
    health: 100,
    mana: 100,
    armour: 0,

    draw: () => {
        statistics.shadowText(`Health: ${statistics.health}`, currentScene.x, currentScene.y);
    },

    shadowText: (string, x, y) => {
        textSize(10);
        fill(0,0,0);
        text(string, x+1, y+1);
        fill(255);
        text(string, x, y);
    }
    
}

let wolf = {
    health: 50,
    damage: 3,

    draw: () => {
        wolf.shadowText(`Health: ${wolf.health}`, currentScene.xWolf,currentScene.yWolf);
    },
    shadowText: (string, x, y) => {
        textSize(10);
        fill(0,0,0);
        text(string, x+1, y+1);
        fill(255);
        text(string, x, y);
    }
}


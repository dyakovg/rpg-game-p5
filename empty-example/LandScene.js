class Scene {
    constructor(){
        //// character
        this.x = 200;
        this.y = 200;
        this.w = 50;
        this.h = 50*1.48;
        ///// end-character

        //// grass
        this.xFloor = 0;
        this.yFloor = 300;
        this.grassTexture;
        //// end-grass

        //// tree
        this.xTree = 400;
        this.yTree = 100;
        this.hTree = 200;
        this.wTree = 300; 
        this.treeTexture;
        //// end-tree

        //// gravity
        this.gravity = 5;
        this.velocity = 0;
        this.velocityx = 0;
        this.maxSpeed = 10;
        //// end-gravity

        //// minerals
        // this.mineralTexture;
        this.xMinerals = 800;
        this.yMinerals = 200;
        this.hMinerals = 100;
        this.wMinerals = 50;
        //// end-minerals

        /// food
        // this.foodTexture;
        /// end-food

        /// shop
        // let shopTexture;
        this.xShop = 1000;
        this.hShop = 300;
        this.yShop = this.yFloor-this.hShop;
        this.wShop = 300;
        //door
        this.xDoor = this.xShop+70;
        this.yDoor = this.yShop+200;
        this.hDoor = this.hShop-200;
        this.wDoor = this.wShop-240;
        // end-door
        /// end-shop

        /// wolf
        // let wolfTexture;
        this.xWolf = 300;
        this.yWolf = 250;
        this.hWolf = 50;
        this.wWolf = 50;
        /// end-wolf

        this.onGround = true;
        this.keysDown = [];
    }
    draw(){
        
        background(220);
        
        // grass
        fill(0,200,0);
        noStroke();
        rect(this.xFloor, this.yFloor, 1400, 100);
        let grassx = 0;
        while(grassx < 1400) {
            image(this.grassTexture, grassx, this.yFloor, 100, 100);
            grassx += 100;
        }

        // tree
        noFill();
        stroke(0);
        strokeWeight(1);
        image(this.treeTexture, this.xTree, this.yTree, this.wTree, this.hTree);

        //sketch for tree
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.xTree, this.yTree, this.wTree, this.hTree);

        // minerals
        noFill();
        stroke(0);
        strokeWeight(1);
        image(this.mineralTexture, this.xMinerals, this.yMinerals, this.wMinerals, this.hMinerals );

        // sketch for minerals
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.xMinerals, this.yMinerals, 50,100);

        // shop
        noFill();
        stroke(0);
        strokeWeight(1);
        image(this.shopTexture, this.xShop, this.yShop, this.wShop, this.hShop);
        // end-shop

        // sketch for door
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.xDoor, this.yDoor, this.wDoor, this.hDoor);
        // end-sketch for door

        // wolf
        noFill();
        stroke(0);
        strokeWeight(1);
        image(this.wolfTexture, this.xWolf, this.yWolf, this.wWolf, this.hWolf);
        // end-wolf

        // character
        fill(100,2,0);
        image(img, this.x, this.y, this.w, this.h);

        // sketch for character
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.w, this.h);

        resources.draw();
        statistics.draw();
        wolf.draw();
    }

    physics() {
        this.input();
        this.y += this.velocity;
        this.velocity+= 0.1;

        let drag = 0;
        if(this.onGround) drag = 0.8;
        else drag = 0.1;

        if(this.velocityx < -0.3) {
            this.velocityx += drag;
        } else if(this.velocityx > 0.3) {
            this.velocityx -= drag;
        } else {
            this.velocityx = 0;
        }

        if(this.velocity >= this.gravity) {
            this.velocity = this.gravity;
        }

        if(this.y+this.h > this.yFloor-15) {
            this.onGround = true;
        } else {
            this.onGround = false; 
        }
        if(this.y+this.h >= this.yFloor) {
            this.velocity = 0;
        }

        if(this.velocityx > this.maxSpeed) {
            this.velocityx = this.maxSpeed
        }
        else if(this.velocityx < this.maxSpeed*-1) {
            this.velocityx = -1 * this.maxSpeed;
        }

        this.move(this.velocityx, this.velocity);

        //Constraint checks for character and grass
        if(this.y+this.h >= this.yFloor)
        {
            this.y = this.yFloor-this.h;
        }
        else 
        {
            this.y = this.y + 10;
        } 

        if(this.x < 0) {
            this.x = 0;
        }

        if(this.x > 1400-this.w) {
            this.x = 1400-this.w;
        }   
    }

    gathering(){
        /// gathering resources
        if(colides(this.x,this.y,this.h,this.w,this.xTree,this.yTree,this.hTree,this.wTree) == true)
        {
            resources.action = 'Gathering wood';
            resources.wood++;
        }
        else if(colides(this.x,this.y,this.h,this.w,this.xMinerals,this.yMinerals,this.hMinerals,this.wMinerals) == true){
            resources.action = 'Gathering minerals';
            resources.minerals++;
        }
        ////end-gathering resources
        //// returning home
        else if(colides(this.x,this.y,this.h,this.w,this.xDoor,this.yDoor,this.hDoor,this.wDoor) == true){
            resources.action = 'In home';
            currentScene = shopScene;
        }
        //// end-returning home
        else{
            resources.action = 'Idle';
        }
    }

    input() {
        if(this.keysDown.includes('ArrowUp')) {
          if(this.onGround)
          this.jump();
        }
      
        if(this.keysDown.includes('ArrowLeft')) {
            this.addVelocity(-3, 0);
        }
      
        if(this.keysDown.includes('ArrowRight')) {
            this.addVelocity(3, 0);
        }
      }
      
      addVelocity(velx, vely) {
        this.velocityx += velx;
        this.velocity += vely;
      }
      
      jump() {
        this.velocity = -7;
      }
      
      move(right, down) {
        this.x += right;
        this.y += down;
      }
      
}

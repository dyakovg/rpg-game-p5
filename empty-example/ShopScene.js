class ShopScene {
    constructor() {
        ///shopFloor
        this.shopFloorx = 0;
        this.shopFloory = 300;
        this.shopFloorTexture;
        /// end-shopFloor
        //// character
        this.x = 200;
        this.y = 200;
        this.w = 50;
        this.h = 50*1.48;
        ///// end-character
        //// gravity
        this.gravity = 5;
        this.velocity = 0;
        this.velocityx = 0;
        this.maxSpeed = 10;
        //// end-gravity
    }
    draw(){
        background(220);
        // flooring
        fill(0,200,0);
        noStroke();
        rect(this.shopFloorx, this.shopFloory, 1400, 100);
        let parketx = 0;
        while(parketx < 1400) {
            image(this.shopFloorTexture, parketx, this.shopFloory, 100, 100);
            parketx += 100;
        }
        // end-flooring

        fill(100,2,0);
        image(this.img, this.x, this.y, this.w, this.h);


        this.onGround = true;
        this.keysDown = [];
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
        if(this.y+this.h >= this.shopFloory)
        {
            this.y = this.shopFloory-this.h;
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
class Sprite{
    constructor(config){

        //set ip the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () =>{
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = true;
        if(this.useShadow){
            this.shadow.src = "IMG/characters/shadow.png";
        }

        this.shadow.onload = () =>{
            this.isShadowLoaded = true; 
        }


        //configure animation & initial state
        this.animations = config.animations || {
            "idle-Down":[ [0,0] ],
            "walkDown":[ [1,0],[0,0],[3,0],[0,0]]
        }
        this.currentAnimation = config.currentAnimation || "idle-Down";
        this.currentAnimationFrame = 0;

        this.animationsFramelimit = config.animationFramelimit || 16;
        this.animationFrameProgress = this.animationFramelimit;

        //Reference the game object
        this.gameObject = config.gameObject;    
    }

    get frame(){
        return this.animations[this.currentAnimation]
    }


    draw(ctx){
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x,y )

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,y,
            32,32
        )
    }
}
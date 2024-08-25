class Person extends GameObject{
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 64;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["y", 1],    
        }
    }

    update(state){
        this.updatePosition();
    }

    updatePosition(){
        if(this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1; 
        }
    }
}
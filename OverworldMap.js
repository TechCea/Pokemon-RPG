class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
      this.walls = config.walls || {

      }
  
      this.lowerImage = new Image(); // Corrige LowerImage a lowerImage
      this.lowerImage.src = config.LowerSrc;
  
      this.upperImage = new Image(); // Corrige UpperImage a upperImage
      this.upperImage.src = config.UpperSrc;
    }
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(this.lowerImage, 
        utils.widthGrid(10.5) - cameraPerson.x,
        utils.widthGrid(6) - cameraPerson.y
       ) // Usa ctx.drawImage
    }
  
    drawUpperImage(ctx, cameraPerson) {
      ctx.drawImage(this.upperImage, 
        utils.widthGrid(10.5) - cameraPerson.x,
        utils.widthGrid(6) - cameraPerson.y
        ) 
    }

    isSpaceTaken(currentX, currentY, direction){
      const {x,y} = utils.nextPosition(currentX, currentY, direction);
      return this.walls[`${x},${y}`] || false;
    }


    addWall(x,y){
      this.walls[`${x},${y}`] = true;
    }
    RemoveWall(x,y){
      delete this.walls[`${x},${y}`] 
    }
    moveWall(wasX, wasY, direction){
      this.RemoveWall(wasX, wasY);
      const {x,y} = utils.nextPosition(wasX, wasY, direction);
      this.addWall(x,y);
    }
  }
  
  
  window.OverworldMaps = {
    DemoRoom: {
      LowerSrc: "IMG/maps/DemoLower.png",
      UpperSrc: "IMG/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.widthGrid(3),
          y: utils.widthGrid(5),
        }),
        npc1: new Person({
          x: utils.widthGrid(6),
          y: utils.widthGrid(6),
         src: "IMG/characters/people/npcpoke.png"
        })
      },
      walls:{
        //"16,16": true
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(8,7)] : true
      }
    },
    Kitchen: {
      LowerSrc: "IMG/maps/KitchenLower.png",
      UpperSrc: "IMG/maps/KitchenUpper.png",
      gameObjects: {
        hero: new GameObject({
          x: 3,
          y: 5,
        }),
        npc1: new GameObject({
          x: 9,
          y: 6,
          src: "IMG/characters/people/npcpoke.png"
        }),
        npc2: new GameObject({
          x: 10,
          y: 4,
          src: "IMG/characters/people/npc1.png"
        })
      }
    }
  };
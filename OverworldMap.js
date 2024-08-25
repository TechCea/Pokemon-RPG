class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
  
      this.lowerImage = new Image(); // Corrige LowerImage a lowerImage
      this.lowerImage.src = config.LowerSrc;
  
      this.upperImage = new Image(); // Corrige UpperImage a upperImage
      this.upperImage.src = config.UpperSrc;
    }
  
    drawLowerImage(ctx) {
      ctx.drawImage(this.lowerImage, 0, 0); // Usa ctx.drawImage
    }
  
    drawUpperImage(ctx) {
      ctx.drawImage(this.upperImage, 0, 0); // Usa ctx.drawImage
    }
  }
  
  window.OverworldMaps = {
    DemoRoom: {
      LowerSrc: "IMG/maps/DemoLower.png",
      UpperSrc: "IMG/maps/DemoUpper.png",
      gameObjects: {
        hero: new GameObject({
          x: utils.widthGrid(3),
          y: utils.widthGrid(5),
        }),
        //npc1: new GameObject({
        //  x: 50,
        //  y: 21,
        // src: "IMG/characters/people/npcpoke.png"
        //})
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
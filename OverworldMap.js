class OverworldMap {
    constructor(config) {
      this.overworld = null;
      this.gameObjects = config.gameObjects;
      this.cutsceneSpaces = config.cutsceneSpaces || {};
      this.walls = config.walls || {};
  
      this.lowerImage = new Image(); // Corrige LowerImage a lowerImage
      this.lowerImage.src = config.LowerSrc;
  
      this.upperImage = new Image(); // Corrige UpperImage a upperImage
      this.upperImage.src = config.UpperSrc;

      this.isCutscenePlaying = false;
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


    mountObjects(){
      Object.keys(this.gameObjects).forEach(key =>{

        let object = this.gameObjects[key];
        object.id = key;

        object.mount(this);
      })
    }

    async startCutscene(events){
      this.isCutscenePlaying = true;

      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map:this,
        })
        await eventHandler.init();
      }

      this.isCutscenePlaying = false;

      //Reset NPC'S to do deir idle behavior
      Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))

    }

    
    checkForActionCutscene(){
      const hero = this.gameObjects["hero"];
      const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
      const match = Object.values(this.gameObjects).find(object =>{
        return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
      });
      if (!this.isCutscenePlaying && match && match.talking.length){
        this.startCutscene(match.talking[0].events)
      }
    }

    checkForFootstepCutscene(){
      const hero = this.gameObjects["hero"];
      const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
      if (!this.isCutscenePlaying && match){
        this.startCutscene (match[0].events )
      }
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
          x: utils.widthGrid(5),
          y: utils.widthGrid(7),
        }),
        npcA: new Person({
          x: utils.widthGrid(8),
          y: utils.widthGrid(9),
         src: "IMG/characters/people/FalkernN.png",
         behaviorLoop:[
          {type: "stand", direction: "left", time: 800},
          {type: "stand", direction: "up", time: 800},
          {type: "stand", direction: "right", time: 1200},
          {type: "stand", direction: "up", time: 800},
         ],
         talking: [
          {
            events: [
              { type: "textMessage", text: "Bahaha!", faceHero: "npcB" },
              { type: "battle", enemyId: "falkern" }
            ]
          }
        ]
        }),
        npcB: new Person({
          x: utils.widthGrid(8),
          y: utils.widthGrid(5),
         src: "IMG/characters/people/BrunoN.png",
         //behaviorLoop: [
          //{type: "walk", direction: "left"},
          //{type: "stand", direction: "up", time: 800},
          //{type: "walk", direction: "up"},
          //{type: "walk", direction: "right"},
          //{type: "walk", direction: "down"},
         //]
         talking: [
          {
            events: [
              { type: "textMessage", text: "Bahaha!", faceHero: "npcB" },
              { type: "battle", enemyId: "bruno" }
            ]
          }
        ]
        })
      },
      walls:{
        //"16,16": true
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(8,7)] : true
      },
      cutsceneSpaces: {
        [utils.asGridCoord(7,4)] : [
          {
            events: [
              { who: "npcB", type: "walk", direction: "left"},
              { who: "npcB", type: "stand", direction: "up", time: 100},
              { type: "textMessage", text: "Regresa"},
              { who: "npcB", type: "walk", direction: "right"},
              { who: "npcB", type: "stand", direction: "down"},
              { who: "hero", type: "walk", direction: "down"},
              { who: "hero", type: "walk", direction: "left"},
            ]
          }
        ],
        [utils.asGridCoord(5,10)] : [
          {
            events :[
              { type: "changeMap", map: "Kitchen"}
            ]
          }
        ]
      }
    },
    Kitchen: {
      LowerSrc: "IMG/maps/KitchenLower.png",
      UpperSrc: "IMG/maps/KitchenUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.widthGrid(3),
          y: utils.widthGrid(5),
        }),
        npcB: new Person({
          x: utils.widthGrid(10),
          y: utils.widthGrid(8),
          src: "IMG/characters/people/npcpoke.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "Yepiiiiiii!!!", faceHero: "npcB"},

              ]
            },
           ]
        })
      }
    }
  };
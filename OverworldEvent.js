class OverworlEvent{
    constructor({map ,event}){
        this.map = map;
        this.event = event;
    }

    stand(resolve){
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = e =>{
            if (e.detail.whoId === this.event.who) { 
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve){
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        const completeHandler = e =>{
            if (e.detail.whoId === this.event.who) { 
                document.removeEventListener("PersonWalkinComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkinComplete", completeHandler)

    }

    init(){
        return new Promise(resolve =>{
            this[this.event.type](resolve)
        })
    }
}
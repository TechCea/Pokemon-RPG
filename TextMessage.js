class TextMessage{
    constructor({ text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement(){
        //create the elemten
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `)
            this.element.querySelector("button").addEventListener("click", () =>{

            })
    }

    init(container){
        this.createElement();
        container.appendChild(this.element)
    }
}
class Team {
    constructor(team, name) {
      this.team = team;
      this.name = name;
      this.combatants = [];
    }
  
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Team");
        this.element.setAttribute("data-team", this.team);
        this.combatants.forEach(c => {
          let icon = document.createElement("div");
          icon.setAttribute("data-combatant", c.id);
          icon.innerHTML = (`
            <img src="IMG/icons/PokeballL.png" alt="Pokeball" class="pokeball-icon" />
            <img src="IMG/icons/PokeDeath.png" alt="Dead Pokeball" class="pokeball-icon dead-pokeball" />
          `)
          // Add to parent element
          this.element.appendChild(icon)
        })
      }
     
  
    update() {
      this.combatants.forEach(c => {
        const icon = this.element.querySelector(`[data-combatant="${c.id}"]`)
        icon.setAttribute("data-dead", c.hp <= 0 );
        icon.setAttribute("data-active", c.isActive );
      })
    }
  
    init(container) {
      this.createElement();
      this.update();
      container.appendChild(this.element);
    }
  }
class Hud {
  constructor() {
    this.scoreboards = [];
  }

  update() {
    this.scoreboards.forEach(s => {
      const pizza = window.playerState.pizzas[s.id];
      // Cambiar el ícono dependiendo del estado del juego
      let icon;
      if (window.isInCombat) {
        icon = Pizzas[pizza.pizzaId].combatant_type;
      } else if (window.isInOverworld) {
        icon = Pizzas[pizza.pizzaId].hudIcon; // Ícono del HUD // Ícono del overworld
      } 
      s.update({ ...pizza, icon });
    });
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Hud");

    const { playerState } = window;
    playerState.lineup.forEach(key => {
      const pizza = playerState.pizzas[key];
      const scoreboard = new Combatant({
        id: key,
        ...Pizzas[pizza.pizzaId],
        ...pizza,
        icon: window.isInCombat
          ? Pizzas[pizza.pizzaId].combatant_type
          : (window.isInOverworld
            ? Pizzas[pizza.pizzaId].overworldIcon
            : Pizzas[pizza.pizzaId].hudIcon),
      }, null);
      scoreboard.createElement();
      this.scoreboards.push(scoreboard);
      this.element.appendChild(scoreboard.hudElement);
    });
    this.update();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    document.addEventListener("PlayerStateUpdated", () => {
      this.update();
    });
  }
}

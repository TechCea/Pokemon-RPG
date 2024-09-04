window.PizzaTypes = {
    normal: "normal",
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill",
  }
  
  window.Pizzas = {
    "s001": {
      name: "Gengar",
      type: PizzaTypes.spicy,
      src: "IMG/Pokemons/GengarB.gif",
      icon: "IMG/icons/Ghost.png",
      hudIcon: "IMG/icons/GengarHUD.gif", // Ícono del HUD
      actions: [ "saucyStatus", "clumsyStatus", "damage1" ],
    },
    "s002": {
    name: "Dratiny",
    description: "A salty warrior who fears nothing",
    type: PizzaTypes.spicy,
    src: "IMG/Pokemons/Datiny.gif",
    icon: "IMG/icons/Dragon.png",
    actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
    },
    "s003": {
      name: "Gastly",
      type: PizzaTypes.spicy,
      src: "IMG/Pokemons/Gastly.gif",
      icon: "IMG/icons/Ghost.png",
      hudIcon: "IMG/icons/GastlyHUD.gif", // Ícono del HUD
      actions: [ "saucyStatus", "clumsyStatus", "damage1" ],
    },
    "v001": {
      name: "Chandelure",
      type: PizzaTypes.veggie,
      src: "IMG/Pokemons/GengarB.gif",
      icon: "IMG/icons/veggie.png",
      actions: [ "damage1" ],
    },
    "f001": {
      name: "Lickwict",
      type: PizzaTypes.fungi,
      src: "IMG/Pokemons/Datiny.gif",
      icon: "IMG/icons/Ice.png",
      actions: [ "damage1" ],
    },
    "P001": {
      name: "Charmander",
      type: PizzaTypes.fungi,
      src: "IMG/Pokemons/CharmanderF.gif",
      icon: "IMG/icons/Fire.png",
      hudIcon: "IMG/icons/CharmanderHUD.gif", // Ícono del HUD
      actions: [ "damage1" ],
    }
  }
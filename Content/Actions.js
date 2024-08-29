window.Actions = {
    damage1: {
      name: "Shadow Ball!",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
        { type: "animation", animation: "spin"},
        { type: "stateChange", damage: 10}
      ]
    }
  }
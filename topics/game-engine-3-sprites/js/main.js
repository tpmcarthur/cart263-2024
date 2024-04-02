"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    //scene(s) will be in array, each will be in a class(separate)
    scene: [Boot, Play]
};

let game = new Phaser.Game(config);
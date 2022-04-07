let config = {
    width: 640,
    height: 480,
    type: Phaser.CANVAS,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
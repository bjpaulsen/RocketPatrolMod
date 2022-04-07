let config = {
    width: 640,
    height: 480,
    type: Phaser.CANVAS,
    scene: [Menu, Play],
}

let borderUISize = 20;
let borderPadding = 20;

let game = new Phaser.Game(config);
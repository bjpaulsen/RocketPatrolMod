// Benjamin Paulsen
// RocketPatrolMod
// 4/20/22, ~15 hours

// POINTS BREAKDOWN
// - Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
// - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
// - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
// - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// - Implement parallax scrolling (10)
// - Add your own (copyright-free) background music to the Play scene (5)
// - Implement the speed increase that happens after 30 seconds in the original game (5)
// TOTAL: 100

// CREDIT
// Got advice from Salil Tantamajarik on how to implement a dynamic timer. See Play.js line 84


let config = {
    width: 640,
    height: 480,
    type: Phaser.CANVAS,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

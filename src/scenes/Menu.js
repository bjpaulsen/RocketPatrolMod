class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }

    create() {
        let menuText = this.add.text(300, 240, "menu here");
        menuText.setOrigin(.5, .5);
        this.scene.start("play");
    }
}
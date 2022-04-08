class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("spaceship", "assets/spaceship.png");
        this.load.image("rocket", "assets/rocket.png");
    }

    create() {
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);

        this.add.sprite(game.config.width/2, 200, 'spaceship');
    }

    update() {
        // this.starfield.tilePositionX -= 4;
        let rocketSpeed = 4;
        if (keyLEFT.isDown)
            this.p1Rocket.x -= rocketSpeed
        if (keyRIGHT.isDown)
            this.p1Rocket.x += rocketSpeed
        
        if (Phaser.Input.Keyboard.JustDown(keyF))
            this.p1Rocket.isFiring = true;

        this.p1Rocket.update();
    }
}
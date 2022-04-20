class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("starfield_parallax", "assets/starfield_parallax.png");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("spaceship", "assets/spaceship.png");
        this.load.image("small_spaceship", "assets/small_spaceship.png");
        this.load.image("particle", "assets/particle.png");
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        // load music
        this.load.audio("music", ["./assets/song_for_rocket_patrol.mp3"]);
    }

    create() {
        // start music
        this.music = this.sound.add("music", { loop: true });
        this.music.setVolume(1);
        this.music.play();

        this.sfxExplosion = this.sound.add('sfx_explosion');
        this.sfxExplosion.setVolume(.08);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield_parallax = this.add.tileSprite(0, 0, 640, 480, 'starfield_parallax').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // spawn ships
        this.ships = [];
        let numShips = 5;
        for (let i = 0; i < numShips; i++)
            this.ships[i] = new Spaceship(this, game.config.width+borderUISize*i*3, borderUISize*(i+4)+borderPadding*i*2, i%2==0 ? 'spaceship' : 'small_spaceship', i%2==0 ? 'large' : 'small').setOrigin(0,0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding*2, 'rocket').setOrigin(0.5, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize*2 + borderPadding, this.p1Score, this.scoreConfig).setOrigin(.5);

        // GAME OVER flag
        this.gameOver = false;

        // Play clock
        // Help from Salil Tantamajarik
        // change to use config object 
        // this.time.addEvent

        this.timerConfig = {
            delay: game.settings.gameTimer,
            callback: this.endGame,
            callbackScope: this
        };

        this.scoreConfig.fixedWidth = 0;
        this.clock = this.time.addEvent(this.timerConfig);
        
        // Speed-up clock
        this.speedClock = this.time.delayedCall(30000, () => {
            game.settings.speedMultiplier = 1.5;
        }, null, this);

        // Setup clock update loop
        this.timeDisplay = this.add.text(game.config.width - borderUISize*3, borderUISize*2 + borderPadding, this.clock.getOverallRemainingSeconds(), this.scoreConfig).setOrigin(.5);
        this.setClock();
    }

    update() {
        // scroll starfield
        this.starfield.tilePositionX -= 2.25 * game.settings.speedMultiplier;
        this.starfield_parallax.tilePositionX -= 2.75 * game.settings.speedMultiplier;

        if (this.gameOver) { 
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            } else if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }
            
        } else {
            this.p1Rocket.update();
            
            for (let ship of this.ships)
                ship.update();
            
            // check collisions
            for (let ship of this.ships) {
                if (this.checkCollision(this.p1Rocket, ship)) {
                    this.p1Rocket.reset();
                    this.shipExplode(ship);
                }
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        ship.explode();
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 

        let resetTimerConfig = {
            delay: this.clock.getOverallRemaining() + 2000,
            callback: this.endGame,
            callbackScope: this
        };

        this.clock.reset(resetTimerConfig);

        this.sfxExplosion.play();
    }

    setClock() {
        // update clock text
        this.timeDisplay.setText(Math.round(this.clock.getOverallRemainingSeconds()));
        // call this function again later
        this.time.delayedCall(100, this.setClock, null, this);
    }

    endGame() {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }
}
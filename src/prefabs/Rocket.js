class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.horizontalSpeed = 4;

        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if (this.isFiring) {
            this.y -= 10;

            if (this.y < 0) {
                this.reset();
            }
            
        } else {
            // fire button
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx
            }

            if (keyLEFT.isDown && this.x >= borderUISize + this.width)
                this.x -= this.horizontalSpeed;
            if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width)
                this.x += this.horizontalSpeed;
        }
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding*2;
        this.isFiring = false;
    }
    
}
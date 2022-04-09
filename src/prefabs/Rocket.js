class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.horizontalSpeed = 4;

        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if (keyLEFT.isDown)
            this.x -= this.horizontalSpeed;
        if (keyRIGHT.isDown)
            this.x += this.horizontalSpeed;

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        if (this.isFiring) {
            this.y -= 10;

            if (this.y < 0) {
                this.reset();
            }
        }
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
    
}
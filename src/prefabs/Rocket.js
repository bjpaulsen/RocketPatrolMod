class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.isFiring = false;
    }

    update() {
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
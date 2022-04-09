class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.pointValue = 10;
        this.moveSpeed = 1;
    }

    update() {
        this.x -= this.moveSpeed;

        if (this.x < 0) {
            this.x = game.config.width;
        }
    }
    
    reset() {
        this.x = game.config.width;
    }
}
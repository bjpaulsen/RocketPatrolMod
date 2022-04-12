class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type = 'large') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        if (type == 'large'){
            this.points = 10;
            this.moveSpeed = game.settings.spaceshipSpeed;
        } else {
            this.points = 20;
            this.moveSpeed = game.settings.smallSpaceshipSpeed;
        }
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
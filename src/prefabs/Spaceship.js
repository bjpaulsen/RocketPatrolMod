class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type = 'large') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.type = type;
        this.points = type === 'large' ? 10 : 20;
    }

    update() {
        this.x -= game.settings.speedMultiplier * this.type === 'large' ? game.settings.spaceshipSpeed : game.settings.smallSpaceshipSpeed;

        if (this.x < 0) {
            this.x = game.config.width;
        }
    }
    
    reset() {
        this.x = game.config.width;
    }
}
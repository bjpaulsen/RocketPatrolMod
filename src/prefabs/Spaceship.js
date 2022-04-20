class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type = 'large') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.type = type;
        this.points = type === 'large' ? 10 : 20;

        this.particles = scene.add.particles('particle');

        this.emitter = this.particles.createEmitter();

        this.emitter.setSpeed(200);
        this.emitter.setQuantity(30);
        this.emitter.setFrequency(-1);
        this.emitter.setGravity(100, 500);
        this.emitter.startFollow(this);
    }

    update() {
        this.x -= (game.settings.speedMultiplier * (this.type === 'large' ? game.settings.spaceshipSpeed : game.settings.smallSpaceshipSpeed));

        if (this.x < 0) {
            this.x = game.config.width;
        }
    }
    
    reset() {
        this.x = game.config.width;
    }

    explode() {
        this.emitter.explode();
    }
}
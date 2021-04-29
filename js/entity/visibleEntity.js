class VisibleEntity extends entity {

    renderer;

    constructor(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition, renderer) {
        super(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition);
        if (typeof renderer === 'function') {
            this.renderer = renderer;
        }
    }

    tick(time) {
        super.tick(time);
        if (!this.isDead) {
            this.renderer(this, this.xPos, this.yPos, this.space);
        }
    }
}
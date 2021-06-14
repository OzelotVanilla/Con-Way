/**
 * A visible entity.
 */
con_way.visibleEntity = class extends con_way.entity {

    renderer;
    canvas;

    constructor(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition, canvas, renderer) {
        super(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition);
        if (typeof renderer === 'function') {
            this.renderer = renderer;
            this.canvas = canvas;
        }
    }

    tick(time) {
        super.tick(time);
        if (!this.isDead) {
            this.renderer(this, this.xPos, this.yPos, this.space, this.canvas);
        }
    }
}
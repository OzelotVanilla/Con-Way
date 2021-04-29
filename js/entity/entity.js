class entity {

    type;

    xPos;
    yPos;

    xVelocity;
    yVelocity;

    space;

    lastUpdateTime;

    destructorCondition;

    isDead;

    constructor(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition) {
        if (typeof type === 'string'
            && typeof xPos === 'number'
            && typeof yPos === 'number'
            && typeof xVelocity === 'number'
            && typeof yVelocity === 'number'
            && typeof destructorCondition === 'function') {
            this.type = type;
            this.xPos = xPos;
            this.yPos = yPos;
            this.xVelocity = xVelocity;
            this.yVelocity = yVelocity;
            this.space = space;
            this.destructorCondition = destructorCondition;
            lastUpdateTime = new Date().getMilliseconds() / 1000.0;
        }
    }

    getPos(time) {
        var delta = time - lastUpdateTime;
        return this.xPos + delta * this.xVelocity, this.yPos + delta * this.yVelocity;
    }

    tick(time) {
        var delta = time - lastUpdateTime;
        this.xPos, this.yPos = this.xPos + delta * this.xVelocity, this.yPos + delta * this.yVelocity;
        this.lastUpdateTime = time;
        isDead = destructorCondition(this, this.xPos, this.yPos, this.space);
    }
}
class golSpace extends VisibleEntity {

    width;//width and height are the the lengths of the grid of lifegame;
    height;
    sideLength;

    absoluteXPos = 0;//absoluteXPos and absoluteYPos are the position where the golSpace is on the screen;
    absoluteYPos = 0;

    constructor(xPos, yPos, xVelocity, yVelocity, width, height, sideLength, space, destructorCondition) {
        super("golSpace", xPos, yPos, xVelocity, yVelocity, space, destructorCondition, this.render);
        if (typeof width === 'number'
            && typeof height === 'number'
            && typeof sideLength === 'number') {
            this.width = width;
            this.height = height;
            this.sideLength = sideLength;
        }
    }

    tick(time) {
        super.tick(time);
        if (this.space === null) {
            this.absoluteXPos, this.absoluteYPos = space.absoluteXPos + this.xPos, space.absoluteYPos + this.yPos;
        }
    }

    render() {
        // TODO
    }

}
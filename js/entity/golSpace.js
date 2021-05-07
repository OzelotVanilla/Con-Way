
/**
 * Game of life Space
 * It can be a background of game, or be contained
 * @author MagicStone
 */
class golSpace extends visibleEntity {

    /**
     * Width of the grid of this entity. Unit is (Pixel).
     */
    width;

    /**
     * Height of the grid of this entity. Unit is (Pixel).
     */
    height;
    sideLength;

    absoluteXPos = 0;//absoluteXPos and absoluteYPos are the position where the golSpace is on the screen;
    absoluteYPos = 0;

    constructor(xPos, yPos, xVelocity, yVelocity, width, height, sideLength, space, canvas, destructorCondition) {
        super("golSpace", xPos, yPos, xVelocity, yVelocity, space, destructorCondition, canvas, this.render);
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
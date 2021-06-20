import { entity } from "./entity";
import { visibleEntity } from "./visibleEntity";
import { render } from "../gamecycle/render";

/**
 * Game of life Space
 * It can be a background of game, or be contained
 * @author MagicStone
 */
export class golSpace extends visibleEntity {

    /**
     * Width of the grid of this entity. Unit is (grid).
     */
    width: number;

    /**
     * Height of the grid of this entity. Unit is (grid).
     */
    height: number;

    sideLength: number;

    absoluteXPos: number = 0; //absoluteXPos and absoluteYPos are the position where the golSpace is on the screen;
    absoluteYPos: number = 0; //absoluteYPos

    constructor(xPos: number, yPos: number, xVelocity: number, yVelocity: number, width: number, height: number, sideLength: number,
        space: golSpace, canvas: HTMLCanvasElement,
        destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean) {
        super("golSpace", xPos, yPos, xVelocity, yVelocity, space, destructorCondition, canvas, render);

        this.width = width;
        this.height = height;
        this.sideLength = sideLength;
    }

    tick(time: number) {
        super.tick(time);
        if (this.space === null) {
            this.absoluteXPos, this.absoluteYPos =
                (this.space.absoluteXPos + this.xPos * this.sideLength), (this.space.absoluteYPos + this.yPos * this.sideLength);
        }
    }
}
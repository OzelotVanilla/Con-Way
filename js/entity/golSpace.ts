import { entity } from "./entity";
import { visibleEntity } from "./visibleEntity";
import { render } from "../gamecycle/render";
import { loopgrid } from "../container/loopgrid";
import { doublegrid } from "../container/doublegrid";

/**
 * Game of life Space
 * It can be a background of game, or be contained
 * @author MagicStone
 */
export class golSpace extends visibleEntity
{

    /**
     * Width of the grid of this entity. Unit is (grid).
     */
    width: number;

    /**
     * Height of the grid of this entity. Unit is (grid).
     */
    height: number;

    sideLength: number;

    grid: doublegrid;

    rule: (grid: loopgrid, x: number, y: number) => boolean;

    absoluteXPos: number = 0; //absoluteXPos and absoluteYPos are the position where the golSpace is on the screen;
    absoluteYPos: number = 0; //absoluteYPos

    constructor(xPos: number, yPos: number, xVelocity: number, yVelocity: number, width: number, height: number, sideLength: number,
        space: golSpace, canvas: CanvasRenderingContext2D,
        destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean,
        rule: (grid: loopgrid, x: number, y: number) => boolean)
    {
        super("golSpace", xPos, yPos, xVelocity, yVelocity, space, false, destructorCondition, canvas, render);

        this.grid = new doublegrid(width, height, (grid: loopgrid, x: number, y: number) => true, false, true);
        this.width = width;
        this.height = height;
        this.sideLength = sideLength;
        this.rule = rule;

        if (space === undefined)
        {
            this.absoluteYPos = window.innerHeight - height * sideLength;
        }
    }

    tick(time: number)
    {
        super.tick(time);
        if (this.space != undefined)
        {
            this.absoluteXPos, this.absoluteYPos =
                (this.space.absoluteXPos + this.xPos * this.sideLength), (this.space.absoluteYPos + this.yPos * this.sideLength);
            this.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        this.grid.forEachPenetrated((grid: loopgrid, x: number, y: number) =>
        {
            if (this.rule(grid, x, y))
            {
                this.canvas.fillRect(
                    x * this.sideLength + this.absoluteXPos,
                    window.innerWidth - (y + 1) * this.sideLength + this.absoluteYPos,
                    this.sideLength, this.sideLength);
                return true;
            } else
            {
                return false;
            }
        });
    }
}

export var rules = {
    b3s23: function (grid: loopgrid, x: number, y: number): boolean
    {
        var numberOfCells: number = 0;

        if (grid.get(x - 1, y - 1))
        {
            numberOfCells++;
        }
        if (grid.get(x - 1, y + 0))
        {
            numberOfCells++;
        }
        if (grid.get(x - 1, y + 1))
        {
            numberOfCells++;
        }
        if (grid.get(x + 0, y + 1))
        {
            numberOfCells++;
        }
        if (grid.get(x + 1, y + 1))
        {
            numberOfCells++;
        }
        if (grid.get(x + 1, y + 0))
        {
            numberOfCells++;
        }
        if (grid.get(x + 1, y - 1))
        {
            numberOfCells++;
        }
        if (grid.get(x + 0, y - 1))
        {
            numberOfCells++;
        }

        var state: boolean;
        switch (numberOfCells)
        {
            case 2:
                state = grid.get(x, y);
            case 3:
                state = true;
            default:
                state = false;
        }
        console.log(x + " " + y + " " + state);
        return state;
    }
}
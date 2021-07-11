import { entity } from "./entity";
import { visibleEntity } from "./visibleEntity";
import { loopgrid } from "../container/loopgrid";
import { doublegrid } from "../container/doublegrid";

/**
 * Game of life Space
 * It can be a background of game, or be contained
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

    /**
     * The grid which contains game of life cells.
     */
    grid: doublegrid;

    entities: Set<entity> = new Set();

    canvasheight: number;

    /**
     * Rule of gol.
     */
    rule: (grid: loopgrid, x: number, y: number) => boolean;

    /**
     * Part of the grid which players can see.
     */
    visibleRange: { minX: number, maxX: number, minY: number, maxY: number };

    /**
     * Size players see on the screen.
     */
    absoluteWidth: number;
    absoluteHeight: number;

    absoluteXPos: number; //absoluteXPos and absoluteYPos are the position where the golSpace is on the screen;
    absoluteYPos: number; //absoluteYPos

    constructor(kinematics: { xPos: number, yPos: number, xVelocity: number, yVelocity: number },
        scale: { width: number, height: number, absoluteWidth: number, absoluteHeight: number },
        visibleRange: { minX: number, maxX: number, minY: number, maxY: number },
        space: golSpace, canvas: CanvasRenderingContext2D,
        rule: (grid: loopgrid, x: number, y: number) => boolean)
    {
        // golSpace uses its own code to render hence it doesn't need a renderer function.
        super("golSpace", kinematics, space, false, canvas);

        this.grid = new doublegrid(scale.width, scale.height, (grid: loopgrid, x: number, y: number) =>
        {
            return false;
        }, true, false);
        this.width = scale.width;
        this.height = scale.height;
        this.rule = rule;
        this.canvasheight = canvas.canvas.height;
        this.absoluteWidth = scale.absoluteWidth;
        this.absoluteHeight = scale.absoluteHeight;
        this.visibleRange = visibleRange;

        if (space === undefined)
        {
            this.absoluteXPos = kinematics.xPos;
            this.absoluteYPos = kinematics.yPos;
        }
    }

    addEntity(ent: entity): void
    {
        this.entities.add(ent);
    }

    tick(time: number): void
    {
        if (this.space != undefined)
        {
            this.absoluteXPos = Math.round(this.space.absoluteXPos + this.xPos * this.absoluteWidth / this.width);
            this.absoluteYPos = Math.round(this.space.absoluteYPos + this.yPos * this.absoluteHeight / this.height);
        }
        else
        {
            this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        }
        super.tick(time);
        this.grid.forEachPenetrated(
            (grid: loopgrid, x: number, y: number) =>
            {
                if (this.rule(grid, x, y))
                {
                    if (this.visibleRange.minX <= x &&
                        x < this.visibleRange.maxX &&
                        this.visibleRange.minY <= y &&
                        y < this.visibleRange.maxY)
                    {
                        var renderX: number = x - this.visibleRange.minX;
                        var width: number = this.visibleRange.maxX - this.visibleRange.minX;
                        var fillX: number = Math.round(renderX * this.absoluteWidth / width);
                        var sideX: number = Math.round((renderX + 1) * this.absoluteWidth / width) - fillX;
                        fillX += this.absoluteXPos;
                        var renderY: number = y - this.visibleRange.minY;
                        var height: number = this.visibleRange.maxY - this.visibleRange.minY;
                        var fillY: number = Math.round((renderY + 1) * this.absoluteHeight / height);
                        var sideY: number = fillY - Math.round((renderY) * this.absoluteHeight / height);
                        fillY = this.canvasheight - fillY - this.absoluteYPos;
                        this.canvas.fillRect(
                            fillX,
                            fillY,
                            sideX, sideY);
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
        );
        this.grid.flip();
        this.entities.forEach(
            entity =>
            {
                if (!entity.isDead)
                {
                    entity.tick(time);
                }
                else
                {
                    this.entities.delete(entity);
                }
            }
        );
    }
}

export var rules = {
    scroll: function (grid: loopgrid, x: number, y: number): boolean
    {
        return grid.get(x, y + 1);
    },

    stay: function (grid: loopgrid, x: number, y: number): boolean
    {
        return grid.get(x, y);
    },

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

        switch (numberOfCells)
        {
            case 2:
                return grid.get(x, y);
            case 3:
                return true;
            default:
                return false;
        }
    }
}

/**
 * The main golSpace on the screen.
 */
export var the_space: golSpace;
import { entity } from "./entity";
import { VisibleEntity } from "./VisibleEntity";
import { LoopGrid } from "../container/LoopGrid";
import { DoubleGrid } from "../container/DoubleGrid";

/**
 * Game of life Space
 * It can be a background of game, or be contained
 */
export class GolSpace extends VisibleEntity
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
    grid: DoubleGrid;

    entities: Set<entity> = new Set();

    canvas_height: number;

    /**
     * Rule of gol.
     */
    rule: (grid: LoopGrid, x: number, y: number) => boolean;

    /**
     * Part of the grid which players can see.
     */
    visible_range: { min_x: number, max_x: number, min_y: number, max_y: number };

    /**
     * Size players see on the screen.
     */
    absolute_width: number;
    absolute_height: number;

    absolute_x_pos: number; //absolute_x_pos and absolute_y_pos are the position where the GolSpace is on the screen;
    absolute_y_pos: number; //absolute_y_pos

    constructor(kinematics: { x_pos: number, y_pos: number, x_velocity: number, y_velocity: number },
        scale: { width: number, height: number, absolute_width: number, absolute_height: number },
        visible_range: { min_x: number, max_x: number, min_y: number, max_y: number },
        space: GolSpace, canvas: CanvasRenderingContext2D,
        rule: (grid: LoopGrid, x: number, y: number) => boolean)
    {
        // golSpace uses its own code to render hence it doesn't need a renderer function.
        super("golSpace", kinematics, space, false, canvas);

        this.grid = new DoubleGrid(scale.width, scale.height, (grid: LoopGrid, x: number, y: number) =>
        {
            return false;
        }, true, false);
        this.width = scale.width;
        this.height = scale.height;
        this.rule = rule;
        this.canvas_height = canvas.canvas.height;
        this.absolute_width = scale.absolute_width;
        this.absolute_height = scale.absolute_height;
        this.visible_range = visible_range;

        if (space === undefined)
        {
            this.absolute_x_pos = kinematics.x_pos;
            this.absolute_y_pos = kinematics.y_pos;
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
            this.absolute_x_pos = Math.round(this.space.absolute_x_pos + this.x_pos * this.absolute_width / this.width);
            this.absolute_y_pos = Math.round(this.space.absolute_y_pos + this.y_pos * this.absolute_height / this.height);
        }
        else
        {
            this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        }
        super.tick(time);
        this.grid.forEachPenetrated(
            (grid: LoopGrid, x: number, y: number) =>
            {
                if (this.rule(grid, x, y))
                {
                    if (this.visible_range.min_x <= x &&
                        x < this.visible_range.max_x &&
                        this.visible_range.min_y <= y &&
                        y < this.visible_range.max_y)
                    {
                        var render_x: number = x - this.visible_range.min_x;
                        var width: number = this.visible_range.max_x - this.visible_range.min_x;
                        var fill_x: number = Math.round(render_x * this.absolute_width / width);
                        var side_x: number = Math.round((render_x + 1) * this.absolute_width / width) - fill_x;
                        fill_x += this.absolute_x_pos;
                        var render_y: number = y - this.visible_range.min_y;
                        var height: number = this.visible_range.max_y - this.visible_range.min_y;
                        var fill_y: number = Math.round((render_y + 1) * this.absolute_height / height);
                        var side_y: number = fill_y - Math.round((render_y) * this.absolute_height / height);
                        fill_y = this.canvas_height - fill_y - this.absolute_y_pos;
                        this.canvas.fillRect(
                            fill_x,
                            fill_y,
                            side_x, side_y);
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
                if (!entity.is_dead)
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
    scroll: function (grid: LoopGrid, x: number, y: number): boolean
    {
        return grid.get(x, y + 1);
    },

    stay: function (grid: LoopGrid, x: number, y: number): boolean
    {
        return grid.get(x, y);
    },

    b3s23: function (grid: LoopGrid, x: number, y: number): boolean
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


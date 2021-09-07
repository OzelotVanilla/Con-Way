import { LoopGrid } from "js/container/LoopGrid";

/**
 * A modified loopgrid. It has two looping spaces. One is its facial space, and the other is a hidden space.
 * By invoking its methods extended from loopgrid, you can modify its facial space.
 * By invoking its own methods which are penetrated versions of loopgrid's methods,
 * you can modify its hidden space. A constant rule is: you SHOULD NOT get any data from or modify its hidden space.
 * By invoking the flip method, you can switch its facial and hidden space.
 */
export class DoubleGrid extends LoopGrid
{

    hiden_array: boolean[][];

    constructor(x: number, y: number, factory: (grid: LoopGrid, x: number, y: number) => boolean, horizonal_loop: boolean, vertical_loop: boolean)
    {
        super(x, y, factory, horizonal_loop, vertical_loop);
        this.hiden_array = [];
        for (var dx = 0; dx < x; dx++)
        {
            var column: boolean[] = [];
            this.hiden_array[dx] = column;
            for (var dy: number = 0; dy < y; dy++)
            {
                column[dy] = factory(this, dx, dy);
            }
        }
    }

    flip()
    {
        var mid: boolean[][] = this.inner_array;
        this.inner_array = this.hiden_array;
        this.hiden_array = mid;
    }

    setPenetrated(x: number, y: number, data)
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonal_loop)
            {
                return;
            } else
            {
                x = x % this.width;
                if (x < 0)
                {
                    x += this.width;
                }
            }
        }
        if (y < 0 || this.height <= y)
        {
            if (!this.vertical_loop)
            {
                return;
            } else
            {
                y = y % this.height;
                if (y < 0)
                {
                    y += this.height;
                }
            }
        }
        this.hiden_array[x][y] = data;
    }

    getAndSetPenetrated(x: number, y: number, data: boolean): boolean
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonal_loop)
            {
                return this.initialize(this, x, y);
            } else
            {
                x = x % this.width;
                if (x < 0)
                {
                    x += this.width;
                }
            }
        }
        if (y < 0 || this.height <= y)
        {
            if (!this.vertical_loop)
            {
                return this.initialize(this, x, y);
            } else
            {
                y = y % this.height;
                if (y < 0)
                {
                    y += this.height;
                }
            }
        }
        this.hiden_array[x][y] = data;
        return this.inner_array[x][y];
    }

    forEachPenetrated(factory: (grid: LoopGrid, x: number, y: number) => boolean)
    {
        for (var y: number = 0; y < this.height; y++)
        {
            for (var x: number = 0; x < this.width; x++)
            {
                this.hiden_array[x][y] = factory(this, x, y);
            }
        }
    }
}
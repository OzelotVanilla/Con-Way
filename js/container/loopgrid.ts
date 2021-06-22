/**
 * A virtual looping straight 2-dimensional space.
 * It contains its data by a normal 2d array, but you shouldn't access the array directly.
 * When accessing to it by its function, coordinates will be transformed to their modulus to its inner 2d array.
 * The factory function which the forEach method needs should looks like this: factory(this, x, y){ } and have return value,
 * because its return value will be the new value of that position.
 */
export class loopgrid
{

    innerarray: boolean[][];
    xWidth: number;
    yWidth: number;
    initialize: (grid: loopgrid, x: number, y: number) => boolean;
    horizonalLoop: boolean;
    verticalLoop: boolean;

    constructor(x: number, y: number, factory: (grid: loopgrid, x: number, y: number) => boolean,
        horizonalLoop: boolean, verticalLoop: boolean)
    {
        this.innerarray = new Array();
        this.xWidth = x;
        this.yWidth = y;
        this.initialize = factory;
        this.horizonalLoop = horizonalLoop;
        this.verticalLoop = verticalLoop;

        for (var dx = 0; dx < x; dx++)
        {
            var column: boolean[] = [];
            this.innerarray[dx] = column;
            for (var dy: number = 0; dy < y; dy++)
            {
                column[dy] = factory(this, dx, dy);
            }
        }
    }

    getXWidth(): number
    {
        return this.xWidth;
    }

    getYWidth(): number
    {
        return this.yWidth;
    }

    set(x: number, y: number, data: boolean)
    {
        if (x < 0 || this.xWidth <= x)
        {
            if (this.horizonalLoop)
            {
                return;
            }
            else
            {
                x = x % this.xWidth;
                if (x < 0)
                {
                    x += this.xWidth;
                }
            }
        }
        if (y < 0 || this.yWidth <= y)
        {
            if (this.verticalLoop)
            {
                return;
            }
            else
            {
                y = y % this.yWidth;
                if (y < 0)
                {
                    y += this.yWidth;
                }
            }
        }
        this.innerarray[x][y] = data;
    }

    getAndSet(x: number, y: number, data: boolean): boolean
    {
        if (x < 0 || this.xWidth <= x)
        {
            if (this.horizonalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
            {
                x = x % this.xWidth;
                if (x < 0)
                {
                    x += this.xWidth;
                }
            }
        }
        if (y < 0 || this.yWidth <= y)
        {
            if (this.verticalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
            {
                y = y % this.yWidth;
                if (y < 0)
                {
                    y += this.yWidth;
                }
            }
        }
        var re: boolean = this.innerarray[x][y];
        this.innerarray[x][y] = data;
        return re;
    }

    get(x: number, y: number): boolean
    {
        if (x < 0 || this.xWidth <= x)
        {
            if (this.horizonalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
            {
                x = x % this.xWidth;
                if (x < 0)
                {
                    x += this.xWidth;
                }
            }
        }

        if (y < 0 || this.yWidth <= y)
        {
            if (this.verticalLoop)
            {
                return this.initialize(this, x, y);
            } else
            {
                y = y % this.yWidth;
                if (y < 0)
                {
                    y += this.yWidth;
                }
            }
        }

        return this.innerarray[x][y];
    }

    getPropoties(): number | number
    {
        return this.xWidth, this.yWidth;
    }

    yOffSet: number;

    forEach(factory: (grid: loopgrid, x: number, y: number) => null)
    {
        for (var y: number = 0; y < this.yWidth; y++)
        {
            if (y == this.yOffSet)
            {
                continue;
            }
            for (var x: number = 0; x < this.xWidth; x++)
            {
                this.innerarray[x][y] = factory(this, x, y);
            }
        }
    }
}
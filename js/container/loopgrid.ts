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
    width: number;
    height: number;
    initialize: (grid: loopgrid, x: number, y: number) => boolean;
    horizonalLoop: boolean;
    verticalLoop: boolean;

    constructor(x: number, y: number, factory: (grid: loopgrid, x: number, y: number) => boolean,
        horizonalLoop: boolean, verticalLoop: boolean)
    {
        this.innerarray = new Array();
        this.width = x;
        this.height = y;
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

    getWidth(): number
    {
        return this.width;
    }

    getHeight(): number
    {
        return this.height;
    }

    set(x: number, y: number, data: boolean)
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonalLoop)
            {
                return;
            }
            else
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
            if (!this.verticalLoop)
            {
                return;
            }
            else
            {
                y = y % this.height;
                if (y < 0)
                {
                    y += this.height;
                }
            }
        }
        this.innerarray[x][y] = data;
    }

    getAndSet(x: number, y: number, data: boolean): boolean
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
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
            if (!this.verticalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
            {
                y = y % this.height;
                if (y < 0)
                {
                    y += this.height;
                }
            }
        }
        var re: boolean = this.innerarray[x][y];
        this.innerarray[x][y] = data;
        return re;
    }

    get(x: number, y: number): boolean
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonalLoop)
            {
                return this.initialize(this, x, y);
            }
            else
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
            if (!this.verticalLoop)
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

        return this.innerarray[x][y];
    }

    getPropoties(): number | number
    {
        return this.width, this.height;
    }

    forEach(factory: (grid: loopgrid, x: number, y: number) => null)
    {
        for (var y: number = 0; y < this.height; y++)
        {
            for (var x: number = 0; x < this.width; x++)
            {
                this.innerarray[x][y] = factory(this, x, y);
            }
        }
    }
}
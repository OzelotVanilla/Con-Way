/**
 * A virtual looping straight 2-dimensional space.
 * It contains its data by a normal 2d array, but you shouldn't access the array directly.
 * When accessing to it by its function, coordinates will be transformed to their modulus to its inner 2d array.
 * The factory function which the forEach method needs should looks like this: factory(this, x, y){ } and have return value,
 * because its return value will be the new value of that position.
 */
export class LoopGrid
{

    inner_array: boolean[][];
    width: number;
    height: number;
    initialize: (grid: LoopGrid, x: number, y: number) => boolean;
    horizonal_loop: boolean;
    vertical_loop: boolean;

    constructor(x: number, y: number, factory: (grid: LoopGrid, x: number, y: number) => boolean,
        horizonal_loop: boolean, vertical_loop: boolean)
    {
        this.inner_array = new Array();
        this.width = x;
        this.height = y;
        this.initialize = factory;
        this.horizonal_loop = horizonal_loop;
        this.vertical_loop = vertical_loop;

        for (var dx = 0; dx < x; dx++)
        {
            var column: boolean[] = [];
            this.inner_array[dx] = column;
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
            if (!this.horizonal_loop)
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
            if (!this.vertical_loop)
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
        this.inner_array[x][y] = data;
    }

    getAndSet(x: number, y: number, data: boolean): boolean
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonal_loop)
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
            if (!this.vertical_loop)
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
        var re: boolean = this.inner_array[x][y];
        this.inner_array[x][y] = data;
        return re;
    }

    get(x: number, y: number): boolean
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizonal_loop)
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

        return this.inner_array[x][y];
    }

    getPropoties(): number | number
    {
        return this.width, this.height;
    }

    forEach(factory: (grid: LoopGrid, x: number, y: number) => null)
    {
        for (var y: number = 0; y < this.height; y++)
        {
            for (var x: number = 0; x < this.width; x++)
            {
                this.inner_array[x][y] = factory(this, x, y);
            }
        }
    }
}
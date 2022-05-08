/**
 * A virtual looping straight 2-dimensional space.
 * It contains its data by a normal 2d array, but you shouldn't access the array directly.
 * When accessing to it by its function, coordinates will be transformed to their modulus to its inner 2d array.
 * The factory function which the forEach method needs should looks like this: factory(this, x, y){ } and have return value,
 * because its return value will be the new value of that position.
 * 
 * The term "loop" stands for: if a entity runs to the edge of 
 */
export class LoopGrid
{
    /**
     * The 2 dimension array to store the data of con-way game cell
     */
    inner_array: boolean[][];

    /**
     * The width of the grid.
     */
    width: number;

    /**
     * The height of the grid.
     */
    height: number;

    /**
     * The initialize function to fill the un-initialized cell to `ture` or `false`.
     * 
     * Example:
     * `() -> false` will always return `false` for un-initialized cell.
     * 
     * @param grid Grid you want to search
     * @param x The x coordinate to find
     * @param y The y coordinate to find
     * @returns 
     */
    initialize: (grid: LoopGrid, x: number, y: number) => boolean;

    /**
     * Whether the grid will allow horizontal loop.
     */
    horizontal_loop: boolean;

    /**
     * Whether the grid will allow vertical loop.
     */
    vertical_loop: boolean;

    constructor(width: number, height: number, factory: (grid: LoopGrid, x: number, y: number) => boolean,
        horizonal_loop: boolean, vertical_loop: boolean)
    {
        this.inner_array = new Array();
        this.width = width;
        this.height = height;
        this.initialize = factory;
        this.horizontal_loop = horizonal_loop;
        this.vertical_loop = vertical_loop;

        for (var dx = 0; dx < width; dx++)
        {
            var column: boolean[] = [];
            this.inner_array[dx] = column;
            for (var dy: number = 0; dy < height; dy++)
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

    /**
     * Set the value at (x, y) of your grid.
     * 
     * @param x The x coordinate to find
     * @param y The y coordinate to find
     * @param data The data to set to your target (x, y)
     */
    set(x: number, y: number, data: boolean): void
    {
        if (x < 0 || this.width <= x)
        {
            if (!this.horizontal_loop)
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
            if (!this.horizontal_loop)
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
            if (!this.horizontal_loop)
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
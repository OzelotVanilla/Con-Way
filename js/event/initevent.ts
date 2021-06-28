import { event } from "./event";

/**
 * Begin game ticking (game loop).
 */
export class initevent extends event
{
    constructor(init: () => void)
    {
        super("init", init);
    }
}
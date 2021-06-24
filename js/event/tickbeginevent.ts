import { tickevent } from "./tickevent";

/**
 * Begin game ticking (game loop).
 */
export class tickbeginevent extends tickevent
{
    constructor(current_time: number)
    {
        super(current_time);
        this.name = "tick_begin";
    }
}
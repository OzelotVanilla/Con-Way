import { tickevent } from "./tickevent";

/**
 * Begin game ticking (game loop).
 */
export class tickbeginevent extends tickevent
{
    constructor(current_time: number = new Date().getTime())
    {
        super(current_time);
        this.name = "tick_begin";
        this.currentAction = this.defaultAction = () =>
        {
            tickevent.ticking = true;
            setTimeout(tickevent.tick, 0);
        };
    }
}
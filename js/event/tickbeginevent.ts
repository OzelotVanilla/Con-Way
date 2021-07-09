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
        var tick_action = this.currentAction;
        this.currentAction = this.defaultAction = () =>
        {
            tickevent.ticking = true;
            tick_action();
            setTimeout(tickevent.tick, 0);
        };
    }
}
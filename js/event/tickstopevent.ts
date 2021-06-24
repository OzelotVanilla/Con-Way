import { tickevent } from "./tickevent";

/**
 * Stop game ticking (game loop).
 */
export class tickstopevent extends tickevent
{
    constructor(current_time: number)
    {
        super(current_time);
        this.name = "tick_stop";
    }
}
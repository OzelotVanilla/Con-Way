import { tickevent } from "./tickevent";

/**
 * Stop game ticking (game loop).
 */
export class tickstopevent extends tickevent
{
    constructor(current_time: number = new Date().getTime())
    {
        super(current_time);
        this.name = "tick_stop";
        this.currentAction = this.defaultAction = () => tickevent.ticking = false;
    }
}
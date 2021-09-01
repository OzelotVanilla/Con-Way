import { event } from "./event";
import { global } from "./eventbus";

/**
 * Stop game ticking (game loop).
 */
export class TickStopEvent extends event<global, TickStopEvent>
{
    constructor()
    {
        super("tick_stop", default_action);
    }

    static setDefaultAction(action: (ev: TickStopEvent, ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ev: TickStopEvent, ent: global) => any;
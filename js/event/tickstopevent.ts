import { event } from "./event";
import { global } from "./eventbus";

/**
 * Stop game ticking (game loop).
 */
export class tickstopevent extends event<global, tickstopevent>
{
    constructor()
    {
        super("tick_stop", default_action);
    }

    static setDefaultAction(action: (ev: tickstopevent, ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ev: tickstopevent, ent: global) => any;
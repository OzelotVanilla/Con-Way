import { event } from "./event";
import { global } from "./eventbus";

/**
 * Stop game ticking (game loop).
 */
export class tickstopevent extends event<global>
{
    constructor()
    {
        super("tick_stop", default_action);
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ent: global) => any;
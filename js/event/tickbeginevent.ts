import { event } from "./event";
import { global } from "./eventbus";
import { tickevent } from "./tickevent";

/**
 * Begin game ticking (game loop).
 */
export class tickbeginevent extends event<global>
{
    constructor()
    {
        super("tick_begin", default_action);
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ent: global) => any;
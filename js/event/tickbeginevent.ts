import { event } from "./event";
import { global } from "./eventbus";

/**
 * Begin game ticking (game loop).
 */
export class tickbeginevent extends event<global, tickbeginevent>
{
    constructor()
    {
        super("tick_begin", default_action);
    }

    static setDefaultAction(action: (ev: tickbeginevent, ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ev: tickbeginevent, ent: global) => any;
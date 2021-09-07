import { event } from "js/event/event";
import { global } from "js/event/eventbus";

/**
 * Begin game ticking (game loop).
 */
export class TickBeginEvent extends event<global, TickBeginEvent>
{
    constructor()
    {
        super("tick_begin", default_action);
    }

    static setDefaultAction(action: (ev: TickBeginEvent, ent: global) => any)
    {
        default_action = action;
    }

}

var default_action: (ev: TickBeginEvent, ent: global) => any;
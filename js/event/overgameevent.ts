import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class overgameevent extends event<global, overgameevent>
{

    constructor()
    {
        super("game_over", default_action);
    }

    static setDefaultAction(action: (ev: overgameevent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: overgameevent, ent: global) => any;
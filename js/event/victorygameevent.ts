import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class victorygameevent extends event<global, victorygameevent>
{

    constructor()
    {
        super("game_victory", default_action);
    }

    static setDefaultAction(action: (ev: victorygameevent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: victorygameevent, ent: global) => any;
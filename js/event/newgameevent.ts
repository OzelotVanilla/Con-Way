import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class newgameevent extends event<global>
{

    constructor()
    {
        super("game_new", default_action);
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ent: global) => any;
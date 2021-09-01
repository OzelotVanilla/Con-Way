import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class OverGameEvent extends event<global, OverGameEvent>
{

    constructor()
    {
        super("game_over", default_action);
    }

    static setDefaultAction(action: (ev: OverGameEvent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: OverGameEvent, ent: global) => any;
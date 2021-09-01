import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class VictoryGameEvent extends event<global, VictoryGameEvent>
{

    constructor()
    {
        super("game_victory", default_action);
    }

    static setDefaultAction(action: (ev: VictoryGameEvent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: VictoryGameEvent, ent: global) => any;
import { savestate } from "../../pages/game/savestate";
import { Stage } from "../lifegame/Stage";
import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class NewGameEvent extends event<global, NewGameEvent>
{

    /**
     * The save state. It will be initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It will be initialized during every newgameevent's post_action step.
     */
    the_stage: Stage;

    constructor()
    {
        super("game_new", default_action);
    }

    static setDefaultAction(action: (ev: NewGameEvent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: NewGameEvent, ent: global) => any;
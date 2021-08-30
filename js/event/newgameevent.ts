import { savestate } from "../../pages/game/savestate";
import { stage } from "../lifegame/stage";
import { event } from "./event";
import { global } from "./eventbus";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class newgameevent extends event<global, newgameevent>
{

    /**
     * The save state. It will be initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It will be initialized during every newgameevent's post_action step.
     */
    the_stage: stage;

    constructor()
    {
        super("game_new", default_action);
    }

    static setDefaultAction(action: (ev: newgameevent, ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ev: newgameevent, ent: global) => any;
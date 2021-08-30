import { savestate } from "../../pages/game/savestate";
import { stage } from "../lifegame/stage";
import { event } from "./event";
import { global } from "./eventbus";

/**
 * Begin game ticking (game loop).
 */
export class startgameevent extends event<global, startgameevent>
{

    /**
     * The save state. It is already initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It is already initialized during every newgameevent's post_action step.
     */
    the_stage: stage;

    constructor(sst: savestate, the_stage: stage)
    {
        super("game_start", default_action);
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ent: global) => any;
import { savestate } from "../../pages/game/savestate";
import { Stage } from "../lifegame/Stage";
import { event } from "./event";
import { global } from "./eventbus";

/**
 * Begin game ticking (game loop).
 */
export class StartGameEvent extends event<global, StartGameEvent>
{

    /**
     * The save state. It is already initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It is already initialized during every newgameevent's post_action step.
     */
    the_stage: Stage;

    constructor(sst: savestate, the_stage: Stage)
    {
        super("game_start", default_action);
        this.sst = sst;
        this.the_stage = the_stage;
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ent: global) => any;
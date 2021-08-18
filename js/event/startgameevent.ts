import { event } from "./event";
import { eventbus, global } from "./eventbus";
import { tickbeginevent } from "./tickbeginevent";
import { savestate } from "../../pages/game/savestate";
import { stages_names } from "../lifegame/stage";

/**
 * Begin game ticking (game loop).
 */
export class startgameevent extends event<global>
{
    sst: savestate;

    constructor()
    {
        super("game_start", default_action);
    }

    static setDefaultAction(action: (ent: global) => any)
    {
        default_action = action;
    }
}

var default_action: (ent: global) => any;
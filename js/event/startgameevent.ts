import { event } from "./event";
import { global } from "./eventbus";
import { savestate } from "../../pages/game/savestate";

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
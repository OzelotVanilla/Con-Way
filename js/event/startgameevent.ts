import { event } from "./event";
import { eventbus } from "./eventbus";
import { tickbeginevent } from "./tickbeginevent";
import { savestate } from "../../pages/game/savestate";
import { stages_names } from "../lifegame/stage";

/**
 * Begin game ticking (game loop).
 */
export class startgameevent extends event
{
    sst: savestate;

    constructor(event_bus: eventbus, sst: savestate)
    {
        super("game_start", () => event_bus.post(new tickbeginevent()));
        this.sst = sst;
        startgameevent.normalizeSavestate(sst);
    }

    /**
     * If the savestate is not valid, make them default.
     */
    static normalizeSavestate(sst: savestate): savestate
    {
        if (sst.name === null || sst.name === undefined)
        {
            sst.name = "User"
        }

        // If the stage name is invalid (does not in the list)
        if (sst.stage === null || sst.stage === undefined || stages_names.indexOf(sst.stage) === -1)
        {
            sst.stage = "meadow";
        }
        return sst;
    }
}
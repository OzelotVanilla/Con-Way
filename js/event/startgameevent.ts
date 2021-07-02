import { event } from "./event";
import { eventbus } from "./eventbus";
import { tickbeginevent } from "./tickbeginevent";
import { savestate } from "../../pages/game/savestate";

/**
 * Begin game ticking (game loop).
 */
export class startgameevent extends event
{
    constructor(event_bus: eventbus, sst: savestate)
    {
        super("game_start", () => event_bus.post(new tickbeginevent()));
        sst = this.normalizeSavestate(sst);
    }

    normalizeSavestate(sst: savestate): savestate
    {
        if (sst.name === null)
        {
            sst.name = "User"
        }
        if (sst.stage === null)
        {
            sst.stage = "meadow";
        }
        return sst;
    }
}
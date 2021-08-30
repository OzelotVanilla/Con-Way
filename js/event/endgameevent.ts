import { event } from "./event";
import { event_bus, global } from "./eventbus";
import { victorygameevent } from "./victorygameevent";
import { overgameevent } from "./overgameevent";
import { savestate } from "../../pages/game/savestate";
import { stage } from "../lifegame/stage";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class endgameevent extends event<global, endgameevent>
{

    /**
     * The save state. It is already initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It is already initialized during every newgameevent's post_action step.
     */
    the_stage: stage;

    constructor(is_victory: boolean, sst: savestate, the_stage: stage)
    {
        super("game_end",
            (g) =>
            {
                if (is_victory)
                {
                    event_bus.post(new victorygameevent(), undefined, () => { });
                } else
                {
                    event_bus.post(new overgameevent(), undefined, () => { });
                }
            }
        );
    }

}
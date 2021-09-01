import { event } from "./event";
import { event_bus, global } from "./eventbus";
import { VictoryGameEvent } from "./VictoryGameEvent";
import { OverGameEvent } from "./OverGameEvent";
import { savestate } from "../../pages/game/savestate";
import { Stage } from "../lifegame/Stage";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class EndGameEvent extends event<global, EndGameEvent>
{

    /**
     * The save state. It is already initialized during every newgameevent's pre_action step.
     */
    sst: savestate;

    /**
     * The stage. It is already initialized during every newgameevent's post_action step.
     */
    the_stage: Stage;

    constructor(is_victory: boolean, sst: savestate, the_stage: Stage)
    {
        super("game_end",
            (g) =>
            {
                if (is_victory)
                {
                    event_bus.post(new VictoryGameEvent(), undefined, () => { });
                } else
                {
                    event_bus.post(new OverGameEvent(), undefined, () => { });
                }
            }
        );
    }

}
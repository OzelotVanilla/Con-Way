import { event } from "js/event/event";
import { event_bus, global } from "js/event/eventbus";
import { VictoryGameEvent } from "js/event/VictoryGameEvent";
import { OverGameEvent } from "js/event/OverGameEvent";
import { savestate } from "pages/game/savestate";
import { Stage } from "js/lifegame/Stage";

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
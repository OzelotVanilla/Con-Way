import { event } from "./event";
import { event_bus, global } from "./eventbus";
import { victorygameevent } from "./victorygameevent";
import { overgameevent } from "./overgameevent";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class endgameevent extends event<global>
{

    constructor(is_victory: boolean)
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
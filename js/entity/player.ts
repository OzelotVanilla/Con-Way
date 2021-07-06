import { entity } from "./entity";
import { effect } from "../lifegame/speffect/effect"
import { event } from "../event/event"
import { event_bus } from "../event/eventbus"
import { golSpace } from "./golSpace";

export class player extends entity
{
    hp: number;
    kill: number;

    /**
     * The buffer which contains the effect and remaining tick it have.
     */
    effect_buffer: Map<effect, number>;

    tick(time: number)
    {
        if (this.hp <= 0)
        {
            // event_bus.post(new event("Player dead event"))
        }
    }
}
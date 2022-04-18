import { event } from "js/event/event";
import { GolSpace } from "js/entity/GolSpace";
import { the_space } from "pages/game/the_space";

/**
 * News and posts it every tick. (- _- )
 */
export class TickEvent extends event<GolSpace, TickEvent>
{

    current_time: number;

    constructor(current_time: number = new Date().getTime() / 1000)
    {
        super("tick",
            (ev: TickEvent, space: GolSpace) =>
            {
                the_space.tick(current_time);
            }
        );
        this.current_time = current_time;
    }

    getCurrentTime(): number
    {
        return this.current_time;
    }


}
import { event } from "./event";
import { golSpace } from "../../js/entity/golSpace";
import { the_space } from "../../pages/game/the_space";

/**
 * News and posts it every tick. (- _- )
 */
export class tickevent extends event<golSpace>
{

    current_time: number;

    constructor(current_time: number = new Date().getTime())
    {
        super("tick", (space: golSpace) => the_space.tick(current_time));
        this.current_time = current_time;
    }

    getCurrentTime(): number
    {
        return this.current_time;
    }


}
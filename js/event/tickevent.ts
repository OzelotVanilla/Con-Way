import { event } from "./event";
import { event_bus } from "../../js/event/eventbus";
import { the_space } from "../../js/entity/golSpace";


/**
 * News and posts it every tick. (- _- )
 */
export class tickevent extends event
{

    current_time: number;

    constructor(current_time: number = new Date().getTime())
    {
        super("tick", () => the_space.tick(current_time));
        this.current_time = current_time;
    }

    getCurrentTime(): number
    {
        return this.current_time;
    }

    protected static ticking: boolean = false;

    /**
     * The tick function.
     */
    protected static tick(): void
    {
        var now: number = new Date().getTime();
        event_bus.post(new tickevent(now));
        if (tickevent.ticking)
        {
            var sleep: number = delay - now + lastTime;
            if (sleep >= 0)
            {
                if (sleep <= delay)
                {
                    lastTime += delay;
                }
            }
            else
            {
                lastTime = now;
                sleep = delay;
            }
            setTimeout(tickevent.tick, sleep);
        }
    }
}

var lastTime: number;

/**
 * Delay between two ticks.
 */
export var delay: number = 50;
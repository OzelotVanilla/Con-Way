import { event_bus } from "../../js/event/eventbus";
import { TickEvent } from "../../js/event/TickEvent";
import { the_space } from "./the_space";

var ticker: {
    ticking: boolean,

    /**
     * The tick function.
     */
    tick: () => void


    last_time: number;

    /**
     * Delay between two ticks.
     */
    delay: number;
} =
{
    ticking: false,
    last_time: 0,
    delay: 50,

    /**
     * The tick function.
     */
    tick: () =>
    {
        let now: number = new Date().getTime();
        event_bus.post(new TickEvent(now), the_space,
            () =>
            {
                if (ticker.ticking)
                {
                    let sleep: number = ticker.delay - now + ticker.last_time;
                    if (sleep >= 0)
                    {
                        if (sleep <= ticker.delay)
                        {
                            ticker.last_time += ticker.delay;
                        }
                    }
                    else
                    {
                        ticker.last_time = now;
                        sleep = ticker.delay;
                    }
                    setTimeout(ticker.tick, sleep);
                }
            }
        );
    }
}

export function tickBegin(): void
{
    console.log("tick_begin action.");
    ticker.ticking = true;
    setTimeout(ticker.tick);
}

export function tickStop(): void
{
    console.log("tick_stop action.");
    ticker.ticking = false;
}
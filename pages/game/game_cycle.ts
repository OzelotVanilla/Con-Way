import { event_bus } from "../../js/event/eventbus";
import { tickevent } from "../../js/event/tickevent";
import { the_space } from "./the_space";

var ticker: {
    ticking: boolean,

    /**
     * The tick function.
     */
    tick: () => void


    lastTime: number;

    /**
     * Delay between two ticks.
     */
    delay: number;
} = {
    ticking: false,
    lastTime: 0,
    delay: 50,

    /**
     * The tick function.
     */
    tick: () =>
    {
        let now: number = new Date().getTime();
        event_bus.post(new tickevent(now), the_space, () =>
        {
            if (ticker.ticking)
            {
                let sleep: number = ticker.delay - now + ticker.lastTime;
                if (sleep >= 0)
                {
                    if (sleep <= ticker.delay)
                    {
                        ticker.lastTime += ticker.delay;
                    }
                }
                else
                {
                    ticker.lastTime = now;
                    sleep = ticker.delay;
                }
                setTimeout(ticker.tick, sleep);
            }
        });
    }
}

export function tickBegin(): void
{
    ticker.ticking = true;
    setTimeout(ticker.tick);
}

export function tickStop(): void
{
    ticker.ticking = false;
}
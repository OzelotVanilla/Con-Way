import { clock } from "js/util/gameclock/clock";
import { FixedClock } from "js/util/gameclock/FixedClock";

class systemclock extends clock
{
    getTime(): number
    {
        return new Date().getTime() / 1000;
    }

    setTimeout(task: (...args: any[]) => void, timeout: number = 0, ...args: any[]): number
    {
        let milli_timeout: number = Math.round(timeout * 1000);

        if (Number.isFinite(milli_timeout))
        {
            return setTimeout(task, milli_timeout, ...args);
        } else
        {
            return undefined;
        }
    }

    clearTimeout(fid: number): void
    {
        clearTimeout(fid);
    }

    setInterval(task: (...args: any[]) => void, interval: number = 0, ...args: any[]): number
    {        
        let milli_interval: number = Math.round(interval * 1000);

        if (Number.isFinite(milli_interval) && (milli_interval >= 0))
        {
            return setInterval(task, milli_interval, ...args);
        } else
        {
            return undefined;
        }
    }

    clearInterval(fid: number): void
    {
        clearInterval(fid);
    }

}

export var system_clock = new systemclock(undefined);

export var invert_system_clock;

{
    let negate_function: (source: number) => number = (source: number) => - source;

    invert_system_clock = new FixedClock(system_clock, negate_function, negate_function);
}

export var frozen_clock;

{
    let zero_function: (source: number) => number = (source: number) => 0;

    let invert_zero_function: (source: number) => number = (source: number) => source / 0;

    frozen_clock = new FixedClock(system_clock, zero_function, invert_zero_function);
}
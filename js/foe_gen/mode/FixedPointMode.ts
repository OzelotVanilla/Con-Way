import { mode } from "./mode"

/**
 * Put patterns currectly at the fixed point.
 */
export class FixedPointMode extends mode
{

    plan: number[];
    index: number = 0;

    constructor(name: string, interval: number, data: number[], patterns: { type: string, weight: number }[],
        succ: { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
            { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
            undefined)
    {
        super(name, interval, data, patterns, succ);
        this.plan = data;
    }

    place(): number
    {
        if (this.index < this.plan.length)
        {
            return this.plan[this.index];
        }
    }

}
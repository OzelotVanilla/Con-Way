import { mode } from "./mode"

/**
 * Put patterns currectly at the fixed point.
 */
export class fixedpointmode extends mode
{

    plan: number[];
    index: number = 0;

    constructor(name: string, interval: number, data: number[], patterns: { type: string, weight: number }[])
    {
        super(name, interval, data, patterns);
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
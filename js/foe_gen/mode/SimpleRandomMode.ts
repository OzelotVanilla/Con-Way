import { mode } from "./mode"

/**
 * Use simple random function to calculate the position of generate place of enermy
 */
export class SimpleRandomMode extends mode
{

    /**
     * The average value of the random places.
     */
    expectation: number;

    /**
     * The width.
     */
    deviation: number;

    constructor(name: string, interval: number, data: { expectation: number, deviation: number }, patterns: { type: string, weight: number }[],
        succ: { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
            { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
            undefined)
    {
        super(name, interval, data, patterns, succ);
        this.expectation = data.expectation;
        this.deviation = data.deviation;
    }

    place(): number
    {
        return this.expectation + (Math.random() - 0.5) * this.deviation;
    }

}
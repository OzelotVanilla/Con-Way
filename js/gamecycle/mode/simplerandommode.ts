import { mode } from "./mode"

/**
 * Use simple random function to calculate the position of generate place of enermy
 */
export class simplerandommode extends mode
{

    /**
     * The average value of the random places.
     */
    expectation: number;

    /**
     * The width.
     */
    deviation: number;

    constructor(name: string, interval: number, data: { expectation: number, deviation: number }, patterns: { type: string, weight: number }[])
    {
        super(name, interval, data, patterns);
        this.expectation = data.expectation;
        this.deviation = data.deviation;
    }

    place(): number
    {
        return this.expectation + (Math.random() - 0.5) * this.deviation;
    }

}
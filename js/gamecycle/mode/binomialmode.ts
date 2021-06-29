import { mode } from "./mode"
import { loopgrid } from "../../container/loopgrid";

/**
 * Use binomial curve to calculate the position of generate place of enermy
 */
export class binomialmode extends mode
{

    /**
     * The x-axis value of the max point of the curve
     */
    expectation: number;

    /**
     * The width of the curve
     */
    deviation: number;

    constructor(name: string, interval: number, pattern: (grid: loopgrid) => void, data: { expectation: number, deviation: number })
    {
        super(name, interval, pattern, data);
        this.expectation = data.expectation;
        this.deviation = data.deviation;
    }

    place(): number
    {
        return this.expectation + (this.place0() - 0.5) * this.deviation;
    }

    private place0(): number
    {
        var u: number = 0, v: number = 0;
        while (u === 0)
        {
            u = Math.random();
        }
        while (v === 0)
        {
            v = Math.random();
        }
        let num: number = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        num = num / 10.0 + 0.5;
        if (num > 1 || num < 0)
        {
            return this.place0();
        }
        else
        {
            return num;
        }
    }
}
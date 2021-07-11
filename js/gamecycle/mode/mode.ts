import { loopgrid } from "../../container/loopgrid";
import { patternLib } from "../../lifegame/patternLib";

export abstract class mode
{
    name: string;

    interval: number;

    /**
     * From pattern libs, choose one pattern.
     */
    patterns: { pattern: (grid: loopgrid, x: number, y: number) => void, top: number }[] = [];

    succ: { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
        undefined;


    constructor(name: string, interval: number, data: any, patterns: { type: string, weight: number }[],
        succ: { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
            { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
            undefined
    )
    {
        this.name = name;
        this.interval = interval;
        var lastTop: number = 0;
        for (var i = 0; i < patterns.length; i++)
        {
            this.patterns[i] = {
                pattern: patternLib.get(patterns[i].type),
                top: lastTop = patterns[i].weight + lastTop
            }
        }
    }

    getName(): string { return this.name; }

    getInterval(): number { return this.interval; }

    getPattern(): (grid: loopgrid, x: number, y: number) => void
    {
        var currentPattern: (grid: loopgrid, x: number, y: number) => void;
        var random = Math.random() * this.patterns[this.patterns.length - 1].top;
        for (var pattern of this.patterns)
        {
            if (random < pattern.top)
            {
                currentPattern = pattern.pattern;
                break;
            }
        }
        return currentPattern;
    }

    /**
     * The generate place of the foe. position = place() * width_of_screen
     */
    abstract place(): number;

    finish():
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
        undefined
    {
        return this.succ;
    }
}
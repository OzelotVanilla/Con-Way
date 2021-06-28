import { loopgrid } from "../../container/loopgrid";

export abstract class mode
{
    name: string;

    interval: number;

    /**
     * From pattern libs, choose one pattern.
     */
    pattern: (grid: loopgrid, x: number, y: number) => void;

    constructor(name: string, interval: number, pattern: (grid: loopgrid) => void, data: any)
    {
        this.name = name;
        this.interval = interval;
        this.pattern = pattern;
    }

    getName(): string { return this.name; }

    getInterval(): number { return this.interval; }

    getPattern(): (grid: loopgrid, x: number, y: number) => void
    {
        return this.pattern;
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
        return undefined;
    }
}
import { mode } from "./mode"

export class ScanningMode extends mode
{

    initial_place: number;
    offset: number;
    current_place: number;

    constructor(name: string, interval: number, data: { initial_place: number, offset: number }, patterns: { type: string, weight: number }[],
        succ: { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
            { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
            undefined)
    {
        super(name, interval, data, patterns, succ);
        this.offset = data.offset;
        this.initial_place = data.initial_place;
        this.current_place = data.initial_place;
    }

    place(): number
    {
        this.current_place = this.current_place + this.offset;
        if (this.current_place > 1)
        {
            this.current_place -= 1;
        } else
        {
            if (this.current_place < 0)
            {
                this.current_place += 1;
            }
        }
        return this.current_place;
    }

    finish():
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
        undefined
    {
        this.current_place = this.initial_place;
        return super.finish();
    }
}
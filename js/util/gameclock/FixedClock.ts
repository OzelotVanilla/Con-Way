import { clock } from "js/util/gameclock/clock";


export class FixedClock extends clock
{

    transformation: (source_time: number) => number;

    invert_transformation: (time: number) => number;

    constructor(source: clock, transformation: (source_time: number) => number, invert_transformation: (time: number) => number)
    {
        super(source);
        this.transformation = transformation;
        this.invert_transformation = invert_transformation;
    }

    getTime(): number
    {
        return this.transformation(this.reference.getTime());
    }

    setTimeout(task: (...args: any[]) => void, timeout: number = 0, ...args: any[]): number
    {
        let current_time: number = this.reference.getTime();
        let interval: number = this.invert_transformation(current_time + timeout) - this.invert_transformation(current_time);
        return this.reference.setTimeout(task, interval, ...args);
    }

    setInterval(task: (...args: any[]) => void, timeout: number = 0, ...args: any[]): number
    {
        let current_time: number = this.reference.getTime();
        let interval: number = this.invert_transformation(current_time + timeout) - this.invert_transformation(current_time);
        return this.reference.setInterval(task, interval, ...args);
    }
}
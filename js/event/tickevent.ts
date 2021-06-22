import { event } from "./event";

export class tickevent extends event
{
    current_time: number;

    constructor(name: string, current_time: number, action: (e: event) => any)
    {
        super(name, action);
        this.current_time = current_time;
    }

    getCurrentTime(): number
    {
        return this.current_time;
    }
}
// import { entity } from "../../entity/entity"

export class effect
{
    name: string;
    action: () => any;

    /**
     * Duration of the effect in tick
     */
    duration: number;

    constructor(name: string, action: () => any, duration_in_tick: number)
    {
        this.name = name;
        this.action = action;
        this.duration = duration_in_tick;
    }
}
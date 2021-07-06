// import { entity } from "../../entity/entity"

export class effect
{
    name: string;
    action: () => any;
    duration: number;

    constructor(name: string, action: () => any, duration: number)
    {
        this.name = name;
        this.action = action;
        this.duration = duration;
    }
}
import { event } from "../../js/event/event";
import { eventbus } from "../../js/event/eventbus";

export var sst: savestate;

export class savestate
{
    name: string;
    stage: string;
    score: number;

    constructor(name: string = "User", stage: string = "meadow", score: number = 0)
    {
        this.name = name;
        this.stage = stage;
        this.score = score;
    }
}

export function subscribeEvents(bus: eventbus): void
{
    bus.subscribe("init", onInit);
}

function onInit(ev: event): void 
{
    console.log("onInit");
    sst = new savestate(
        localStorage.getItem("name"),
        localStorage.getItem("stage"),
        Number(localStorage.getItem("score"))
    );
    console.log(sst);
}

import { event } from "js/event/event";
import { global } from "js/event/eventbus";

export class CompleteInitEvent extends event<global, CompleteInitEvent>
{
    constructor()
    {
        super("init_complete", (glo) => { });
    }
}
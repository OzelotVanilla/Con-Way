import { event } from "./event";
import { global } from "./eventbus";

export class CompleteInitEvent extends event<global, CompleteInitEvent>
{
    constructor()
    {
        super("init_complete", (glo) => { });
    }
}
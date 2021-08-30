import { event } from "./event";
import { global } from "./eventbus";

export class completeinitevent extends event<global, completeinitevent>
{
    constructor()
    {
        super("init_complete", (glo) => { });
    }
}
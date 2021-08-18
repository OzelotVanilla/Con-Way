import { event } from "./event";
import { global } from "./eventbus";

export class completeinitevent extends event<global>
{
    constructor()
    {
        super("init_complete", (glo) => { });
    }
}
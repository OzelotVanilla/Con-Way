import { savestate } from "../../pages/game/savestate";
import { event } from "./event";

/**
 * Begin game ticking (game loop).
 */
export class initevent extends event
{

    sst: savestate;

    constructor(init: () => void)
    {
        super("init", init);
    }

    setSST(sst: savestate): void
    {
        this.sst = sst;
    }
}
import { event } from "./event";
import { eventbus } from "./eventbus";
import { tickbeginevent } from "./tickbeginevent";

/**
 * Begin game ticking (game loop).
 */
export class startgameevent extends event
{
    constructor(event_bus: eventbus)
    {
        super("game_start", () => event_bus.post(new tickbeginevent()));
    }
}
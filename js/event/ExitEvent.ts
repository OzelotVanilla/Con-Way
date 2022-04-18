import { event } from "js/event/event";
import { global } from "js/event/eventbus";

/**
 * Save user's state before exit
 */

export class ExitEvent extends event<global, ExitEvent> {

    constructor()
    {
        super("exit", undefined);
    }

}
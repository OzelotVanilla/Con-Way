import { event } from "./event";
import { global } from "./eventbus";

/**
 * Save user's state before exit
 */

export class ExitEvent extends event<global, ExitEvent> { }
import { event } from "./event";
import { global } from "./eventbus";

/**
 * Save user's state before exit
 */

export class exitevent extends event<global, exitevent> { }
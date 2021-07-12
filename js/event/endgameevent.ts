import { event } from "./event";
import { eventbus } from "./eventbus";
import { savestate } from "../../pages/game/savestate";

/**
 * While the player can go next stage, or dead, this event is called.
 */

export class endgameevent extends event<never>
{

}
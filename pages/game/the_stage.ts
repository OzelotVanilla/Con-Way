import { stage } from "../../js/lifegame/stage";
import { savestate } from "./savestate";

/**
 * The save state. It will be initialized during every newgameevent.
 */
export var sst: savestate;

/**
 * The stage. It will be initialized during every newgameevent's post_action step.
 */
export var the_stage: stage;
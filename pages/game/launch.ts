import { initializeEventActions, processBegin } from "./game_process";
import the_stage = require("./the_stage");
import game_process = require("game_process");
import { event_bus } from "../../js/event/eventbus";
import { CompleteInitEvent } from "../../js/event/CompleteInitEvent";


function subscribeEvents(): void
{
    the_stage.subscribeEvents();
    game_process.subscribeEvents();
}

/**
 * Entry of the game
 */

initializeEventActions();

console.log("event action initialized.");

subscribeEvents();

console.log("event subscriber initialized.");

event_bus.post(new CompleteInitEvent(), undefined, processBegin);

console.log("process began.");
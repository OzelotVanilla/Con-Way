import { initializeEventActions, processBegin } from "./game_process";
import stage = require("../../js/lifegame/stage");
import game_process = require("game_process");
import { event_bus } from "../../js/event/eventbus";
import { completeinitevent } from "../../js/event/completeinitevent";


function subscribeEvents(): void
{
    stage.subscribeEvents();
    game_process.subscribeEvents();
}

/**
 * Entry of the game
 */

initializeEventActions();

console.log("event action initialized.");

subscribeEvents();

console.log("event subscriber initialized.");

event_bus.post(new completeinitevent(), undefined, processBegin);

console.log("process began.");
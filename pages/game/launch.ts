import { initializeEvents, processBegin } from "pages/game/game_process";
import the_stage = require("pages/game/the_stage");
import game_process = require("pages/game/game_process");


function subscribeEvents(): void
{
    the_stage.subscribeEvents();
    game_process.subscribeEvents();
}

/**
 * Entry of the game
 */

/**
 * 
 */
initializeEvents();

console.log("event action initialized.");

subscribeEvents();

console.log("event subscriber initialized.");

processBegin();

console.log("process began.");
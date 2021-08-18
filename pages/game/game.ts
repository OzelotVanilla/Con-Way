import { event_bus } from "../../js/event/eventbus"
import { tickstopevent } from "../../js/event/tickstopevent"
import { downKey, upKey } from "./moveconverter";
import { completeinitevent } from "../../js/event/completeinitevent";
import { initializeEventActions, processBegin } from "./game_process";
import stage = require("../../js/lifegame/stage");
import game_process = require("game_process");

export var block_length = 10;

export var canvas: HTMLCanvasElement;

export function pauseGame(callback: () => void): void
{
    event_bus.post(new tickstopevent(), undefined, callback);
    return;
}

export function resumeGame(callback: () => void): void
{
    event_bus.post(new tickstopevent(), undefined, callback);
    return;
}

export function pressKey(event: KeyboardEvent)
{
    if (needPauseFromUserKeybooard(event))
    {
        pauseGame(() => { });
    }
    else
    {
        downKey(event);
    }
}

export function releaseKey(event: KeyboardEvent)
{
    upKey(event);
}

function needPauseFromUserKeybooard(event: KeyboardEvent): boolean
{
    let should_pause_key: string[] = [" ", "Escape"];
    if (should_pause_key.indexOf(event.key) !== -1) { return true; }
    else { return false; }
}

/**
 * Set a canvas's width and height to the width and the height.
 */
function setCanvas(canvas: HTMLCanvasElement, width: number, height: number)
{
    console.log("Original canvas: " + canvas.width + ", " + canvas.height);
    console.log("Setting canvas at " + width + ", " + height);
    canvas.width = width;
    canvas.height = height;
    console.log("Setting colour to white...");
    canvas.getContext("2d").fillStyle = "#ffffff";
}

export function resize(ev: Event): void
{
    console.log("Page resizing canvas...");
    setCanvas(canvas, (<Window>ev.currentTarget).innerWidth, (<Window>ev.currentTarget).innerHeight);
}


/**
 * Invoke before posting tickbeginevent.
 */
function initializeCanvas(): void
{
    // Create canvas and element on canvas based on user's device's width
    canvas = <HTMLCanvasElement>($("#cwf")[0]);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvas(canvas, window.innerWidth, window.innerHeight);

    // Init the canvas and its context.
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
}

function subscribeEvents(): void
{
    stage.subscribeEvents();
    game_process.subscribeEvents();
}

/**
 * Entry of the game
 */
initializeCanvas();

initializeEventActions();

subscribeEvents();

event_bus.post(new completeinitevent(), undefined, processBegin);
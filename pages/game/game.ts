import { event_bus } from "../../js/event/eventbus"
import { tickstopevent } from "../../js/event/tickstopevent"
import { golSpace, rules } from "../../js/entity/golSpace";
import { player } from "../../js/entity/player";
import { downKey, upKey } from "./moveconverter";

readonly var block_length = 10;

export var canvas: HTMLCanvasElement;

/**
 * The main golSpace on the screen.
 */
export var the_space: golSpace;

export var the_player: player;

export function pauseGame(): void
{
    event_bus.post(new tickstopevent());
    return;
}

export function resumeGame(): void
{
    event_bus.post(new tickstopevent());
    return;
}

export function pressKey(event: KeyboardEvent)
{
    if (needPauseFromUserKeybooard(event))
    {
        pauseGame();
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

function initializeSpace(): void
{
    var width = Math.round(width / block_length);
    var height = Math.round(height * 2 / block_length);
    the_space = new golSpace(
        { xPos: 0, yPos: 0, xVelocity: 0, yVelocity: 0 },
        { width: width, height: height, absoluteWidth: canvas.width, absoluteHeight: canvas.height },
        { minX: 0, maxX: width, minY: Math.round(height / 4), maxY: Math.round(height * 3 / 4) + 1 },
        undefined, canvas.getContext("2d"), rules.b3s23
    );
}

function initializePlayer(): void
{
    the_player = new player();
}

/**
 * Entry of the game
 */
initializeCanvas();
initializeSpace();
initializePlayer();
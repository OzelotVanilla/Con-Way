import { event_bus } from "../../js/event/eventbus"
import { startgameevent } from "../../js/event/startgameevent"
import { tickstopevent } from "../../js/event/tickstopevent"
import { initevent } from "../../js/event/initevent";
import { sst } from "./savestate";
import { golSpace, rules } from "../../js/entity/golSpace";
import golSpace_ts = require("../../js/entity/golSpace");
import { onStartGame } from "../../js/lifegame/stage";

var canvas: HTMLCanvasElement;

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

export function pressKey() { }

export function releaseKey() { }

function setCanvas(canvas: HTMLCanvasElement, width: number, height: number, block_length: number = 10)
{
    console.log("Original canvas: " + canvas.width + ", " + canvas.height);
    console.log("Setting canvas at " + width + ", " + height);
    canvas.width = width;
    canvas.height = height;
    console.log("Setting colour to white...");
    canvas.getContext("2d").fillStyle = "#ffffff";
    return [Math.round(width / block_length), Math.round(height * 2 / block_length)];
}

export function resize(ev: Event): void
{
    console.log("Page resizing canvas...");
    setCanvas(canvas, (<Window>ev.currentTarget).innerWidth, (<Window>ev.currentTarget).innerHeight);
}

/**
 * Entry of the game
 */
$(
    () => 
    {
        event_bus.post(
            new initevent(
                () =>
                {
                    canvas = initialize();
                    event_bus.post(new startgameevent(event_bus, sst));
                }
            )
        );
    }
);

/**
 * Invoke before posting tickbeginevent.
 */
function initialize(): HTMLCanvasElement
{
    subscribeEvents();
    // Create canvas and element on canvas based on user's device's width
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>($("#cwf")[0]);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var [width, height] = setCanvas(canvas, window.innerWidth, window.innerHeight);

    // Init the canvas
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    golSpace_ts.the_space = new golSpace(
        { xPos: 0, yPos: 0, xVelocity: 0, yVelocity: 0 },
        { width: width, height: height, absoluteWidth: canvas.width, absoluteHeight: canvas.height },
        { minX: 0, maxX: width, minY: Math.round(height / 4), maxY: Math.round(height * 3 / 4) + 1 },
        undefined, context, () => false, rules.b3s23
    );
    return canvas;
}

function subscribeEvents(): void
{
    event_bus.subscribe("game_start", onStartGame);
}
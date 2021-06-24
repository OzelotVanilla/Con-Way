import { event } from "./event";
import { event_bus } from "../../js/event/eventbus";
import { golSpace, rules } from "../../js/entity/golSpace";
import { patternLib } from "../../js/lifegame/patternLib";

/**
 * News and posts it every tick. (- _- )
 */
export class tickevent extends event
{
    current_time: number;

    constructor(current_time: number)
    {
        super("tick", () => space.tick(current_time));
        this.current_time = current_time;
    }

    getCurrentTime(): number
    {
        return this.current_time;
    }
}

/**
 * The main golSpace on the screen.
 */
export var space: golSpace;

var lastTime: number;

/**
 * Delay between two ticks.
 */
export var delay: number = 50;

var ticking: boolean = false;

/**
 * Invoke before posting tickbeginevent.
 */
export function initialize(): void
{
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>($("#cwf")[0]);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var sideLength: number = 10;
    var width: number = Math.round(canvas.width / sideLength);
    var height: number = Math.round(canvas.height * 2 / sideLength);
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    space = new golSpace({ xPos: 0, yPos: 0, xVelocity: 0, yVelocity: 0 },
        { width: width, height: height, absoluteWidth: canvas.width, absoluteHeight: canvas.height },
        { minX: 0, maxX: width, minY: Math.round(height / 4), maxY: Math.round(height * 3 / 4) + 1 },
        undefined, context, () => false, rules.b3s23);

    lastTime = new Date().getTime();
    patternLib.get("glider")(space.grid, 5, space.grid.getHeight() - 1);
}

/**
 * Begins and stops the game.
 */
event_bus.subscribe("tick_begin", () =>
{
    ticking = true;
    setTimeout(tick, delay);
});

event_bus.subscribe("tick_stop", () => ticking = false);

/**
 * The tick function.
 */
function tick(): void
{
    var now: number = new Date().getTime();
    event_bus.post(new tickevent(now));
    if (ticking)
    {
        var sleep: number = delay - now + lastTime;
        if (sleep >= 0)
        {
            lastTime += delay;
        }
        else
        {
            lastTime = now;
        }
        setTimeout(tick, delay);
    }
}
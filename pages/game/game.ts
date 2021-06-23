import { golSpace, rules } from "../../js/entity/golSpace";
import { event_bus } from "../../js/event/eventbus";
import { tickevent } from "../../js/event/tickevent";
import { patternLib } from "../../js/lifegame/patternLib";

var space: golSpace;

var lastTime: number;

export var delay: number = 500;

function tick(): void
{
    var now: number = new Date().getTime();
    event_bus.post(new tickevent("tick", now, () => space.tick(now)));
    setTimeout(tick, delay - now + lastTime);
    lastTime += delay;
}

$(function ()
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
        { minX: 0, maxX: width, minY: Math.round(height / 4), maxY: Math.round(height * 3 / 4) },
        undefined, context, () => false, rules.scroll);

    lastTime = new Date().getTime();
    patternLib.get("glider")(space.grid, 5, space.grid.getHeight() - 1);
    tick();
})
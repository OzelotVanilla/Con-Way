declare function $(...args: any): any;

import { golSpace, rules } from "../../js/entity/golSpace";
import { event_bus } from "../../js/event/eventbus";
import { tickevent } from "../../js/event/tickevent";
import { patternLib } from "../../js/lifegame/patternLib";

var canvas: CanvasRenderingContext2D = (<HTMLCanvasElement>$("#cwf")[0]).getContext("2d");

canvas.fillStyle = "#ffffff";

var space: golSpace = new golSpace(0, 0, 0, 0, 100, 200, 20, undefined, canvas, () => false, rules.b3s23);

var lastTime: number;

function tick(): void
{
    var now: number = new Date().getTime();
    event_bus.post(new tickevent("tick", now, () => space.tick(now)));
    setTimeout(tick, 50 - now + lastTime);
    lastTime += 50;
}

$(function ()
{
    lastTime = new Date().getTime();
    patternLib.get("lightWeight")(space.grid, 50, space.grid.getHeight());
    tick();
})
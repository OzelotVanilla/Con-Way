declare function $(...args: any): any;

import { golSpace, rules } from "../../js/entity/golSpace";
import { event_bus } from "../../js/event/eventbus";
import { event } from "../../js/event/event";
import { patternLib } from "../../js/lifegame/patternLib";

var space: golSpace = new golSpace(0, 0, 0, 0, 100, 200, 20, undefined, $("#cwf"), () => false, rules.b3s23);

var lastTime: number;

var tick: (e: event) => void = (e: event) => {
    var now: number = new Date().getTime();
    space.tick(now);
    setTimeout(() => event_bus.post(new event("tick", tick)), 50 - now + lastTime);
    lastTime += 50;
}

$(function () {
    lastTime = new Date().getTime();
    event_bus.post(new event("tick", tick));
    patternLib.get("lightWeight")(space.grid, 50, space.grid.getYWidth());
})
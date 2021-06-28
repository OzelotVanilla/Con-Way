import { initialize as patternLib } from "../../js/lifegame/patternLib";
import { event_bus } from "../../js/event/eventbus"
import { startgameevent } from "../../js/event/startgameevent"
import { tickstopevent } from "../../js/event/tickstopevent"
import { initialize } from "../../js/event/tickevent"
import { initevent } from "../../js/event/initevent";

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

event_bus.subscribe("init", patternLib);

$(() => event_bus.post(new initevent(() =>
{
    initialize();
    event_bus.post(new startgameevent(event_bus));
}
)));
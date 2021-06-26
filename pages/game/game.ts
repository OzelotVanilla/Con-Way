import { event_bus } from "../../js/event/eventbus"
import { tickbeginevent } from "../../js/event/tickbeginevent"
import { tickstopevent } from "../../js/event/tickstopevent"
import { initialize } from "../../js/event/tickevent"
import { patternLib, initializer } from "../../js/lifegame/patternLib";

function init(): void
{
    if (patternLib === undefined)
    {
        initializer.initialize = init;
        return;
    }
    else
    {
        initialize();
        event_bus.post(new tickbeginevent());
    }
}

function pauseGame(): void
{
    event_bus.post(new tickstopevent());
    return;
}

function resumeGame(): void
{
    event_bus.post(new tickstopevent());
    return;
}

$(init);
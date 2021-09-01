import { event_bus } from "../../js/event/eventbus"
import { TickStopEvent } from "../../js/event/TickStopEvent"
import { downKey, upKey } from "./moveconverter";


export function pauseGame(callback: () => void): void
{
    event_bus.post(new TickStopEvent(), undefined, callback);
    return;
}

export function resumeGame(callback: () => void): void
{
    event_bus.post(new TickStopEvent(), undefined, callback);
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


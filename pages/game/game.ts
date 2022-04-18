import { event_bus } from "js/event/eventbus"
import { downKey, upKey } from "pages/game/moveconverter";
import { isTicking } from "./game_cycle";


export function pauseGame(callback: () => void = undefined): void
{
    event_bus.launchEvent("tick_stop", undefined, callback);
    return;
}

export function resumeGame(callback: () => void = undefined): void
{
    event_bus.launchEvent("tick_begin", undefined, callback);
    return;
}

export function isGamePaused(): boolean
{
    return isTicking();
}

export function pressKey(event: KeyboardEvent)
{
    if (needPauseFromUserKeybooard(event))
    {
        if (isGamePaused())
        {
            pauseGame();
        } else
        {
            resumeGame();
        }
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


export function registerSubscribers()
{
    $(document).on("keydown", <any>pressKey);
    $(document).on("keyup", <any>releaseKey);
}
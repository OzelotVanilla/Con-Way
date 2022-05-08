import { event_bus } from "js/event/eventbus"
import { downKey, upKey } from "pages/game/moveconverter";
import { game_clock } from "pages/game/game_clock";


export function pauseGame(callback: () => void = undefined): void
{
    game_clock.setTimeRate(0);
    if(callback !== undefined) {
        callback();
    }
    return;
}

export function resumeGame(callback: () => void = undefined): void
{
    game_clock.setTimeRate(1);
    if(callback !== undefined) {
        callback();
    }
    return;
}

export function isGamePaused(): boolean
{
    return game_clock.getCurrentTimeRate() === 0;
}

export function pressKey(event: KeyboardEvent)
{
    if (needPauseFromUserKeybooard(event))
    {
        if (isGamePaused())
        {
            resumeGame();
        } else
        {
            pauseGame();
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
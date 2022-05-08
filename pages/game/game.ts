import { event_bus } from "js/event/eventbus"
import { downKey, upKey } from "pages/game/moveconverter";
import { game_clock } from "pages/game/game_clock";


export function pauseGame(callback: () => void = undefined): void
{
    game_clock.setTimeRate(0);
    $("body")[0].innerHTML = $("body")[0].innerHTML +
        `
            <div id="pause_background"
                style="background-color: #00000030; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100;" >
                <div id="pause_tip"
                    style="background-color: #ffffff; position: absolute; left: 50%; top: 50%;
                           -webkit-transform: translate(-50%,-50%);
                           -moz-transform: translate(-50%,-50%);
                           transform:translate(-50%,-50%);">
                    Game paused, press "space to start again"
                </div>
            </div>
        `;
    $("#pause_background, #pause_tip").trigger("click", resumeGame);
    if (callback !== undefined)
    {
        callback();
    }
    return;
}

export function resumeGame(callback: () => void = undefined): void
{
    game_clock.setTimeRate(1);
    $("#pause_background, #pause_tip").remove();
    if (callback !== undefined)
    {
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
        }
        else
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
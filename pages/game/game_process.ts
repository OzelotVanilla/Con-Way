import { event_bus, global } from "js/event/eventbus";
import { NewGameEvent } from "js/event/NewGameEvent";
import { OverGameEvent } from "js/event/OverGameEvent";
import { VictoryGameEvent } from "js/event/VictoryGameEvent";
import { StartGameEvent } from "js/event/StartGameEvent";
import { TickBeginEvent } from "js/event/TickBeginEvent";
import { FoeGen } from "js/foe_gen/FoeGen";
import { TickEvent } from "js/event/TickEvent";
import { detainablestate } from "js/event/eventstate";
import { GolSpace } from "js/entity/GolSpace";
import { TickStopEvent } from "js/event/TickStopEvent";
import { tickBegin, tickStop } from "pages/game/game_cycle";
import { EndGameEvent } from "js/event/EndGameEvent";
import { registerSubscribers as registerSubscribersOfMoveConverter } from "./moveconverter";
import { ExitEvent } from "../../js/event/ExitEvent";
import { registerSubscribers as registerSubscribersOfGame } from "./game";

//This ts file controls the game's life cycle from initialize to the end.

/**
 * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
 */
export function processBegin(): void
{
    event_bus.launchEvent("game_new", undefined, (event: NewGameEvent) =>
    {
        console.log("game_new complete.");
        event_bus.post(new StartGameEvent(event.sst, event.the_stage), undefined, () =>
        {
            console.log("game_start complete.");
            event_bus.launchEvent("tick_begin", undefined, () =>
            {
                console.log("tick_begin complete.");
            });
        });
    });
}

/**
 * The default_action of the newgameevent.
 */
function onNewGame(): void
{
    console.log("game_new action.");
}

/**
 * The default_action of the startgameevent.
 */
function onStartGame(): void
{
    console.log("game_start action.");
}

export function initializeEvents(): void
{
    NewGameEvent.setDefaultAction(onNewGame);
    event_bus.registerEventType("game_new", () => new NewGameEvent(), true);
    StartGameEvent.setDefaultAction(onStartGame);
    event_bus.registerEventType("game_start", undefined);
    event_bus.registerEventType("tick", undefined, true);
    TickBeginEvent.setDefaultAction(tickBegin);
    event_bus.registerEventType("tick_begin", () => new TickBeginEvent(), true);
    TickStopEvent.setDefaultAction(tickStop);
    event_bus.registerEventType("tick_stop", () => new TickStopEvent(), true);
    OverGameEvent.setDefaultAction(() =>
    {
        event_bus.post(new TickStopEvent(), undefined, undefined);
        setTimeout(() => { location.replace("/") }, 2500);
    });
    event_bus.registerEventType("game_over", () => new OverGameEvent());
    VictoryGameEvent.setDefaultAction(() => { });
    event_bus.registerEventType("game_victory", () => new VictoryGameEvent());

    event_bus.registerEventType("exit", () => new ExitEvent());

}

export function subscribeEvents(): void
{
    event_bus.subscribePostAction("game_start",
        (ev: detainablestate<global, StartGameEvent>, ent: undefined) =>
        {
            let the_foegen: FoeGen = ev.event.the_stage.gen_method;

            let foegen_begin: (ev: detainablestate<GolSpace, TickEvent>) => void =
                (ev: detainablestate<GolSpace, TickEvent>) =>
                {
                    the_foegen.tick(ev.event);
                }

            event_bus.subscribePostAction("tick", foegen_begin);

            let foegen_stop: (ev: detainablestate<GolSpace, TickEvent>) => void =
                (ev: detainablestate<GolSpace, TickEvent>) =>
                {
                    event_bus.desubscribePostAction("tick", foegen_begin);
                    event_bus.desubscribePreAction("game_end", foegen_stop);
                }

            event_bus.subscribePreAction("game_end", foegen_stop);
        }
    );

    event_bus.subscribePostAction("game_start",
        (ev: detainablestate<global, StartGameEvent>, ent: undefined) =>
        {
            ev.event.the_stage.bgm.play();
        }
    );

    event_bus.subscribePostAction("game_end",
        (ev: detainablestate<global, EndGameEvent>, ent: undefined) =>
        {
            ev.event.the_stage.bgm.pause();
        }
    );
    registerSubscribersOfMoveConverter();
    registerSubscribersOfGame();
}
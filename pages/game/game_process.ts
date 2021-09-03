import { event_bus, global } from "../../js/event/eventbus";
import { NewGameEvent } from "../../js/event/NewGameEvent";
import { savestate } from "./savestate";
import { OverGameEvent } from "../../js/event/OverGameEvent";
import { VictoryGameEvent } from "../../js/event/VictoryGameEvent";
import { StartGameEvent } from "../../js/event/StartGameEvent";
import { TickBeginEvent } from "../../js/event/TickBeginEvent";
import { FoeGen } from "../../js/foe_gen/FoeGen";
import { TickEvent } from "../../js/event/TickEvent";
import { detainablestate } from "../../js/event/eventstate";
import { GolSpace } from "../../js/entity/GolSpace";
import { TickStopEvent } from "../../js/event/TickStopEvent";
import { tickBegin, tickStop } from "./game_cycle";
import { EndGameEvent } from "../../js/event/EndGameEvent";

//This ts file controls the game's life cycle from initialize to the end.

/**
 * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
 */
export function processBegin(): void
{
    let game_new: NewGameEvent = new NewGameEvent();
    event_bus.post(game_new, undefined, () =>
    {
        console.log("game_new complete.");
        event_bus.post(new StartGameEvent(game_new.sst, game_new.the_stage), undefined, () =>
        {
            console.log("game_start complete.");
            event_bus.post(new TickBeginEvent(), undefined, () =>
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

export function initializeEventActions(): void
{
    NewGameEvent.setDefaultAction(onNewGame);
    StartGameEvent.setDefaultAction(onStartGame);
    TickBeginEvent.setDefaultAction(tickBegin);
    TickStopEvent.setDefaultAction(tickStop);
    OverGameEvent.setDefaultAction(() => { });
    VictoryGameEvent.setDefaultAction(() => { });
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
}
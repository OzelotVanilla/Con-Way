import { event_bus } from "../../js/event/eventbus";
import { newgameevent } from "../../js/event/newgameevent";
import { savestate } from "./savestate";
import { overgameevent } from "../../js/event/overgameevent";
import { victorygameevent } from "../../js/event/victorygameevent";
import { startgameevent } from "../../js/event/startgameevent";
import { stage } from "../../js/lifegame/stage";
import { tickbeginevent } from "../../js/event/tickbeginevent";
import { foegen } from "../../js/gamecycle/foegen";
import { tickevent } from "../../js/event/tickevent";
import { detainablestate } from "../../js/event/eventstate";
import { golSpace } from "../../js/entity/golSpace";
import { tickstopevent } from "../../js/event/tickstopevent";
import { tickBegin, tickStop } from "./game_cycle";

//This ts file controls the game's life cycle from initialize to the end.

/**
 * The save state. It will be initialized during every newgameevent.
 */
export var sst: savestate;

/**
 * The stage. It will be initialized during every newgameevent's post_action step.
 */
export var the_stage: stage;

/**
 * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
 */
export function processBegin(): void
{
    event_bus.post(new newgameevent(), undefined, () =>
    {
        event_bus.post(new startgameevent(), undefined, () =>
        {
            event_bus.post(new tickbeginevent(), undefined, () =>
            {

            });
        });
    });
}

/**
 * The default_action of the newgameevent.
 */
function onNewGame(): void
{
    sst = new savestate(
        localStorage.getItem("name"),
        localStorage.getItem("stage"),
        Number(localStorage.getItem("score"))
    );

}

/**
 * The default_action of the startgameevent.
 */
function onStartGame(): void
{

}

export function initializeEventActions(): void
{
    newgameevent.setDefaultAction(onNewGame);
    overgameevent.setDefaultAction(onStartGame);
    victorygameevent.setDefaultAction(() => { });
    tickbeginevent.setDefaultAction(tickBegin);
    tickstopevent.setDefaultAction(tickStop);
}

export function subscribeEvents(): void
{
    event_bus.subscribePostAction("game_start",
        () =>
        {
            let the_foegen: foegen = the_stage.gen_method;

            let foegen_begin: (ev: detainablestate<golSpace, tickevent>) => void =
                (ev: detainablestate<golSpace, tickevent>) =>
                {
                    the_foegen.tick(ev.event);
                }

            event_bus.subscribePostAction("tick", foegen_begin);

            let foegen_stop: (ev: detainablestate<golSpace, tickevent>) => void =
                (ev: detainablestate<golSpace, tickevent>) =>
                {
                    event_bus.desubscribePostAction("tick", foegen_begin);
                    event_bus.desubscribePreAction("game_end", foegen_stop);
                }

            event_bus.subscribePreAction("game_end", foegen_stop);
        }
    );

    event_bus.subscribePostAction("game_start",
        () =>
        {
            the_stage.bgm.play();
        }
    );

    event_bus.subscribePostAction("game_stop",
        () =>
        {
            the_stage.bgm.pause();
        }
    );
}
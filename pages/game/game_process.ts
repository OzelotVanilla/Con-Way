import { event_bus, global } from "../../js/event/eventbus";
import { newgameevent } from "../../js/event/newgameevent";
import { savestate } from "./savestate";
import { overgameevent } from "../../js/event/overgameevent";
import { victorygameevent } from "../../js/event/victorygameevent";
import { startgameevent } from "../../js/event/startgameevent";
import { tickbeginevent } from "../../js/event/tickbeginevent";
import { foegen } from "../../js/gamecycle/foegen";
import { tickevent } from "../../js/event/tickevent";
import { detainablestate } from "../../js/event/eventstate";
import { golSpace } from "../../js/entity/golSpace";
import { tickstopevent } from "../../js/event/tickstopevent";
import { tickBegin, tickStop } from "./game_cycle";
import the_stage_ts = require("the_stage");
import { endgameevent } from "../../js/event/endgameevent";

//This ts file controls the game's life cycle from initialize to the end.

/**
 * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
 */
export function processBegin(): void
{
    let game_new: newgameevent = new newgameevent();
    event_bus.post(game_new, undefined, () =>
    {
        console.log("game_new complete.");
        event_bus.post(new startgameevent(game_new.sst, game_new.the_stage), undefined, () =>
        {
            console.log("game_start complete.");
            event_bus.post(new tickbeginevent(), undefined, () =>
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
    newgameevent.setDefaultAction(onNewGame);
    overgameevent.setDefaultAction(onStartGame);
    victorygameevent.setDefaultAction(() => { });
    tickbeginevent.setDefaultAction(tickBegin);
    tickstopevent.setDefaultAction(tickStop);
}

export function subscribeEvents(): void
{
    event_bus.subscribePostAction("game_start",
        (ev: detainablestate<global, startgameevent>, ent: undefined) =>
        {
            let the_foegen: foegen = ev.event.the_stage.gen_method;

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
        (ev: detainablestate<global, startgameevent>, ent: undefined) =>
        {
            ev.event.the_stage.bgm.play();
        }
    );

    event_bus.subscribePostAction("game_end",
        (ev: detainablestate<global, endgameevent>, ent: undefined) =>
        {
            ev.event.the_stage.bgm.pause();
        }
    );
}
import { stage } from "../../js/lifegame/stage";
import { savestate } from "./savestate";
import { foegen } from "../../js/gamecycle/foegen";
import { the_space } from "./the_space";
import { event_bus, global } from "../../js/event/eventbus";
import { detainablestate } from "../../js/event/eventstate";
import { newgameevent } from "../../js/event/newgameevent";


function onNewGame(ev: detainablestate<global, newgameevent>)
{
    var e: newgameevent = ev.event;
    var sst = e.sst;
    ev.detain();
    $.ajax(
        "/js/lifegame/stages/" + sst.stage + ".json",
        {
            dataType: "json"
        }
    ).done(
        (data: any) =>
        {
            foegen.loadFoegenFromJSON(data.mode, the_space.grid,
                gen =>
                {
                    e.the_stage = new stage(data.name, data.bgm, data.bkimg, data.length, gen);
                    e.the_stage.bgm.loop = true;
                    console.log("stage loaded.");
                    ev.release();
                }
            );
        }
    );
}

function beforeNewGame(ev: detainablestate<global, newgameevent>): void
{
    ev.event.sst = new savestate(
        localStorage.getItem("name"),
        localStorage.getItem("stage"),
        Number(localStorage.getItem("score"))
    );
    console.log("sst loaded.");
}

export function subscribeEvents(): void
{
    event_bus.subscribePreAction("game_new", beforeNewGame);
    event_bus.subscribePostAction("game_new", onNewGame);
}
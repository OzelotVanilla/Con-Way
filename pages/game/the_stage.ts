import { Stage } from "../../js/lifegame/Stage";
import { savestate } from "./savestate";
import { FoeGen } from "../../js/foe_gen/FoeGen";
import { the_space } from "./the_space";
import { event_bus, global } from "../../js/event/eventbus";
import { detainablestate } from "../../js/event/eventstate";
import { NewGameEvent } from "../../js/event/NewGameEvent";


function onNewGame(ev: detainablestate<global, NewGameEvent>)
{
    var e: NewGameEvent = ev.event;
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
            FoeGen.loadFoegenFromJSON(data.mode, the_space.grid,
                gen =>
                {
                    let the_stage = e.the_stage = new Stage(data.name, data.bgm, data.bkimg, data.length, gen);
                    e.the_stage.bgm.loop = true;
                    let playBgm = () => { the_stage.bgm.play() };
                    let pauseBgm = () =>
                    {
                        the_stage.bgm.pause();
                        event_bus.desubscribePostAction("game_start", playBgm);
                        event_bus.desubscribePostAction("game_end", pauseBgm);
                    };
                    event_bus.subscribePostAction("game_start", playBgm);
                    event_bus.subscribePostAction("game_end", pauseBgm);
                    console.log("stage loaded.");
                    ev.release();
                }
            );
        }
    );
}

function beforeNewGame(ev: detainablestate<global, NewGameEvent>): void
{
    let sst: savestate = new savestate(
        localStorage.getItem("name"),
        localStorage.getItem("stage"),
        Number(localStorage.getItem("score"))
    );
    ev.event.sst = sst;
    console.log("sst loaded: ", sst);
}

export function subscribeEvents(): void
{
    event_bus.subscribePreAction("game_new", beforeNewGame);
    event_bus.subscribePostAction("game_new", onNewGame);
}
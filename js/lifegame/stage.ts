import { tickevent } from "../event/tickevent";
import { tickbeginevent } from "../event/tickbeginevent";
import { tickstopevent } from "../event/tickstopevent";
import { startgameevent } from "../event/startgameevent";
import { foegen } from "../gamecycle/foegen";
import { the_space } from "../../js/entity/golSpace";
import { eventbus, event_bus } from "../event/eventbus";

/**
 * Complete stage object.
 */
export class stage
{
    name: string;
    bgm: HTMLAudioElement;
    bkimg: HTMLImageElement;
    length: number;
    gen_method: foegen;

    constructor(name: string, bgm_path: string, bkimg_path: string, length: number, gen_method: foegen)
    {
        this.name = name;
        this.bgm = new Audio("../../bgm/" + bgm_path);
        this.bkimg = new Image();
        this.bkimg.src = "../../img/" + bkimg_path;
        this.length = length;
        this.gen_method = gen_method; // TODO use name to load
    }
}

// Load existed stage name from stageLib.json, and create stageLib to save these stages

export var stages_names: string[] = JSON.parse(sessionStorage.getItem("stageLib")).stages;

export function subscribeEvents(bus: eventbus): void
{
    bus.subscribe("game_start", onStartGame);
}

function onStartGame(ev: startgameevent)
{
    var e: startgameevent = (<startgameevent>ev);
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
                    var the_stage = new stage(data.name, data.bgm, data.bkimg, data.length, gen);
                    the_stage.bgm.loop = true;
                    event_bus.subscribe("tick", (e: tickevent) => { gen.tick(e); });
                    event_bus.subscribe("tick_begin", () => { the_stage.bgm.play(); });
                    event_bus.subscribe("tick_stop", () => { the_stage.bgm.pause(); });
                    ev.release();
                }
            );
        }
    );
}
import { startgameevent } from "../event/startgameevent";
import { foegen } from "../gamecycle/foegen";
import { the_space } from "../../pages/game/the_space";
import { event_bus, global } from "../event/eventbus";
import { detainablestate, judgementstate } from "../event/eventstate";
import game_process = require("../../pages/game/game_process");

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

function onStartGame(ev: detainablestate<global, startgameevent>)
{
    var e: startgameevent = ev.event;
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
                    game_process.the_stage = new stage(data.name, data.bgm, data.bkimg, data.length, gen);
                    game_process.the_stage.bgm.loop = true;
                    ev.release();
                }
            );
        }
    );
}

export function subscribeEvents(): void
{
    event_bus.subscribePostAction("game_new", onStartGame);
}
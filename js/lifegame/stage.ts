import { event } from "../event/event";
import { foegen } from "../gamecycle/foegen";
import { the_space } from "../../js/entity/golSpace";
import { sst } from "../../pages/game/savestate";
import { eventbus } from "../event/eventbus";

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

    constructor(name: string, bgm_path: string, bkimg_path: string, length, gen_method: foegen)
    {
        this.name = name;
        this.bgm = new Audio(bgm_path);
        this.bkimg = new Image();
        this.bkimg.src = bkimg_path;
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

function onStartGame(ev: event)
{
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
                    ev.release();
                }
            );
        }
    );
}
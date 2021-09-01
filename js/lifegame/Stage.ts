import { FoeGen } from "../foe_gen/FoeGen";

/**
 * Complete stage object.
 */
export class Stage
{
    name: string;
    bgm: HTMLAudioElement;
    bkimg: HTMLImageElement;
    length: number;
    gen_method: FoeGen;

    constructor(name: string, bgm_path: string, bkimg_path: string, length: number, gen_method: FoeGen)
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


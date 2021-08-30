import { foegen } from "../gamecycle/foegen";

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


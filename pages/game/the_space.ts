import { GolSpace, rules } from "../../js/entity/GolSpace";
import { block_length, canvas } from "./canvas";

export var the_space;


function initializeSpace(): void
{
    var width = Math.round(canvas.width / block_length);
    var height = Math.round(canvas.height * 2 / block_length);
    the_space = new GolSpace(
        { x_pos: 0, y_pos: 0, x_velocity: 0, y_velocity: 0 },
        { width: width, height: height, absolute_width: canvas.width, absolute_height: canvas.height },
        { min_x: 0, max_x: width, min_y: Math.round(height / 4), max_y: Math.round(height * 3 / 4) + 1 },
        undefined, canvas.getContext("2d"), rules.b3s23
    );
}

initializeSpace();

console.log("the_space initialized");
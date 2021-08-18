import { golSpace, rules } from "../../js/entity/golSpace";
import { block_length, canvas } from "./game";

export var the_space;


function initializeSpace(): void
{
    var width = Math.round(width / block_length);
    var height = Math.round(height * 2 / block_length);
    the_space = new golSpace(
        { xPos: 0, yPos: 0, xVelocity: 0, yVelocity: 0 },
        { width: width, height: height, absoluteWidth: canvas.width, absoluteHeight: canvas.height },
        { minX: 0, maxX: width, minY: Math.round(height / 4), maxY: Math.round(height * 3 / 4) + 1 },
        undefined, canvas.getContext("2d"), rules.b3s23
    );
}
initializeSpace();
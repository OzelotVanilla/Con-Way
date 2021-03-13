import { entity } from "../lifegame/entity";
import { coordinateSpace } from "../lifegame/coordinate";

export class player extends entity {

    coordinate;
    hypercoordinate;

    constructor(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer, hypercoordinate) {
        super(32, 32);
        var newRenderer = function (x, y) {
            renderer(x + this.x, y + this.y);
        }
        this.coordinate = new coordinateSpace(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, newRenderer);
        this.hypercoordinate = hypercoordinate;
    }

    onDrag(x, y) {
        this.x = x;
        this.y = y;
    }

    tick() {
        coordinateSpace.tick(1);
        if (this.cycle == 50) {
            this.hypercoordinate
        }
    }

}
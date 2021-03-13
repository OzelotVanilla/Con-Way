import { entity } from "../lifegame/entity";

export class player extends entity {

    coordinate = null;

    constructor(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer) {
        this.coordinate = new coordinateSpace(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer);
    }

    onDrag(x, y) {
        this.x = x;
        this.y = y;
    }

    tick() {

    }
}
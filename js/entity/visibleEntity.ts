import { entity } from "./entity";
import { golSpace } from "./golSpace";

/**
 * A visible entity.
 */
export class visibleEntity extends entity {

    renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void;
    canvas: HTMLCanvasElement;

    constructor(type: string, xPos: number, yPos: number, xVelocity: number, yVelocity: number, space: golSpace,
        destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean, canvas: HTMLCanvasElement,
        renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void) {
        super(type, xPos, yPos, xVelocity, yVelocity, space, destructorCondition);
        this.renderer = renderer;
        this.canvas = canvas;
    }

    tick(time: number) {
        super.tick(time);
        if (!this.isDead) {
            this.renderer(this, this.xPos, this.yPos, this.space, this.canvas);
        }
    }
}
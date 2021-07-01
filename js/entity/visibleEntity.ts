import { entity } from "./entity";
import { golSpace } from "./golSpace";

/**
 * A visible entity.
 */
export class visibleEntity extends entity
{

    renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void;
    canvas: CanvasRenderingContext2D;
    autoRender: boolean;

    constructor(type: string, kinematics: { xPos: number, yPos: number, xVelocity: number, yVelocity: number }, space: golSpace, autoRender: boolean,
        destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean, canvas: CanvasRenderingContext2D,
        renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void)
    {
        super(type, kinematics, space, destructorCondition);
        this.renderer = renderer;
        this.canvas = canvas;
        this.autoRender = autoRender;
    }

    tick(time: number): void
    {
        super.tick(time);
        if ((!this.isDead) && this.autoRender)
        {
            this.renderer(this, this.xPos, this.yPos, this.space, this.canvas);
        }
    }
}
import { entity } from "./entity";
import { golSpace } from "./golSpace";

/**
 * A visible entity.
 */
export abstract class visibleEntity extends entity
{

    // renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void;
    canvas: CanvasRenderingContext2D;
    willAutoRender: boolean;

    constructor(type: string, kinematics: { xPos: number, yPos: number, xVelocity: number, yVelocity: number },
        space: golSpace, queAutoRender: boolean, canvas: CanvasRenderingContext2D,
        // renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void
    )
    {
        super(type, kinematics, space);
        // this.renderer = renderer;
        this.canvas = canvas;
        this.willAutoRender = queAutoRender;
    }

    tick(time: number): void
    {
        super.tick(time);
        if ((!this.isDead) && this.willAutoRender)
        {
            this.render();
        }
    }

    render(): void
    {

    }
}
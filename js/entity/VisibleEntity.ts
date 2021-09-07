import { entity } from "js/entity/entity";
import { GolSpace } from "js/entity/GolSpace";

/**
 * A visible entity.
 */
export abstract class VisibleEntity extends entity
{

    // renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void;
    canvas: CanvasRenderingContext2D;
    will_auto_render: boolean;

    constructor(type: string, kinematics: { x_pos: number, y_pos: number, x_velocity: number, y_velocity: number },
        space: GolSpace, que_auto_render: boolean, canvas: CanvasRenderingContext2D,
        // renderer: (vsb_ent: visibleEntity, x_pos: number, y_pos: number, spc: golSpace, canvas: any) => void
    )
    {
        super(type, kinematics, space);
        // this.renderer = renderer;
        this.canvas = canvas;
        this.will_auto_render = que_auto_render;
    }

    tick(time: number): void
    {
        super.tick(time);
        if ((!this.is_dead) && this.will_auto_render)
        {
            this.render();
        }
    }

    render(): void
    {

    }
}
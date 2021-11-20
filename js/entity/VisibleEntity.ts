import { entity } from "js/entity/entity";
import { GolSpace } from "js/entity/GolSpace";
import { block_length } from "pages/game/canvas";

/**
 * A visible entity.
 */
export abstract class VisibleEntity extends entity
{

    canvas_height: number;

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
        this.canvas_height = canvas.canvas.height;
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

    render(): void { }

    convertX(x: number): number
    {
        return x * block_length + this.space.absolute_x_pos;
    }

    convertY(y: number): number
    {
        return this.canvas_height - (y * block_length + this.space.absolute_y_pos);
    }

    deConvertX(x: number): number
    {
        return (x - this.space.absolute_x_pos) / block_length;
    }

    deConvertY(y: number): number
    {
        return (this.canvas_height - this.space.absolute_y_pos - y) / block_length;
    }
}
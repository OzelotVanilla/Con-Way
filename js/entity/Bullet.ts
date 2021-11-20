import { Player } from "js/entity/Player";
import { VisibleEntity } from "js/entity/VisibleEntity";
import { block_length } from "pages/game/canvas";

var r: number = block_length / 2;

export class Bullet extends VisibleEntity
{
    /**
     * Create a new flying bullet according to player's speed and position.
     * @param ply The player who shoot the bullet
     */
    constructor(ply: Player)
    {
        super(
            "bullet",
            { x_pos: ply.x_pos, y_pos: ply.y_pos, x_velocity: ply.x_velocity, y_velocity: ply.y_velocity + 1 },
            ply.space, true, ply.canvas
        );
    }

    tick(time: number): void
    {
        super.tick(time);

        if (this.y_pos < 0)
        {
            this.is_dead = true;
        }
        else
        {
            if (this.y_pos > this.space.height)
            {
                this.is_dead = true;
            }
        }

        // Project it in to grid

        // If there is a block in front of it, bullet will placed in there.
        // Else, it will move continuously

        var project_x: number = Math.floor(this.x_pos);
        var project_y: number = Math.floor(this.y_pos);

        if (this.space.isThisPosAlive(project_x, project_y))
        {
            this.space.setThisPosAlive(project_x, project_y, false);
            this.is_dead = true;
        }
    }

    render(): void
    {
        super.render();
        var y = this.convertY(this.y_pos);
        var x = this.convertX(this.x_pos);
        this.canvas.moveTo(x + r, y);
        this.canvas.arc(x, y, r, 0, Math.PI * 2);
    }
}
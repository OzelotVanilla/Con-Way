import { Player } from "js/entity/Player";
import { VisibleEntity } from "js/entity/VisibleEntity";

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
            { x_pos: ply.x_pos, y_pos: ply.y_pos, x_velocity: ply.x_velocity, y_velocity: ply.y_velocity },
            ply.space, true, ply.canvas
        );
    }

    tick(time: number): void
    {
        super.tick(time);
        // Move bullet according to its status

        // Project it in to grid

        // If there is a block in front of it, bullet will placed in there.
        // Else, it will move continuously
    }
}
import { player } from "./player";
import { visibleEntity } from "./visibleEntity";

export class bullet extends visibleEntity
{
    /**
     * Create a new flying bullet according to player's speed and position.
     * @param ply The player who shoot the bullet
     */
    constructor(ply: player)
    {
        super(
            "bullet",
            { xPos: ply.xPos, yPos: ply.yPos, xVelocity: ply.xVelocity, yVelocity: ply.yVelocity },
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
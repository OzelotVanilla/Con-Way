import { entity } from "./entity";
import { effect } from "../lifegame/speffect/effect"
import { endgameevent } from "../event/endgameevent"
import { event_bus } from "../event/eventbus"
import { the_space } from "./golSpace";

/**
 * The plane that player controls
 */
export class player extends entity
{
    hp: number;
    kill: number;

    /**
     * The buffer which contains the key: effect, and value : remaining tick it have.
     */
    effect_buffer: Map<effect, number>;

    constructor()
    {
        var c = the_space.canvas.canvas;
        super("player", { xPos: c.width / 2, yPos: c.height, xVelocity: 0, yVelocity: 0 }, the_space);
    }

    tick(time: number)
    {
        // Check if the player is already dead
        if (this.hp <= 0)
        {
            // event_bus.post(new endgameevent());
        }

        // Move player according to input


        // Subtract remaining effect tick
        for (var ef of this.effect_buffer)
        {
            this.effect_buffer.set(ef[0], ef[1] - 1);
        }

        // Shoot bullet part

    }
}
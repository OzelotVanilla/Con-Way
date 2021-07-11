import { entity } from "./entity";
import { visibleEntity } from "./visibleEntity"
import { effect } from "../lifegame/speffect/effect"
import { the_space } from "./golSpace";
import { event_bus } from "../event/eventbus";

/**
 * The plane that player controls
 */
export class player extends visibleEntity
{
    hp: number;
    kill: number;
    bullet_shoot_rate: number;

    /**
     * The buffer which contains the key: effect, and value : remaining tick it have.
     */
    effect_buffer: Map<effect, number>;

    constructor()
    {
        var c = the_space.canvas.canvas;
        super("player", { xPos: c.width / 2, yPos: c.height * 0.95, xVelocity: 0, yVelocity: 0 }, the_space, true, the_space.canvas);
    }

    tick(time: number)
    {
        var acc: { x: number, y: number } =
        {
            x: engine_vector.x_from_key + engine_vector.x_from_screen,
            y: engine_vector.y_from_key + engine_vector.y_from_screen
        };

        {
            let mod: number = Math.sqrt(acc.x * acc.x + acc.y * acc.y) / max_velocity;
            if (mod != 0)
            {
                acc.x = acc.x / mod;
                acc.y = acc.y / mod;
            }
        }

        this.xVelocity = this.xVelocity * fric + acc.x;
        this.yVelocity = this.yVelocity * fric + acc.y;

        super.tick(time);

        // Check if the player is already dead
        if (this.hp <= 0)
        {
            // event_bus.post(new endgameevent());
        }

        // Subtract remaining effect tick
        for (var ef of this.effect_buffer)
        {
            this.effect_buffer.set(ef[0], ef[1] - 1);
        }

        // Shoot bullet part
        this.shootAccordingTo(time);
    }

    shootAccordingTo(time: number)
    {
        if (time % this.bullet_shoot_rate === 0)
        {
            // Shoot a bullet
        }
    }
}

export var ply = new player();

const fric: number = 0.9;

const max_velocity = 1.0;

export var engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number } =
{
    x_from_key: 0,
    y_from_key: 0,
    x_from_screen: 0,
    y_from_screen: 0
}
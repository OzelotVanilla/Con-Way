import { visibleEntity } from "./visibleEntity"
import { effect } from "../lifegame/speffect/effect"
import { the_space } from "../../pages/game/game";
import { golSpace } from "./golSpace";

/**
 * The plane that player controls
 */
export class player extends visibleEntity
{
    hp: number;
    kill: number;
    bullet_shoot_rate: number;

    engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number };

    /**
     * The buffer which contains the key: effect, and value : remaining tick it have.
     */
    effect_buffer: Map<effect, number>;

    constructor(engine: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number },
        space: golSpace = the_space, pos: { xPos: number, yPos: number } = { xPos: space.width / 2, yPos: space.height * 0.05 })
    {
        var c = space.canvas.canvas;
        super("player", { xPos: pos.xPos, yPos: pos.yPos, xVelocity: 0, yVelocity: 0 }, space, true, space.canvas);
        this.engine_vector = engine;
    }

    tick(time: number)
    {
        var acc: { x: number, y: number } =
        {
            x: this.engine_vector.x_from_key + this.engine_vector.x_from_screen,
            y: this.engine_vector.y_from_key + this.engine_vector.y_from_screen
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

const fric: number = 0.9;

const max_velocity = 1.0;


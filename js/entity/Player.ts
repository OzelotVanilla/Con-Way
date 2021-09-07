import { VisibleEntity } from "js/entity/VisibleEntity"
import { Effect } from "js/lifegame/speffect/Effect"
import { GolSpace } from "js/entity/GolSpace";

/**
 * The plane that player controls
 */
export class Player extends VisibleEntity
{
    hp: number;
    kill: number;
    bullet_shoot_rate: number;

    engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number };

    /**
     * The buffer which contains the key: effect, and value : remaining tick it have.
     */
    effect_buffer: Map<Effect, number>;

    constructor(engine: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number },
        space: GolSpace, pos: { x_pos: number, y_pos: number } = { x_pos: space.width / 2, y_pos: space.height * 0.05 })
    {
        var c = space.canvas.canvas;
        super("player", { x_pos: pos.x_pos, y_pos: pos.y_pos, x_velocity: 0, y_velocity: 0 }, space, true, space.canvas);
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

        this.x_velocity = this.x_velocity * fric + acc.x;
        this.y_velocity = this.y_velocity * fric + acc.y;

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


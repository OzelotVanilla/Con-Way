import { VisibleEntity } from "js/entity/VisibleEntity"
import { Effect } from "js/lifegame/speffect/Effect"
import { GolSpace } from "js/entity/GolSpace";
import { Bullet } from "js/entity/Bullet";
import { event_bus } from "js/event/eventbus";
import { OverGameEvent } from "js/event/OverGameEvent";

/**
 * The plane that player controls
 */
export class Player extends VisibleEntity
{
    hp: number;
    kill: number;
    bullet_shoot_rate: number = 20;

    engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number, mouse_down: boolean };

    /**
     * The buffer which contains the key: effect, and value : remaining tick it have.
     */
    effect_buffer: Map<Effect, number> = new Map<Effect, number>();

    constructor(engine: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number, mouse_down: boolean },
        space: GolSpace, pos: { x_pos: number, y_pos: number } = { x_pos: space.width / 2, y_pos: space.height * 0.05 })
    {
        super("player", { x_pos: pos.x_pos, y_pos: pos.y_pos, x_velocity: 0, y_velocity: 0 }, space, true, space.canvas);
        this.engine_vector = engine;
    }

    invoke_count: number = 0;

    tick(time: number)
    {
        var acc: { x: number, y: number };

        if (this.engine_vector.mouse_down)
        {
            acc =
            {
                x: this.deConvertX(this.engine_vector.x_from_screen) - this.x_pos,
                y: this.deConvertY(this.engine_vector.y_from_screen) - this.y_pos
            };
            let mod: number = Math.sqrt(acc.x * acc.x + acc.y * acc.y);
            if (mod != 0)
            {
                let power = (acceleration_coefficient - acceleration_coefficient_times_three /
                    (mod + acceleration_coefficient_times_two)) / mod;
                acc.x = acc.x * power;
                acc.y = acc.y * power;
            }
        } else
        {
            acc =
            {
                x: this.engine_vector.x_from_key,
                y: this.engine_vector.y_from_key
            };
            let mod: number = Math.sqrt(acc.x * acc.x + acc.y * acc.y);
            if (mod != 0)
            {
                let power: number = acceleration_coefficient / mod;
                acc.x = acc.x / mod * power;
                acc.y = acc.y / mod * power;
            }
        }

        this.x_velocity = this.x_velocity * speed_reserve_rate + acc.x;
        this.y_velocity = this.y_velocity * speed_reserve_rate + acc.y;

        super.tick(time);

        // Check if the player is already dead
        if (this.hp <= 0)
        {
            // event_bus.post(new endgameevent());
        }

        {
            var x_int = Math.round(this.x_pos - 0.5);
            var y_int = Math.round(this.y_pos);
            if (this.space.isThisPosAlive(x_int, y_int) || this.space.isThisPosAlive(x_int + 1, y_int))
            {
                event_bus.post(new OverGameEvent(), undefined);
            }
        }

        // Subtract remaining effect tick
        for (var ef of this.effect_buffer)
        {
            this.effect_buffer.set(ef[0], ef[1] - 1);
        }

        // Shoot bullet part
        if (this.invoke_count % this.bullet_shoot_rate === 0)
        {
            this.shootAccordingTo(time);
            this.invoke_count = 1;
        } else
        {
            this.invoke_count += 1;
        }
    }

    shootAccordingTo(time: number)
    {
        new Bullet(this);
    }

    render(): void
    {
        super.render();
        var y = this.convertY(this.y_pos);
        var x = this.convertX(this.x_pos);

        this.canvas.moveTo(x, y - 5);
        this.canvas.lineTo(x - 10, y + 5);
        this.canvas.lineTo(x + 10, y + 5);
    }

}

var speed_reserve_rate: number;

var acceleration_coefficient: number;

var acceleration_coefficient_times_two: number;

var acceleration_coefficient_times_three: number;

export function setViscosity(viscosity: number, max_velocity: number): void
{
    if ((viscosity >= 0) && (max_velocity >= 0))
    {
        speed_reserve_rate = 1 - viscosity;
        acceleration_coefficient = max_velocity * viscosity;
        acceleration_coefficient_times_two = acceleration_coefficient * acceleration_coefficient;
        acceleration_coefficient_times_three = acceleration_coefficient_times_two * acceleration_coefficient;
    }
    else
    {
        throw "The viscosity and max_velocity shouldn't be negative."
    }
}

setViscosity(0.2, 5);
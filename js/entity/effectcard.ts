import { VisibleEntity } from "./VisibleEntity"
import { Effect } from "../lifegame/speffect/Effect"
import { GolSpace } from "./GolSpace"

/**
 * The card that give players special effect.
 */
export class EffectCard extends VisibleEntity
{
    inside: Effect;
    remaining_tick: number;

    constructor(effect_inside: Effect, duration: number,
        kinematics: { x_pos: number, y_pos: number, x_velocity: number, y_velocity: number },
        space: GolSpace, canvas: CanvasRenderingContext2D)
    {
        super("effectcard", kinematics, space, true, canvas);
        this.inside = effect_inside;
        this.remaining_tick = duration;
    }

    tick(time: number)
    {
        super.tick(time);
        this.remaining_tick -= 1;
        if (this.remaining_tick <= 0) { this.is_dead = true; }
    }

    render()
    {

    }

    /**
     * If a card was picked, what should it do
     */
    picked()
    {
        this.is_dead = true;
    }
}
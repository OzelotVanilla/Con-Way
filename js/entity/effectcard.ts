import { visibleEntity } from "./visibleEntity"
import { effect } from "../lifegame/speffect/effect"
import { golSpace } from "../entity/golSpace"

/**
 * The card that give players special effect.
 */
export class effectcard extends visibleEntity
{
    inside: effect;
    remaining_tick: number;

    constructor(effect_inside: effect, duration: number,
        kinematics: { xPos: number, yPos: number, xVelocity: number, yVelocity: number },
        space: golSpace, canvas: CanvasRenderingContext2D)
    {
        super("effectcard", kinematics, space, true, canvas);
        this.inside = effect_inside;
        this.remaining_tick = duration;
    }

    tick(time: number)
    {
        super.tick(time);
        this.remaining_tick -= 1;
        if (this.remaining_tick <= 0) { this.isDead = true; }
    }

    render()
    {

    }

    /**
     * If a card was picked, what should it do
     */
    picked()
    {
        this.isDead = true;
    }
}
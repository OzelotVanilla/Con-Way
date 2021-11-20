import { GolSpace } from "js/entity/GolSpace";
import { tick_per_second } from "../../pages/game/game_cycle";

/**
* Special object on a golSpace, which has a position and a velocity and has its specific behaviour.
*/
export class entity
{
    type: string; //Different type entity has different type. ( -_ -)

    x_pos: number;
    y_pos: number; //Position from the space where the entity is (proportion).

    x_velocity: number;
    y_velocity: number; //Velocity

    space: GolSpace; //One entity can only belong to one space.

    last_update_time: number; // TODO: Correct?

    is_dead: boolean; //Death flag, you shouldn't do anything to a dead entity, except for removing it.

    constructor(type: string, kinematics: { x_pos: number, y_pos: number, x_velocity: number, y_velocity: number }, space: GolSpace)
    {
        this.type = type;
        this.x_pos = kinematics.x_pos;
        this.y_pos = kinematics.y_pos;
        this.x_velocity = kinematics.x_velocity;
        this.y_velocity = kinematics.y_velocity;
        if (!(space === undefined))
        {
            this.space = space;
            space.addEntity(this);
        }
        this.last_update_time = new Date().getTime() / 1000.0;
    }

    getPos(time: number): number
    {
        var delta = time - this.last_update_time;
        return this.x_pos + delta * this.x_velocity, this.y_pos + delta * this.y_velocity;
    }

    tick(time: number): void
    {
        if (!(this.space === undefined))
        {

            {
                if (this.y_pos < 0)
                {
                    if (this.y_velocity < 0)
                    {
                        this.y_velocity = - this.y_velocity;
                    }
                }
                else
                {
                    if (this.y_pos > this.space.height)
                    {
                        if (this.y_velocity > 0)
                        {
                            this.y_velocity = - this.y_velocity;
                        }
                    }
                }
            }
            var delta = (time - this.last_update_time) * tick_per_second;
            this.x_pos = this.x_pos + delta * this.x_velocity;
            this.y_pos = this.y_pos + delta * this.y_velocity;
            this.last_update_time = time;
            {
                var space_width = this.space.width;
                if (this.x_pos < 0)
                {
                    this.x_pos += space_width;
                }
                else
                {
                    if (this.x_pos > space_width)
                    {
                        this.x_pos -= space_width;
                    }
                }
            }
        }
    }

}
import { GolSpace } from "./GolSpace";

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
        this.space = space;
        this.last_update_time = new Date().getMilliseconds() / 1000.0;
    }

    getPos(time: number): number
    {
        var delta = time - this.last_update_time;
        return this.x_pos + delta * this.x_velocity, this.y_pos + delta * this.y_velocity;
    }

    tick(time: number): void
    {
        var delta = time - this.last_update_time;
        this.x_pos, this.y_pos = this.x_pos + delta * this.x_velocity, this.y_pos + delta * this.y_velocity;
        this.last_update_time = time;
    }
}
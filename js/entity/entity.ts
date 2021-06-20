import { golSpace } from "./golSpace";

/**
* Special object on a golSpace, which has a position and a velocity and has its specific behaviour.
*/
export class entity {

    type: string; //Different type entity has different type. ( -_ -)

    xPos: number;
    yPos: number; //Position from the space where the entity is (proportion).

    xVelocity: number;
    yVelocity: number; //Velocity

    space: golSpace; //One entity can only belong to one space.

    lastUpdateTime: number; // TODO: Correct?

    destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean; // TODO: Correct?

    isDead: boolean; //Death flag, you shouldn't do anything to a dead entity, except for removing it.

    constructor(type: string, xPos: number, yPos: number, xVelocity: number, yVelocity: number, space: golSpace,
        destructorCondition: (ent: entity, x_pos: number, y_pos: number, space: any) => boolean) {
        this.type = type;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.space = space;
        this.destructorCondition = destructorCondition;
        this.lastUpdateTime = new Date().getMilliseconds() / 1000.0;
    }

    getPos(time: number) {
        var delta = time - this.lastUpdateTime;
        return this.xPos + delta * this.xVelocity, this.yPos + delta * this.yVelocity;
    }

    tick(time: number) {
        var delta = time - this.lastUpdateTime;
        this.xPos, this.yPos = this.xPos + delta * this.xVelocity, this.yPos + delta * this.yVelocity;
        this.lastUpdateTime = time;
        this.isDead = this.destructorCondition(this, this.xPos, this.yPos, this.space);
    }
}
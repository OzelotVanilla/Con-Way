/**
 * An event object is acts as an event.
 * 
 * Events can be anything, but it must clearly happens inside its action.
 * 
 * Event happend when its action is invoked but still didn't returned.
 * 
 * Some abstract types of events, like events of periods (onload, onfinish, etc.),
 * have no action (which means their actions are empty or just logs).
 */
export class event<EntityType, RealType extends event<EntityType, RealType>>
{

    name: string;

    defaultAction: (ev: RealType, ent: EntityType) => void;
    currentAction: (ev: RealType, ent: EntityType) => void;

    constructor(name: string, action: (ev: RealType, ent: EntityType) => any)
    {
        this.name = name;
        this.defaultAction = this.currentAction = action;
    }

    getName(): string
    {
        return this.name;
    }

    getDefaultAction(): (ev: RealType, ent: EntityType) => any
    {
        return this.defaultAction;
    }

    getCurrentAction(): (ev: RealType, ent: EntityType) => any
    {
        return this.currentAction;
    }

    setCurrentAction(action: () => any): void
    {
        this.currentAction = action;
    }

    resetCurrentAction(): void
    {
        this.currentAction = this.defaultAction;
    }
}
export class event<EntityType>
{

    name: string;

    defaultAction: (ent: EntityType) => void;
    currentAction: (ent: EntityType) => void;

    constructor(name: string, action: (ent: EntityType) => any)
    {
        this.name = name;
        this.defaultAction = this.currentAction = action;
    }

    getName(): string
    {
        return this.name;
    }

    getDefaultAction(): (ent: EntityType) => any
    {
        return this.defaultAction;
    }

    getCurrentAction(): (ent: EntityType) => any
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
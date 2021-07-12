export class event<EntityType>
{

    name: string;
    canceled: boolean = false;
    entity: EntityType;

    /**
     * Detained times.
     */
    detainedTimes: number = 0;

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

    isCanceled(): boolean
    {
        return this.canceled;
    }

    setCanceled(canceled: boolean): void
    {
        this.canceled = canceled;
    }

    getDefaultAction(): (ent: EntityType) => any
    {
        return this.defaultAction;
    }

    getCurrentAction(): (ent: EntityType) => any
    {
        return this.currentAction;
    }

    /**
     * A simple asynchronous wait pipeline.
     * An event will do its action immediately when all its subscribers be invoked.
     * To delay the event's action, subscribers should "detain" the event.
     * And when a subscriber doesn't need action to be delayed, "release" it.
     * To detain the event, all subscribers can invoke the detain method, and the detainedTimes variable will increase.
     * When your code doesn't need to delay the event's action, invoke the release method to decrease the detainedTimes variable.
     * When all the subscribers released their detainment and when the event isn't canceled, the event will do its action.
     */
    detain(): void
    {
        this.detainedTimes++;
    }

    release(): void
    {
        if (this.detainedTimes === 0)
        {
            this.getCurrentAction()(this.entity);
        }
        else
        {
            this.detainedTimes--;
        }
    }

    doAction(ent: EntityType): void
    {
        this.entity = ent;
        this.release();
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
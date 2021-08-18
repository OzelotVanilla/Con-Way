import { event } from "./event";

/**
 * Use these classes's instances to cancel or detain events.
 */
export class judgementstate<EntityType, EventType extends event<EntityType>> {

    event: EventType;
    canceled: boolean;

    constructor(event: EventType)
    {
        this.event = event;
    }

    getEvent(): EventType
    {
        return this.event;
    }

    isCanceled(): boolean
    {
        return this.canceled;
    }

    setCanceled(canceled: boolean): void
    {
        this.canceled = canceled;
    }
}

export class detainablestate<EntityType, EventType extends event<EntityType>> {

    event: EventType;

    callback: () => void;

    /**
     * Detained times.
     */
    detainedTimes: number = 0;

    constructor(event: EventType, callback: () => void)
    {
        this.event = event;
        this.callback = callback;
    }

    getEvent(): EventType
    {
        return this.event;
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
            this.callback();
        }
        else
        {
            this.detainedTimes--;
        }
    }

    doAction(): void
    {
        this.release();
    }
}
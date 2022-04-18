import { event } from "js/event/event";

export class eventtype<EntityType, EventType extends event<EntityType, EventType>>
{
    readonly type_name: string;

    readonly cancelable: boolean;

    readonly detainable: boolean;

    readonly eventSource: (entity: EntityType) => EventType;

    readonly nonSourceLaunchable: boolean;

    constructor(type_name: string, cancelable: boolean, detainable: boolean, eventSource: (entity: EntityType) => EventType)
    {
        this.type_name = type_name;
        this.cancelable = cancelable;
        this.detainable = detainable;
        this.eventSource = eventSource;
        this.nonSourceLaunchable = eventSource !== undefined;
    }

}
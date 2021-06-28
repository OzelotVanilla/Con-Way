import { event } from "./event";

export class eventbus
{

    /**
     * Key: Event's name (key is not event, and event exist only when it is occured);
     * Value: a set of functions which is linked with the event (key).
     * One event can trigger multiple events.
     */
    subscribers: Map<string, Set<(ev: event) => void>> = new Map();

    constructor() { }

    /**
     * 
     * @param {string} event_name The name you want to find in the event bus
     * @param {function} subscriber The action you want to add to the event
     */
    subscribe(event_name: string, subscriber: (ev: event) => void): void
    {
        let subscriber_group: Set<(ev: event) => void>;
        if (this.subscribers.has(event_name))
        {
            subscriber_group = this.subscribers.get(event_name);
        } else
        {
            subscriber_group = new Set();
            this.subscribers.set(event_name, subscriber_group);
        }
        subscriber_group.add(subscriber);
    }

    /**
     * Delete function combined to event. If the function (subscriber) is not specified,
     * all functions combined to that event will be removed.
     * 
     * @param {string} eventName The name you want to find in the event bus
     * @param {function} subscriber The action you want to cancel from the event bus
     */
    desubscribe(eventName: string, subscriber: (ev: event) => void): void
    {
        let subscriber_group = this.subscribers.get(eventName); // subscriberGroup: set
        if (subscriber_group != null)
        {
            if (subscriber === undefined) { subscriber_group.clear(); }
            else
            {
                subscriber_group.delete(subscriber);
            }
        }
    }

    /**
     * When a event happend, it will check the event bus, and find the functions corresponding to this event's name,
     * then run these functions.
     * 
     * @param ev The event you want to post
     */
    post(ev: event)
    {
        var elements = ev.getName().split("_");
        for (var i = 0, name = elements[0]; i < elements.length; i = i + 1, name = name + "_" + elements[i])
        {
            var subscriberGroup = this.subscribers.get(name);
            if (subscriberGroup != undefined)
            {
                for (var subscriber of subscriberGroup)
                {
                    subscriber(ev);
                }
            }
        }
        if (!ev.isCanceled())
        {
            ev.doAction();
        }
    }
}

export var event_bus: eventbus = new eventbus();
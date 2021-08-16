import { event } from "./event";
import { judgementstate, detainablestate } from "./eventstate";

export class eventbus
{

    /**
     * Key: Event's name (key is not event, and event exist only when it is occured);
     * Value: a set of functions which is linked with the event (key).
     * One event can trigger multiple events.
     */
    subscribers: {
        judger: Map<string, Set<(ev: judgementstate<any, any>) => void>>,
        pre_action: Map<string, Set<(ev: detainablestate<any, any>) => void>>,
        post_action: Map<string, Set<(ev: detainablestate<any, any>) => void>>
    } = {
            judger: new Map<string, Set<(ev: judgementstate<any, any>) => void>>(),
            pre_action: new Map<string, Set<(ev: detainablestate<any, any>) => void>>(),
            post_action: new Map<string, Set<(ev: detainablestate<any, any>) => void>>()
        };

    constructor() { }

    /**
     * 
     * @param {string} event_name The name you want to find in the event bus
     * @param {function} subscriber The action you want to add to the event
     */
    subscribeJudger<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: judgementstate<EntityType, event<EntityType>>) => void): void
    {
        let subscriber_group: Set<(ev: judgementstate<any, any>) => void>;
        if (this.subscribers.judger.has(event_name))
        {
            subscriber_group = this.subscribers.judger.get(event_name);
        }
        else
        {
            subscriber_group = new Set();
            this.subscribers.judger.set(event_name, subscriber_group);
        }
        subscriber_group.add(<(ev: any) => void>subscriber);
    }

    /**
     * 
     * @param {string} event_name The name you want to find in the event bus
     * @param {function} subscriber The action you want to add to the event
     */
    subscribePreAction<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: detainablestate<EntityType, event<EntityType>>) => void): void
    {
        this.subscribe(this.subscribers.pre_action, event_name, subscriber);
    }

    /**
     * 
     * @param {string} event_name The name you want to find in the event bus
     * @param {function} subscriber The action you want to add to the event
     */
    subscribePostAction<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: detainablestate<EntityType, event<EntityType>>) => void): void
    {
        this.subscribe(this.subscribers.post_action, event_name, subscriber);
    }

    private subscribe(group: Map<string, Set<(ev: detainablestate<any, any>) => void>>, event_name: string, subscriber: (ev: detainablestate<any, any>) => void): void
    {
        let subscriber_group: Set<(ev: detainablestate<any, any>) => void>;
        if (group.has(event_name))
        {
            subscriber_group = group.get(event_name);
        }
        else
        {
            subscriber_group = new Set();
            group.set(event_name, subscriber_group);
        }
        subscriber_group.add(<(ev: any) => void>subscriber);
    }

    /**
     * Delete function combined to event. If the function (subscriber) is not specified,
     * all functions combined to that event will be removed.
     * 
     * @param {string} eventName The name you want to find in the event bus
     * @param {function} subscriber The action you want to cancel from the event bus
     */
    desubscribeJudger<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: judgementstate<EntityType, event<EntityType>>) => void = undefined): void
    {
        let subscribers = this.subscribers.judger.get(event_name); // subscriberGroup: set
        if (subscribers != null)
        {
            if (subscriber === undefined) { subscribers.clear(); }
            else
            {
                subscribers.delete(<(ev: any) => void>subscriber);
            }
        }
    }

    desubscribePreAction<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: detainablestate<EntityType, event<EntityType>>) => void = undefined): void
    {
        this.desubscribe(this.subscribers.pre_action, event_name, subscriber);
    }

    desubscribePostAction<EntityType, TypeName extends event<EntityType>>(event_name: string, subscriber: (ev: detainablestate<EntityType, event<EntityType>>) => void = undefined): void
    {
        this.desubscribe(this.subscribers.post_action, event_name, subscriber);
    }

    private desubscribe(group: Map<string, Set<(ev: detainablestate<any, any>) => void>>, event_name: string, subscriber: (ev: detainablestate<any, any>) => void = undefined): void
    {

        let subscribers = group.get(event_name); // subscriberGroup: set
        if (subscribers != null)
        {
            if (subscriber === undefined) { subscribers.clear(); }
            else
            {
                subscribers.delete(<(ev: any) => void>subscriber);
            }
        }
    }

    /**
     * When a event happend, it will check the event bus, and find the functions corresponding to this event's name,
     * then run these functions.
     * 
     * @param ev The event you want to post
     */
    post<EntityType>(ev: event<any>, ent: EntityType, finished: () => void): void
    {
        var elements = ev.getName().split("_");
        var judger_groups: Set<(ev: judgementstate<any, any>) => void>[] = [];
        var pre_action_groups: Set<(ev: detainablestate<any, any>) => void>[] = [];
        var post_action_groups: Set<(ev: detainablestate<any, any>) => void>[] = [];
        for (var i = 0, name = elements[0]; i < elements.length; i = i + 1, name = name + "_" + elements[i])
        {
            let judger = this.subscribers.judger.get(name);
            if (judger != undefined)
            {
                judger_groups.push(judger);
            }
            let pre_action = this.subscribers.pre_action.get(name);
            if (pre_action != undefined)
            {
                pre_action_groups.push(pre_action);
            }
            let post_action = this.subscribers.post_action.get(name);
            if (post_action != undefined)
            {
                post_action_groups.push(post_action);
            }
        }
        {
            let state = new judgementstate<EntityType, typeof ev>(ev);
            for (var judger_group of judger_groups)
            {
                for (let judger of judger_group)
                {
                    judger(state);
                }
            }
            if (state.isCanceled())
            {
                return;
            }
        }
        {
            let state = new detainablestate<EntityType, typeof ev>(ev, () =>
            {
                ev.getCurrentAction()(ent);
                {
                    let state = new detainablestate<EntityType, typeof ev>(ev, () =>
                    {
                        finished();
                    });
                    for (var post_action_group of post_action_groups)
                    {
                        for (let post_action of post_action_group)
                        {
                            post_action(state);
                        }
                    }
                    state.doAction();
                }
            });
            for (var pre_action_group of pre_action_groups)
            {
                for (let pre_action of pre_action_group)
                {
                    pre_action(state);
                }
            }
            state.doAction();
        }
    }
}

export var event_bus: eventbus = new eventbus();

export class global
{
    constructor(value: never)
    {

    }
}
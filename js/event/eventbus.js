class eventbus {

    /**
     * Key: Event's name; Value: a set of functions which is linked with the event (key).
     * One event can trigger multiple events.
     */
    subscribers = new Map();

    constructor() { }

    /**
     * 
     * @param {string} eventName The name you want to find in the event bus
     * @param {function} subscriber The action you want to add to the event
     */
    subscribe(eventName, subscriber) {
        if (typeof subscriber == "function") {
            var subscriberGroup;
            if (this.subscribers.has(eventName)) {
                subscriberGroup = this.subscribers.get(eventName);
            } else {
                subscriberGroup = new Set();
                this.subscribers.set(eventName, subscriberGroup);
            }
            subscriberGroup.add(subscriber);
        }
    }

    /**
     * Delete function combined to event. If the function (subscriber) is not specified,
     * all functions combined to that event will be removed.
     * 
     * @param {string} eventName The name you want to find in the event bus
     * @param {function} subscriber The action you want to cancel from the event bus
     */
    desubscribe(eventName, subscriber) {
        let subscriberGroup = this.subscribers.get(eventName); // subscriberGroup: set
        if (subscriberGroup != null) {
            if (subscriber === undefined) { subscriberGroup.clear(); }
            else {
                subscriberGroup.delete(subscriber);
            }
        }
    }

    post(event) {
        var elements = event.getName().split("_")
        for (var i = 0, name = elements[0]; i < elements.length; i = i + 1, name = name + "_" + elements[i]) {
            var subscriberGroup = this.subscribers.get(name);
            for (var subscriber of subscriberGroup) {
                subscriber(event);
            }
        }
        if (!event.isCanceled()) {
            event.getCurrentAction()();
        }
    }
}
class eventbus {

    subscribers = new Map();

    subscribe(subscriber, eventName) {
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

    post(event, eventName) {
        var elements = eventName.split("_")
        for (var i = 0, name = elements[0]; i < elements.length; i = i + 1, name = name + "_" + elements[i]) {
            var subscriberGroup = this.subscribers.get(name);
            for (var subscriber of subscriberGroup) {
                subscriber(event, eventName);
                if (event.isCanceled()) {
                    return;
                }
            }
        }
        event.getCurrentAction()();
    }
}
con_way.foegen = class {

    name;
    interval = 0;
    initialized = false;
    modes = [];

    constructor(name) {
        this.name = name;
    }

    bind(mode, duration, weight) {
        if (initialized) {
            return;
        }
        modes.push({
            mode: mode,
            duration: duration,
            interval: mode.getInterval(),
            top: weight + (modes[modes.length - 1].top || 0),
            weight: weight
        });
    }

    finish() {
        initialized = true;
        con_way.event_bus.subscribe("tick", tick);
    }

    currentMode;
    lastUpdateTime = 0;
    lastSwitchedTime = 0;

    tick(event) {
        var time = event.time;
        if ((lastSwitchedTime === 0) || (lastUpdateTime === 0)) {
            lastSwitchedTime = time;
            lastUpdateTime = time;
            currentMode = modes[0];
        }
        if (time - lastUpdateTime >= currentMode.interval) {
            lastUpdateTime = lastUpdateTime + currentMode.interval;
            currentMode.mode.place();
            if (time - lastSwitchedTime >= currentMode.duration) {
                var parameter = currentMode.mode.finish();
                switch (typeof parameter) {
                    case "undefined":
                        var random = Math.random() * modes[modes.length - 1].top;
                        for (var mode of modes) {
                            if (random < mode.top) {
                                currentMode = mode;
                            }
                        }
                        break;
                    case "object":
                        if (Array.isArray(parameter)) {
                            var totalWeight = 0.0;
                            for (var i of parameter) {
                                totalWeight += i.weight;
                            }
                            for (var i of parameter) {
                                if (Math.random() < i.weight / totalWeight) {
                                    currentMode = i;
                                    totalWeight -= i.weight;
                                }
                            }
                        } else {
                            currentMode = parameter;
                        }
                        break;
                }
                lastSwitchedTime = lastUpdateTime;
            }
        }
    }
}

con_way.foegen.mode = class {

    name;

    interval;

    pattern;

    constructor(name, interval, pattern) {
        if (typeof name === "string" && typeof interval === "number" && typeof pattern === "function") {
            this.name = name;
            this.interval = interval;
            this.pattern = pattern;
        }
    }

    getName() { return this.name; }

    getInterval() { return this.interval; }

    place() {
        return Math.random(), pattern;
    }

    finish() {

    }

}
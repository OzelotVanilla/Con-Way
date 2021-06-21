import { loopgrid } from "../container/loopgrid";

export class foegen {

    name: string;
    space: loopgrid;
    interval: number = 0;
    initialized: boolean = false;
    modes: { mode: mode, duration: number, interval: number, top: number, weight: number }[] = [];
    yWidth: number;

    constructor(name: string, space: loopgrid) {
        this.name = name;
        this.space = space;
        this.yWidth = this.space.getYWidth() - 1;
    }

    bind(mode: mode, duration: number, weight: number) {
        if (this.initialized) {
            return;
        }
        this.modes.push({
            mode: mode,
            duration: duration,
            interval: mode.getInterval(),
            top: weight + (this.modes[this.modes.length - 1].top || 0),
            weight: weight
        });
    }

    finish() {
        this.initialized = true;
        //event_bus.subscribe("tick", tick);
    }

    currentMode;
    lastUpdateTime = 0;
    lastSwitchedTime = 0;

    tick(event) {
        var time = event.time;
        if ((this.lastSwitchedTime === 0) || (this.lastUpdateTime === 0)) {
            this.lastSwitchedTime = time;
            this.lastUpdateTime = time;
            this.currentMode = this.modes[0];
        }
        if (time - this.lastUpdateTime >= this.currentMode.interval) {
            this.lastUpdateTime = this.lastUpdateTime + this.currentMode.interval;
            var place: number, gen: (grid: loopgrid, x: number, y: number) => void = this.currentMode.mode.place();
            gen(this.space, Math.round(place * this.space.getXWidth()), this.yWidth);
            if (time - this.lastSwitchedTime >= this.currentMode.duration) {
                var parameter = this.currentMode.mode.finish();
                switch (typeof parameter) {
                    case "undefined":
                        var random = Math.random() * this.modes[this.modes.length - 1].top;
                        for (var mode of this.modes) {
                            if (random < mode.top) {
                                this.currentMode = mode;
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
                                    this.currentMode = i;
                                    totalWeight -= i.weight;
                                }
                            }
                        } else {
                            this.currentMode = parameter;
                        }
                        break;
                }
                this.lastSwitchedTime = this.lastUpdateTime;
            }
        }
    }
}

export class mode {

    name: string;

    interval: number;

    pattern: (grid: loopgrid, x: number, y: number) => void;

    constructor(name: string, interval: number, pattern: (loopgrid) => void) {
        this.name = name;
        this.interval = interval;
        this.pattern = pattern;
    }

    getName(): string { return this.name; }

    getInterval(): number { return this.interval; }

    place() {
        return Math.random(), this.pattern;
    }

    finish() {

    }

}
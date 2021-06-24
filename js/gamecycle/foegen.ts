import { loopgrid } from "../container/loopgrid";
import { event } from "../event/event";
import { event_bus } from "../../js/event/eventbus";

export class foegen
{

    name: string;
    space: loopgrid;
    initialized: boolean = false;
    modes: { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] = [];
    height: number;

    constructor(name: string, space: loopgrid)
    {
        this.name = name;
        this.space = space;
        this.height = this.space.getHeight() - 1;
    }

    bind(mode: mode, duration: number, weight: number)
    {
        if (this.initialized)
        {
            return;
        }
        this.modes.push({
            mode: mode,
            gen_limit: duration,
            interval: mode.getInterval(),
            top: weight + (this.modes[this.modes.length - 1].top || 0),
            weight: weight
        });
    }

    finish()
    {
        this.initialized = true;
        event_bus.subscribe("tick", this.tick);
        this.currentMode = this.modes[0];
        this.currentPattern = this.currentMode.mode.getPattern();
    }

    currentMode: { mode: mode, gen_limit: number, interval: number, top: number, weight: number };
    currentPattern: (grid: loopgrid, x: number, y: number) => void;
    invokeTimes: number = 0;

    /**
     * One tick is the minimum time unit of the game.
     * 
     * @param {event} ev The event 
     */
    tick(ev: event)
    {
        // When "tick" function done "interval" times
        if (this.invokeTimes % this.currentMode.interval === 0)
        {
            // Init postion and gen func, by getting two return values from place()
            var position: number = this.currentMode.mode.place();
            this.currentPattern(this.space, Math.round(position * this.space.getWidth()), this.height);

            // If reach the max limit of generation in one mode
            if (this.invokeTimes == this.currentMode.gen_limit)
            {
                // Tell the next mode to change
                var parameter = this.currentMode.mode.finish();
                var currentMode: { mode: mode, gen_limit: number, interval: number, top: number, weight: number };
                switch (typeof parameter)
                {
                    // Using weight, choose next mode
                    case "undefined":
                        var random = Math.random() * this.modes[this.modes.length - 1].top;
                        for (var mode of this.modes)
                        {
                            if (random < mode.top)
                            {
                                currentMode = mode;
                            }
                        }
                        break;
                    // Change to the mode in the object
                    case "object":
                        // If it is array, choose from it randomly
                        if (Array.isArray(parameter))
                        {
                            var totalWeight = 0.0;
                            for (var i of parameter)
                            {
                                totalWeight += i.weight;
                            }
                            for (var i of parameter)
                            {
                                if (Math.random() < i.weight / totalWeight)
                                {
                                    currentMode = i;
                                    break;
                                }
                                else
                                {
                                    totalWeight -= i.weight;
                                }
                            }
                        }
                        // If not array, it will be the next mode
                        else
                        {
                            currentMode = parameter;
                        }
                        break;
                }
                this.currentMode = currentMode;
                this.currentPattern = currentMode.mode.getPattern();
                this.invokeTimes = 0;
            }
        }
    }
}

export class mode
{
    name: string;

    interval: number;

    /**
     * From pattern libs, choose one pattern.
     */
    pattern: (grid: loopgrid, x: number, y: number) => void;

    constructor(name: string, interval: number, pattern: (grid: loopgrid) => void)
    {
        this.name = name;
        this.interval = interval;
        this.pattern = pattern;
    }

    getName(): string { return this.name; }

    getInterval(): number { return this.interval; }

    getPattern(): (grid: loopgrid, x: number, y: number) => void
    {
        return this.pattern;
    }

    /**
     * The generate place of the foe. position = place() * width_of_screen
     */
    place(): number
    {
        return Math.random();
    }

    finish():
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number } |
        { mode: mode, gen_limit: number, interval: number, top: number, weight: number }[] |
        undefined
    {
        return undefined;
    }
}
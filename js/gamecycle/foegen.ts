import { loopgrid } from "../container/loopgrid";
import { event } from "../event/event";
import { event_bus } from "../../js/event/eventbus";
import { mode } from "./mode/mode";

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
    }

    currentMode: { mode: mode, gen_limit: number, interval: number, top: number, weight: number };
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
            var mode: mode = this.currentMode.mode;
            // Init postion and gen func, by getting two return values from place()
            var position: number = mode.place();
            var currentPattern: (grid: loopgrid, x: number, y: number) => void = mode.getPattern();
            currentPattern(this.space, Math.round(position * this.space.getWidth()), this.height);

            // If reach the max limit of generation in one mode
            if (this.invokeTimes == this.currentMode.gen_limit)
            {
                // Tell the next mode to change
                var parameter = mode.finish();
                var currentMode: { mode: mode, gen_limit: number, interval: number, top: number, weight: number };
                switch (typeof parameter)
                {
                    // Using weight, choose next mode
                    case "undefined":
                        var random = Math.random() * this.modes[this.modes.length - 1].top;
                        for (var theMode of this.modes)
                        {
                            if (random < theMode.top)
                            {
                                currentMode = theMode;
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
                this.invokeTimes = 0;
            }
        }
    }
}
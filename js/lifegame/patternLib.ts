import { properties } from '../gamecycle/properties';
import { loopgrid } from "../container/loopgrid";

/**
 * All legal patterns from patternLib.json will be loaded into con-way.patternLib.
 * The method genPattern needs a string as the pattern's name and generate that pattern into the grid.
 * All patterns' name will be made one item of con-way.patternLib.
 */

export var initializer: { initialize: () => void } = {
    initialize(): void { }
};

export var patternLib: Map<string, (grid: loopgrid, x: number, y: number) => void>;

function success(data: { [x: string]: number[][]; }): void
{
    patternLib = new Map();
    properties.registAssertion("ajax", function () { return true; }, true);
    for (var key in data)
    {
        var original_pattern: number[][] = data[key];
        let pattern: boolean[][] = [];
        for (var dy = 0; dy < original_pattern.length; dy++)
        {
            var o_line: number[] = original_pattern[dy];
            pattern[dy] = [];
            for (var dx = 0; dx < o_line.length; dx++)
            {
                pattern[dy][dx] = (o_line[dx] != 0);
            }
        }
        function gen(grid: loopgrid, x: number, y: number): void
        {
            var y_minus_length = y - pattern.length;
            for (var dy = 0; dy < pattern.length; dy++)
            {
                var line: boolean[] = pattern[dy];
                for (var dx = 0; dx < line.length; dx++)
                {
                    grid.set(x + dx, y_minus_length + dy, line[dx]);
                }
            }
        };
        patternLib.set(key, gen);
    }
    initializer.initialize();
}

$.ajax("/js/lifegame/patternLib.json", {
    dataType: "json"
}).done(success).fail(function (xhr, status)
{
    properties.registAssertion("ajax", function (): boolean { return false; }, true);
});
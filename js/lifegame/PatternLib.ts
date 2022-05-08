import { LoopGrid } from "../util/container/LoopGrid";

/**
 * All legal patterns from patternLib.json will be loaded into con-way.patternLib.
 * The method genPattern needs a string as the pattern's name and generate that pattern into the grid.
 * All patterns' name will be made one item of con-way.patternLib.
 */

export var PatternLib: Map<string, (grid: LoopGrid, x: number, y: number) => void> = new Map();

function onInit(): void
{
    var data: { [x: string]: number[][] } = JSON.parse(sessionStorage.getItem("patternLib"));

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
        function gen(grid: LoopGrid, x: number, y: number): void
        {
            for (var dy = 0; dy < pattern.length; dy++)
            {
                var line: boolean[] = pattern[dy];
                for (var dx = 0; dx < line.length; dx++)
                {
                    grid.set(x + dx, y - dy, line[dx]);
                }
            }
        };
        PatternLib.set(key, gen);
    }
}

onInit();
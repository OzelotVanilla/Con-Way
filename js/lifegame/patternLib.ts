import { properties } from '../gamecycle/properties';
import { loopgrid } from "../container/loopgrid";
declare const $: any;
/**
 * All legal patterns from patternLib.json will be loaded into con-way.patternLib.
 * The method genPattern needs a string as the pattern's name and generate that pattern into the grid.
 * All patterns' name will be made one item of con-way.patternLib.
 */

export var patternLib: Map<string, (grid: loopgrid, x: number, y: number) => void> = new Map();

function success(data): void {
    properties.registAssertion("ajax", function () { return true; }, true);
    for (var key in data) {
        var pattern = data[key];
        var gen = function (grid, x, y) {
            for (var dy = 0; dy < pattern.length; dy++) {
                var line = pattern[dy];
                for (var dx = 0; dx < line.length; dx++) {
                    grid.set(x + dx, y + dy, (line[dx] === 1));
                }
            }
        };
        patternLib.set(key, gen);
    }
};

var jqxhr = $.ajax("/js/lifegame/patternLib.json", {
    dataType: "json"
}).done(success).fail(function (xhr, status) {
    properties.registAssertion("ajax", function (): boolean { return false; }, true);
});
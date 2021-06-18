/**
 * All legal patterns from patternLib.json will be loaded into con-way.patternLib.
 * The method genPattern needs a string as the pattern's name and generate that pattern into the grid.
 * All patterns' name will be made one item of con-way.patternLib.
 */
var success = function (data) {
    properties.ajax = function () { return true; }
    var patternLib = {};
    con_way.patternLib = patternLib;
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
        patternLib[key] = gen;
    }
    patternLib.genPattern = function (name, grid, x, y) {
        patternLib[name](grid);
    }
};

var jqxhr = $.ajax("/js/lifegame/patternLib.json", {
    dataType: "json"
}).done(success).fail(function (xhr, status) {
    properties.ajax = function () { return false; }
}).always(function () {
    properties.ajax.normal = true;
});
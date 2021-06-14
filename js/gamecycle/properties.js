/**
 * The global state of the whole Con-Way game.
 * The complete function returns true only if all the states are correct.
 */
var properties = {};

con_way.properties = properties;

properties.complete = function () {
    for (var key in properties) {
        var value = properties[key];
        if (!key === "complete" && properties.hasOwnProperty(key) && typeof value === "function" && !(value() === value.normal)) {
            return false;
        }
    }
    return true;
}

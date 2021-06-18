$(function () {
    var canvas = $("#cwf")[0].getContext("2d");
    con_way.canvas = canvas;
    var event_bus = new eventbus();
    con_way.event_bus = event_bus;

});
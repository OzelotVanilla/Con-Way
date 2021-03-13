import { doublegrid } from "../../js/container/doublegrid";
import { coordinateSpace } from "../../js/lifegame/coordinate";
import { b3s23 } from "../../js/lifegame/coordinate";
import { patternlibs } from "../../js/lifegame/patternlibs";

var game = {

    loadedStates: {
        patternLoaded: false
    },

    grid: null,

    playerGrid: null,

    delay: 0,

    cwf: null,

    shown: false,

    mouseX: 0,

    mouseY: 0,

    windowWidth: 0,

    windowHeight: 0,

    onLoad: function (options) {
        this.delay = 50;
        var canvas = document.getElementById('cwf');
        this.cwf = canvas.getContext('2d');
        var that = this;
        patternlibs.load(function () {
            that.loadedStates.patternLoaded = true;
        });
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.grid = new coordinateSpace(doublegrid, 64, window.innerWidth, window.innerHeight, function (that, x, y) { return false; }, b3s23, this.render);
        this.xZoom = this.grid.xZoom;
        this.yZoom = this.grid.yZoom;
        this.y0OffSet = this.grid.y0OffSet;
        this.y1OffSet = this.grid.y1OffSet;
    },

    updateYOffSet: function () {
        var bottomOffSet = this.grid.bottomOffSet + 1;
        if (bottomOffSet >= this.grid.grid.yWidth) {
            this.grid.bottomOffSet = 0;
        }
        this.grid.bottomOffSet = bottomOffSet;
        this.grid.updateYOffSet();
        this.y0OffSet = this.grid.y0OffSet;
        this.y1OffSet = this.grid.y1OffSet;
    },

    onTick: function (lastTime) {
        this.cwf.fillStyle = '#333333';
        this.cwf.fillRect(0, 0, this.windowWidth, this.windowHeight);
        this.cwf.fillStyle = 'white';
        this.grid.tick(1);
        var date = new Date();
        var delayTime = lastTime - date.getTime() + this.delay;
        if (delayTime <= 0 || delayTime > this.delay) {
            delayTime = this.delay;
            lastTime = date.getTime();
        }
        if (this.shown) {
            this.ticker = setTimeout(this.onTick, delayTime, lastTime + this.delay);
        }
    },

    xZoom: 0,
    yZoom: 0,
    y0OffSet: 0,
    y1OffSet: 0,

    render: function (x, y, entity) {
        var x0 = Math.round(x * this.xZoom);
        var x1 = Math.round((x + 1) * this.xZoom);
        var y0 = Math.round(this.y0OffSet - y * this.yZoom);
        var y1 = Math.round(this.y1OffSet - y * this.yZoom);
        if (entity === undefined || entity === null) {
            this.cwf.fillRect(x0, y1, x1 - x0, y0 - y1);
        } else {
            entity.render(this.cwf, x0, y0, y0 - y1);
        }
    },

    onReady: function () {
        this.shown = true;
        patternlibs.lightWeight(this.grid, 0, 160);
        patternlibs.rlightWeight(this.grid, 30, 120);
        this.shown = true;
        for (state of this.loadedStates) {
            if (!state) {
                setTimeout(this.onReady, 500);
                return;
            }
        }
        delete this.loadedStates;
        var date = new Date();
        this.ticker = setTimeout(this.onTick, this.delay, date.getTime());
    }
}

window.onload = function () {
    game.onLoad();
    game.onReady();
}
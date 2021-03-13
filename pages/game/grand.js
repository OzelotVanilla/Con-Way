
class loopgrid {

    constructor(x, y, factory) {
        this.innerarray = new Array();
        this.xWidth = x;
        this.yWidth = y;
        this.initialize = factory;

        for (var dx = 0; dx < x; dx++) {
            var column = new Array();
            this.innerarray[dx] = column;
            for (var dy = 0; dy < y; dy++) {
                column[dy] = factory(this, dx, dy);
            }
        }
    }
    set(x, y, data) {
        x = x % this.xWidth;
        y = y % this.yWidth;
        if (x < 0) {
            x += this.xWidth;
        }
        if (y < 0) {
            y += this.yWidth;
        }
        this.innerarray[x][y] = data;
    }

    setAndGet(x, y, data) {
        x = x % this.xWidth;
        y = y % this.yWidth;
        if (x < 0) {
            x += this.xWidth;
        }
        if (y < 0) {
            y += this.yWidth;
        }
        var re = this.innerarray[x][y];
        this.innerarray[x][y] = data;
        return re;
    }

    get(x, y) {
        x = x % this.xWidth;
        y = y % this.yWidth;
        if (x < 0) {
            x += this.xWidth;
        }
        if (y < 0) {
            y += this.yWidth;
        }
        return this.innerarray[x][y];
    }

    getPropotys() {
        return this.xWidth, this.yWidth;
    }

    yOffSet;

    forEach(factory) {
        for (var y = 0; y < this.yWidth; y++) {
            if (y == this.yOffSet) {
                continue;
            }
            for (var x = 0; x < this.xWidth; x++) {
                this.innerarray[x][y] = factory(this, x, y);
            }
        }
    }
}
class doublegrid extends loopgrid {
    constructor(x, y, factory) {
        super(x, y, factory);
        this.hidenarray = new Array();
        for (var dx = 0; dx < x; dx++) {
            var column = new Array();
            this.hidenarray[dx] = column;
            for (var dy = 0; dy < y; dy++) {
                column[dy] = factory(this, dx, dy);
            }
        }
    }

    flip() {
        var mid = this.innerarray;
        this.innerarray = this.hidenarray;
        this.hidenarray = mid;
    }

    forEach(factory) {
        for (var y = 0; y < this.yWidth; y++) {
            if (y == this.yOffSet) {
                continue;
            }
            for (var x = 0; x < this.xWidth; x++) {
                this.hidenarray[x][y] = factory(this, x, y);
            }
        }
    }
}
class coordinateSpace {

    entities = [];

    xZoom;

    yZoom;

    y0OffSet;

    y1OffSet;

    cellsPerColumn;

    bottomOffSet;

    windowBottomHide;

    windowWidth;

    windowHeight;

    constructor(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.bottomOffSet = Math.round(cellsPerLine * this.windowHeight / this.windowWidth / 2);
        this.windowBottomHide = this.bottomOffSet;
        this.cellsPerColumn = Math.round(cellsPerLine * this.windowHeight / this.windowWidth);
        this.grid = new gridFactory(cellsPerLine, this.bottomOffSet * 4, initialize);
        this.rule = rule;
        this.renderer = renderer;

        this.xZoom = windowWidth / cellsPerLine;
        this.yZoom = windowHeight / this.cellsPerColumn;
        this.updateYOffSet();
        console.log(cellsPerLine, this.cellsPerColumn, this.bottomOffSet);
    }

    updateYOffSet() {
        this.y0OffSet = this.windowHeight + this.windowHeight * (1 + this.bottomOffSet) / this.cellsPerColumn;
        this.y1OffSet = this.windowHeight + this.windowHeight * this.bottomOffSet / this.cellsPerColumn;
    }

    set(x, y, data) {
        this.grid.set(x, y, data);
    }

    setAndGet(x, y, data) {
        return this.grid.setAndGet(x, y, data);
    }

    get(x, y) {
        return this.grid.get(x, y);
    }

    tick(times) {
        var rule = this.rule;
        var renderer = this.renderer;
        var bottomHide = this.bottomOffSet;
        var cellsPerColumn = this.cellsPerColumn;
        var yOffSet = this.grid.yOffSet = bottomHide - this.windowBottomHide;
        var gridHeight = this.grid.yWidth;
        for (var i = 0; i < times; i++) {
            this.grid.forEach(function (that, x, y) {
                var next = rule(that, x, y);
                if (y < yOffSet) {
                    y = y + gridHeight;
                }
                if (next && y > bottomHide && y <= (bottomHide + cellsPerColumn)) {
                    renderer(x, y);
                }
                return next;
            });
            for (var en of this.entities) {
                renderer(en.x, en.y, en);
            }
            this.grid.flip();
        }
    }
}

function b3s23(that, x, y) {
    var times = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (that.get(x + dx, y + dy) && (dx != 0 || dy != 0)) {
                times++;
            }
        }
    }
    switch (times) {
        case 2:
            return that.get(x, y);
        case 3:
            return true;
        default:
            return false;
    }
}

function iterating(that, x, y) {
    if (x != 0) {
        return that.get(x - 1, y);
    } else {
        return that.get(x - 1, y - 1);
    }
}
class entity {

    x;
    y;

    constructor(x, y) {
        this.pattern = pattern;
        this.xOffSet = xOffSet;
        this.yOffSet = yOffSet;
    }

    tick() {

    }

    getPos() {
        return this.x, this.y;
    }

    render(x, y, scale) {

    }
}

class player extends entity {

    coordinate;
    hypercoordinate;

    constructor(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer, hypercoordinate) {
        super(32, 32);
        var newRenderer = function (x, y) {
            renderer(x + this.x, y + this.y);
        }
        this.coordinate = new coordinateSpace(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, newRenderer);
        this.hypercoordinate = hypercoordinate;
    }

    onDrag(x, y) {
        this.x = x;
        this.y = y;
    }

    tick() {
        coordinateSpace.tick(1);
        if (this.cycle == 50) {
            this.hypercoordinate
        }
    }

}

class cellGen extends entity {

    pattern;
    xOffSet;
    yOffSet;

    constructor(cycle, pattern, xOffSet, yOffSet, x, y) {
        super(cycle, x, y);
        this.pattern = pattern;
        this.xOffSet = xOffSet;
        this.yOffSet = yOffSet;
    }

    times = 0;

    evoluate(x, y) {
        if (this.times === cycle) {
            this.times = 0;
        }
        times++;
        x += this.xOffSet;
        y += this.yOffSet;
    }
}
class bullet extends entity {
    dx;
    dy;
    constructor(cycle, x, y, dx, dy) {
        super(x, y);
        this.dx = dx;
        this.dy = dy;
    }

    tick() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render(cwf, x, y, scale) {
        cwf.fillRect(x + 0.4 * scale, y - scale, 0.2, scale);
    }
}
var patternlibs = {

    cache: null,

    gen: function (str, space, x, y) {
        console.log(str, this, this.cache);
        for (var dx = 0; dx < this.cache.length; dx++) {
            var column = this.cache[str][dx];
            for (var dy = 0; dy < column.length; dy++) {
                if (column[dy] === 1) {
                    space.set(x + dx, y - dy, true);
                }
            }
        }
    },

    load(marker) {
        var request = new XMLHttpRequest();
        request.open("get", "patternlib.json");
        request.send(null);
        request.onload = function () {
            if (request.status == 200) {
                var cache = JSON.parse(request.responseText);
                // for (theName in cache) {
                //     if (cache.hasOwnProperty(theName)) {
                //         var injected = function (space, x, y) {
                //             for (var dx = 0; dx < this.pattern.length; dx++) {
                //                 var column = this.pattern[dx];
                //                 for (var dy = 0; dy < column.length; dy++) {
                //                     if (column[dy] === 1) {
                //                         space.set(x + dx, y - dy, true);
                //                     }
                //                 }
                //             }
                //         }
                //         injected.name = theName;
                //         injected.pattern = cache[theName];
                //         cache[theName] = injected;
                //     }
                // }
                patternlibs.cache = cache;
            }
        }
        console.log(patternlibs);
        marker();
    }

}
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
        this.shown = true;
        for (var state in this.loadedStates && this.loadedStates.hasOwnProperty(state)) {
            if (!loadedStates[state]) {
                setTimeout(this.onReady, 500);
                return;
            }
        }
        console.log(patternlibs);
        patternlibs.gen("lightWeight", this.grid, 0, 160);
        patternlibs.gen("rlightWeight", this.grid, 30, 120);
        delete this.loadedStates;
        var date = new Date();
        this.ticker = setTimeout(this.onTick, this.delay, date.getTime());
    }
}

window.onload = function () {
    game.onLoad();
    game.onReady();
}
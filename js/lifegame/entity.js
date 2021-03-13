export class entity {

    cycle;
    x;
    y;

    constructor(cycle, x, y) {
        this.cycle = cycle;
        this.pattern = pattern;
        this.xOffSet = xOffSet;
        this.yOffSet = yOffSet;
    }

    tick();

    getPos() {
        return this.x, this.y;
    }

    render(x, y, scale);
}

export class bullet extends entity {
    dx;
    dy;
    constructor(cycle, x, y, dx, dy) {
        super(cycle, x, y);
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
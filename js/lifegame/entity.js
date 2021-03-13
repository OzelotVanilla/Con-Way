export class entity {

    x;
    y;

    constructor(x, y) {
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
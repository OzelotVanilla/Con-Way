export var block_length = 10;

export var canvas: HTMLCanvasElement;

export function resize(ev: Event): void
{
    console.log("Page resizing canvas...");
    setCanvas(canvas, (<Window>ev.currentTarget).innerWidth, (<Window>ev.currentTarget).innerHeight);
}

/**
 * Set a canvas's width and height to the width and the height.
 */
function setCanvas(canvas: HTMLCanvasElement, width: number, height: number)
{
    console.log("Original canvas: " + canvas.width + ", " + canvas.height);
    console.log("Setting canvas at " + width + ", " + height);
    canvas.width = width;
    canvas.height = height;
    console.log("Setting colour to white...");
    canvas.getContext("2d").fillStyle = "#ffffff";
}

/**
 * Invoke before posting tickbeginevent.
 */
export function initializeCanvas(): void
{
    // Create canvas and element on canvas based on user's device's width
    canvas = <HTMLCanvasElement>($("#cwf")[0]);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvas(canvas, window.innerWidth, window.innerHeight);

    // Init the canvas and its context.
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
}
initializeCanvas();

console.log("canvas initialized");
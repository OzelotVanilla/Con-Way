var is_mouse_down: boolean = false;

var w1: HTMLElement = $("#w1")[0];

var layerX: number;
var layerY: number;

function mousedown(ev: MouseEvent): void
{
    is_mouse_down = true;
    layerX = ev.offsetX;
    layerY = ev.offsetY;
}

function mouseup(): void
{
    is_mouse_down = false;
}

function mousemove(ev: MouseEvent): void
{
    if (is_mouse_down)
    {
        move(ev.clientX, ev.clientY);
    }

}

function move(clientX: number, clientY: number)
{
    w1.style.left = (clientX - layerX) + "px";

    w1.style.top = (clientY - layerY) + "px";
}

function touchmove(ev: TouchEvent): void
{
    if (is_mouse_down)
    {
        move(Math.round(ev.touches[0].clientX), Math.round(ev.touches[0].clientY));
    } else
    {
        is_mouse_down = true;
        layerX = Math.round(ev.touches[0].clientX);
        layerY = Math.round(ev.touches[0].clientY);
    }
}

function tryItYourself(): void
{
    window.location.href = "../game/game.html";
}
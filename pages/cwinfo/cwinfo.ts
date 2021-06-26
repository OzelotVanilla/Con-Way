var is_mouse_down: boolean = false;

function mousedown(): void
{
    is_mouse_down = true;
}

function mouseup(): void
{
    is_mouse_down = false;
}

function mousemove(): void
{

}

function tryItYourself(): void
{
    window.location.href = "../game/game.html";
}
import { engine_vector } from "pages/game/the_player";

/**
 * Export kinematics data to lead the player's plane's movement.
 * move.x_move stands for move offset in pixels, as well as move.y_move
 */
export function downMouse(move_src: MouseEvent): void
{
    engine_vector.mouse_down = true;
    moveScreen(move_src.clientX, move_src.clientY);
}

export function upMouse(move_src: MouseEvent): void
{
    engine_vector.mouse_down = false;
}

export function moveMouse(move_src: MouseEvent): void
{
    if (engine_vector.mouse_down)
    {
        moveScreen(move_src.clientX, move_src.clientY);
    }
}

export function downTouch(src: any): void
{
    engine_vector.mouse_down = true;
    var move_src: TouchEvent = src.originalEvent;
    var touch: Touch = move_src.touches[0];
    moveScreen(touch.clientX, touch.clientY);
}

export function upTouch(src: any): void
{
    engine_vector.mouse_down = false;
}

export function moveTouch(src: any): void
{
    var move_src: TouchEvent = src.originalEvent;
    var touch: Touch = move_src.touches[0];
    moveScreen(touch.clientX, touch.clientY);
}

function moveScreen(x_pos: number, y_pos: number): void
{
    engine_vector.x_from_screen = x_pos;
    engine_vector.y_from_screen = y_pos;
}

export function downKey(move_src: KeyboardEvent): void
{
    switch (move_src.key)
    {
        case "w":
        case "W":
        case "ArrowUp":
            if (!key_down_state.up)
            {
                key_down_state.up = true;
                engine_vector.y_from_key++;
            }
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            if (!key_down_state.left)
            {
                key_down_state.left = true;
                engine_vector.x_from_key--;
            }
            break;
        case "s":
        case "S":
        case "ArrowDown":
            if (!key_down_state.down)
            {
                key_down_state.down = true;
                engine_vector.y_from_key--;
            }
            break;
        case "d":
        case "D":
        case "ArrowRight":
            if (!key_down_state.right)
            {
                key_down_state.right = true;
                engine_vector.x_from_key++;
            }
            break;
    }
}

export function upKey(move_src: KeyboardEvent): void
{
    switch (move_src.key)
    {
        case "w":
        case "W":
        case "ArrowUp":
            if (key_down_state.up)
            {
                key_down_state.up = false;
                engine_vector.y_from_key--;
            }
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            if (key_down_state.left)
            {
                key_down_state.left = false;
                engine_vector.x_from_key++;
            }
            break;
        case "s":
        case "S":
        case "ArrowDown":
            if (key_down_state.down)
            {
                key_down_state.down = false;
                engine_vector.y_from_key++;
            }
            break;
        case "d":
        case "D":
        case "ArrowRight":
            if (key_down_state.right)
            {
                key_down_state.right = false;
                engine_vector.x_from_key--;
            }
            break;
    }
}

var key_down_state: { left: boolean, down: boolean, right: boolean, up: boolean } =
{
    left: false,
    down: false,
    right: false,
    up: false
};

export function registerSubscribers()
{
    $(document).on("mousedown", <any>downMouse);
    $(document).on("mouseup", <any>upMouse);
    $(document).on("mousemove", <any>moveMouse);
    $(document).on("keydown", <any>downKey);
    $(document).on("keyup", <any>upKey);
    $(document).on("touchstart", <any>downTouch);
    $(document).on("touchend", <any>upTouch);
    $(document).on("touchmove", <any>moveTouch);
    console.log("move converter is registered");
}
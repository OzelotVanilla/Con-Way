import { player, ply, engine_vector } from "../../js/entity/player"
import { the_space, golSpace } from "../../js/entity/golSpace";

/**
 * Export kinematics data to lead the player's plane's movement.
 * move.x_move stands for move offset in pixels, as well as move.y_move
 */
export function downMouse(move_src: MouseEvent): void
{
    mouse_down = true;
}

export function upMouse(move_src: MouseEvent): void
{
    mouse_down = false;
}

export function moveMouse(move_src: MouseEvent): void
{
    moveScreen(move_src.clientX, window.innerHeight - move_src.clientY);
}

function moveScreen(x_pos: number, y_pos: number): void
{
    engine_vector.x_from_screen = x_pos - ply.xPos;
    engine_vector.y_from_screen = y_pos - ply.yPos;
}

export function downKey(move_src: KeyboardEvent): void
{
    switch (move_src.key)
    {
        case "w":
        case "W":
        case "ArrowUp":
            if (key_down_state.up)
            {
                key_down_state.up = true;
                engine_vector.y_from_key++;
            }
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            if (key_down_state.left)
            {
                key_down_state.left = true;
                engine_vector.x_from_key--;
            }
            break;
        case "s":
        case "S":
        case "ArrowDown":
            if (key_down_state.down)
            {
                key_down_state.down = true;
                engine_vector.y_from_key--;
            }
            break;
        case "d":
        case "D":
        case "ArrowRight":
            if (key_down_state.right)
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
            key_down_state.up = false;
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            key_down_state.left = false;
            break;
        case "s":
        case "S":
        case "ArrowDown":
            key_down_state.down = false;
            break;
        case "d":
        case "D":
        case "ArrowRight":
            key_down_state.right = false;
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

var mouse_down: boolean = false;
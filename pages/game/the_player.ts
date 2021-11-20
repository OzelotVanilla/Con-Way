import { Player } from "js/entity/Player";
import { the_space } from "pages/game/the_space";

export var the_player: Player;

export var engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number, mouse_down: boolean } =
{
    x_from_key: 0,
    y_from_key: 0,
    x_from_screen: 0,
    y_from_screen: 0,
    mouse_down: false
}

the_player = new Player(engine_vector, the_space);

console.log("the_player initialized");
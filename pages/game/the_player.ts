import { player } from "../../js/entity/player";
import { the_space } from "./the_space";

export var the_player;

export var engine_vector: { x_from_key: number, y_from_key: number, x_from_screen: number, y_from_screen: number } =
{
    x_from_key: 0,
    y_from_key: 0,
    x_from_screen: 0,
    y_from_screen: 0
}

the_player = new player(engine_vector, the_space);
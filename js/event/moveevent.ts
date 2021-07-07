import { event } from "./event";
import { player } from "../entity/player"

/**
 * Export kinematics data to lead the player's plane's movement
 */
export class moveevent extends event
{
    /**
     * The
     */
    move: { x_move: number, y_move: number };

    player_x: number;
    player_y: number;
    move_src: UIEvent;

    /**
     * Get browser's event
     * 
     * @param move_src MouseEvent or KeyboardEvent from browser
     */
    constructor(player_entity: player, move_src: UIEvent)
    {
        super("moveevent", () => { });
        this.move_src = move_src;
        this.player_x = player_entity.xPos;
        this.player_y = player_entity.yPos;
        this.defaultAction = this.currentAction = this.updateMove;
        this.move = this.updateMove();
    }

    updateMove(): { x_move: number, y_move: number }
    {
        if (this.move_src instanceof KeyboardEvent)
        {
            switch ((<KeyboardEvent>this.move_src).key)
            {
                case "w":
                case "W":
                case "ArrowUp":
                    break;
                case "a":
                case "A":
                case "ArrowLeft":
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                    break;
            }
        }
        else if (this.move_src instanceof MouseEvent)
        {
            var mouse_x = (<MouseEvent>this.move_src).clientX;
            var mouse_y = (<MouseEvent>this.move_src).clientY;
            var dist = Math.sqrt(Math.pow(mouse_x - this.player_x, 2) + Math.pow(mouse_y - this.player_y, 2));
        }

        return;
    }
}
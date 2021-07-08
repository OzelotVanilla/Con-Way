import { event } from "./event";
import { player } from "../entity/player"
import { the_space, golSpace } from "../entity/golSpace";

/**
 * Export kinematics data to lead the player's plane's movement.
 * move.x_move stands for move offset in pixels, as well as move.y_move
 */
export class moveevent extends event
{
    /**
     * The move offset in pixels.
     */
    readonly move: { x_move: number, y_move: number };

    private player_x: number;
    private player_y: number;
    private move_src: UIEvent;

    private height: number;
    private width: number;

    /**
     * Get browser's event
     * 
     * @param move_src MouseEvent or KeyboardEvent from browser
     */
    constructor(player_entity: player, move_src: UIEvent, the_space: golSpace)
    {
        super("moveevent", () => { });
        this.move_src = move_src;
        this.player_x = player_entity.xPos;
        this.player_y = player_entity.yPos;
        this.height = the_space.canvas.canvas.height;
        this.width = the_space.canvas.canvas.width;
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
                    // this.move.x_move =this.height*;
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
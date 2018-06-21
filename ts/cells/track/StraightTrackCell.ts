import Sprite from "../../sprite/Sprite";
import { ITrackCell } from "./ITrackCell";

export default class StraightTrackCell implements ITrackCell {
    private horz: boolean = true;

    public get ConnectedUp(): boolean {
        return !this.horz;
    }
    public get ConnectedDown(): boolean {
        return !this.horz;
    }
    public get ConnectedLeft(): boolean {
        return this.horz;
    }
    public get ConnectedRight(): boolean {
        return this.horz;
    }

    constructor(private sprite: Sprite, private cellSize: number) {

    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (!this.horz) {
            context.translate(this.cellSize, 0);
            context.rotate(Math.PI / 2);
        }

        this.sprite.Draw(context, 0, 0);

        if (!this.horz) {
            context.rotate(- Math.PI / 2);
            context.translate(-this.cellSize, 0);
        }
    }
}
import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { StraightTrackDirection } from "./directions/StraightTrackDirectionEnum";
import { ITrackCell } from "./ITrackCell";

export default class StraightTrackCell implements ITrackCell {
    private get Horizontal(): boolean {
        return this.direction === StraightTrackDirection.Horizontal;
    }
    private get Vertical(): boolean {
        return this.direction === StraightTrackDirection.Vertical;
    }

    public get ConnectedUp(): boolean {
        return this.Vertical;
    }
    public get ConnectedDown(): boolean {
        return this.Vertical;
    }
    public get ConnectedLeft(): boolean {
        return this.Horizontal;
    }
    public get ConnectedRight(): boolean {
        return this.Horizontal;
    }

    constructor(private direction: StraightTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {

    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (this.Vertical) {
            context.translate(this.cellSize, 0);
            context.rotate(Math.PI / 2);
        }

        this.spriteCollection.StraightTrackSprite.Draw(context, 0, 0);

        if (this.Vertical) {
            context.rotate(- Math.PI / 2);
            context.translate(-this.cellSize, 0);
        }
    }
}
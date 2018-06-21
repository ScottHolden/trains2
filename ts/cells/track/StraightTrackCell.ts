import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { StraightTrackDirection } from "./directions/StraightTrackDirectionEnum";
import { ITrackCell } from "./ITrackCell";

export default class StraightTrackCell implements ITrackCell {
    public readonly ConnectedUp: boolean;
    public readonly ConnectedDown: boolean;
    public readonly ConnectedLeft: boolean;
    public readonly ConnectedRight: boolean;

    constructor(private direction: StraightTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        this.ConnectedLeft = this.ConnectedRight = this.direction === StraightTrackDirection.Horizontal;
        this.ConnectedUp = this.ConnectedDown = this.direction === StraightTrackDirection.Vertical;
    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (this.direction === StraightTrackDirection.Vertical) {
            context.translate(this.cellSize, 0);
            context.rotate(Math.PI / 2);
        }

        this.spriteCollection.StraightTrackSprite.Draw(context, 0, 0);

        if (this.direction === StraightTrackDirection.Vertical) {
            context.rotate(-Math.PI / 2);
            context.translate(-this.cellSize, 0);
        }
    }
}
import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { StraightTrackDirection } from "./directions/StraightTrackDirectionEnum";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackCellBase from "./TrackCellBase";

export default class StraightTrackCell extends TrackCellBase {
    constructor(private direction: StraightTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandStraightTrackDirections(direction));
    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (this.direction === StraightTrackDirection.UpDown ||
            this.direction === StraightTrackDirection.UpDownLeftRight) {
            this.DrawVerticalTrack(context);
        }
        if (this.direction === StraightTrackDirection.LeftRight ||
            this.direction === StraightTrackDirection.UpDownLeftRight) {
            this.DrawHorizontalTrack(context);
        }
    }
    private DrawVerticalTrack(context: CanvasRenderingContext2D) {
        context.translate(this.cellSize, 0);
        context.rotate(Math.PI / 2);
        this.DrawHorizontalTrack(context);
        context.rotate(-Math.PI / 2);
        context.translate(-this.cellSize, 0);
    }
    private DrawHorizontalTrack(context: CanvasRenderingContext2D) {
        this.spriteCollection.StraightTrackSprite.Draw(context, 0, 0);
    }
}
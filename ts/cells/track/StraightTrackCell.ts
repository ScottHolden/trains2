import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { StraightDirection } from "./directions/StraightDirectionEnum";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackPathHelper from "./helpers/TrackPathHelper";
import TrackCellBase from "./TrackCellBase";

export default class StraightTrackCell extends TrackCellBase {
    public readonly PathPart: any;
    public RequiresRedraw: boolean = true;

    constructor(private readonly direction: StraightDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandStraightTrackDirections(direction));

        this.PathPart = TrackPathHelper.GetStraightPathPart(direction, cellSize);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (this.direction === StraightDirection.UpDown ||
            this.direction === StraightDirection.UpDownLeftRight) {
            this.DrawVerticalTrack(context);
        }
        if (this.direction === StraightDirection.LeftRight ||
            this.direction === StraightDirection.UpDownLeftRight) {
            this.DrawHorizontalTrack(context);
        }
        this.RequiresRedraw = false;
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
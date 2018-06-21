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
        if (this.direction === StraightTrackDirection.UpDown) {
            context.translate(this.cellSize, 0);
            context.rotate(Math.PI / 2);
        }

        this.spriteCollection.StraightTrackSprite.Draw(context, 0, 0);

        if (this.direction === StraightTrackDirection.UpDown) {
            context.rotate(-Math.PI / 2);
            context.translate(-this.cellSize, 0);
        }
    }
}
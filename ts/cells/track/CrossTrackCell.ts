import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackCellBase from "./TrackCellBase";

export default class CrossTrackCell extends TrackCellBase {
    constructor(private spriteCollection: TrackSpriteCollection) {
        super(DirectionHelper.AllBaseDirections);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        this.spriteCollection.CrossTrackSprite.Draw(context, 0, 0);
    }
}
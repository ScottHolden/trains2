import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackCellBase from "./TrackCellBase";

export default class CurvedTrackCell extends TrackCellBase {
    constructor(private direction: CurvedTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandCurvedTrackDirections(direction));
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.direction, this.cellSize);
    }

    protected SetDirection(direction: CurvedTrackDirection) {
        this.direction = direction;
    }
}
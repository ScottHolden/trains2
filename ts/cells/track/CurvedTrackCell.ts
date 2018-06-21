import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedDirection } from "./directions/CurvedDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackCellBase from "./TrackCellBase";

export default class CurvedTrackCell extends TrackCellBase {
    public RequiresRedraw: boolean = true;
    constructor(private readonly direction: CurvedDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandCurvedTrackDirections(direction));
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.direction, this.cellSize);
        this.RequiresRedraw = false;
    }
}
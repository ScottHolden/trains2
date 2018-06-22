import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedDirection } from "./directions/CurvedDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackPathHelper from "./helpers/TrackPathHelper";
import TrackCellBase from "./TrackCellBase";

export default class CurvedTrackCell extends TrackCellBase {
    public readonly PathPart;
    public RequiresRedraw: boolean = true;
    constructor(private readonly direction: CurvedDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandCurvedTrackDirections(direction));
        this.PathPart = TrackPathHelper.GetCurvedPathPart(direction, cellSize);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.direction, this.cellSize);
        this.RequiresRedraw = false;
    }
}
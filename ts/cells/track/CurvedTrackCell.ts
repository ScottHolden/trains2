import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import BonusHelper from "./helpers/BonusHelper";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import { ITrackCell } from "./ITrackCell";

export default class CurvedTrackCell implements ITrackCell {
    public readonly ConnectedUp: boolean;
    public readonly ConnectedDown: boolean;
    public readonly ConnectedLeft: boolean;
    public readonly ConnectedRight: boolean;

    constructor(private direction: CurvedTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        this.ConnectedUp = BonusHelper.AnyEqual(this.direction,
            CurvedTrackDirection.LeftUp, CurvedTrackDirection.UpRight);
        this.ConnectedDown = BonusHelper.AnyEqual(this.direction,
            CurvedTrackDirection.DownLeft, CurvedTrackDirection.RightDown);
        this.ConnectedLeft = BonusHelper.AnyEqual(this.direction,
            CurvedTrackDirection.DownLeft, CurvedTrackDirection.LeftUp);
        this.ConnectedRight = BonusHelper.AnyEqual(this.direction,
            CurvedTrackDirection.RightDown, CurvedTrackDirection.UpRight);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.direction, this.cellSize);
    }

    protected SetDirection(direction: CurvedTrackDirection) {
        this.direction = direction;
    }
}
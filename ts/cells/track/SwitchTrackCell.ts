import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import { SwitchedTrackDirection } from "./directions/SwitchedTrackDirectionEnum";
import BonusHelper from "./helpers/BonusHelper";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import { ITrackCell } from "./ITrackCell";

export default class SwitchTrackCell implements ITrackCell {
    private static readonly CurveMap = {
        [SwitchedTrackDirection.UpRightDown]: [CurvedTrackDirection.UpRight, CurvedTrackDirection.RightDown],
        [SwitchedTrackDirection.RightDownLeft]: [CurvedTrackDirection.RightDown, CurvedTrackDirection.DownLeft],
        [SwitchedTrackDirection.DownLeftUp]: [CurvedTrackDirection.DownLeft, CurvedTrackDirection.LeftUp],
        [SwitchedTrackDirection.LeftUpRight]: [CurvedTrackDirection.LeftUp, CurvedTrackDirection.UpRight]
    }

    public readonly ConnectedUp: boolean;
    public readonly ConnectedDown: boolean;
    public readonly ConnectedLeft: boolean;
    public readonly ConnectedRight: boolean;
    private readonly curves: CurvedTrackDirection[];

    private switched: boolean = false;

    private get primaryCurve(): CurvedTrackDirection {
        return this.switched ? this.curves[1] : this.curves[0];
    }
    private get secodaryCurve(): CurvedTrackDirection {
        return this.switched ? this.curves[0] : this.curves[1];
    }

    constructor(direction: SwitchedTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        this.curves = SwitchTrackCell.CurveMap[direction];
        if (this.curves === undefined || this.curves.length !== 2) {
            throw new Error("Mapping failed, should have just used a switch!");
        }
        this.ConnectedUp = BonusHelper.AnyAnyEqual(this.curves,
            CurvedTrackDirection.LeftUp, CurvedTrackDirection.UpRight);
        this.ConnectedDown = BonusHelper.AnyAnyEqual(this.curves,
            CurvedTrackDirection.DownLeft, CurvedTrackDirection.RightDown);
        this.ConnectedLeft = BonusHelper.AnyAnyEqual(this.curves,
            CurvedTrackDirection.DownLeft, CurvedTrackDirection.LeftUp);
        this.ConnectedRight = BonusHelper.AnyAnyEqual(this.curves,
            CurvedTrackDirection.RightDown, CurvedTrackDirection.UpRight);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.primaryCurve, this.cellSize);
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackNoPlanksSprite,
            this.secodaryCurve, this.cellSize);
    }

    public Switch(): void {
        this.switched = !this.switched;
    }
}
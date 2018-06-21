import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import { SwitchedTrackDirection } from "./directions/SwitchedTrackDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackCellBase from "./TrackCellBase";

export default class SwitchTrackCell extends TrackCellBase {
    private readonly curves: CurvedTrackDirection[];
    private switched: boolean = false;

    constructor(direction: SwitchedTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandSwitchedTrackDirections(direction));
        this.curves = DirectionHelper.ExpandSwitchedTrackToCurved(direction);
        if (this.curves === undefined || this.curves.length !== 2) {
            throw new Error("Mapping failed, should have just used a switch!");
        }
    }

    public Draw(context: CanvasRenderingContext2D): void {
        const primaryCurve = this.switched ? this.curves[1] : this.curves[0];
        const secodaryCurve = this.switched ? this.curves[0] : this.curves[1];

        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            primaryCurve, this.cellSize);
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackNoPlanksSprite,
            secodaryCurve, this.cellSize);
    }

    public Switch(): void {
        this.switched = !this.switched;
    }
}
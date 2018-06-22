import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedDirection } from "./directions/CurvedDirectionEnum";
import { SwitchedDirection } from "./directions/SwitchedDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import DirectionHelper from "./helpers/DirectionHelper";
import TrackPathHelper from "./helpers/TrackPathHelper";
import PathPart from "./PathPart";
import TrackCellBase from "./TrackCellBase";

export default class SwitchTrackCell extends TrackCellBase {
    public get PathPart(): PathPart {
        return this.switched ? this.paths[1] : this.paths[0];
    }
    public RequiresRedraw: boolean = true;
    private readonly curves: CurvedDirection[];
    private readonly paths: PathPart[];
    private switched: boolean = false;

    constructor(direction: SwitchedDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        super(DirectionHelper.ExpandSwitchedTrackDirections(direction));
        this.curves = DirectionHelper.ExpandSwitchedTrackToCurved(direction);
        if (this.curves === undefined || this.curves.length !== 2) {
            throw new Error("Mapping failed, should have just used a switch!");
        }
        this.paths = [
            TrackPathHelper.GetCurvedPathPart(this.curves[0], cellSize),
            TrackPathHelper.GetCurvedPathPart(this.curves[1], cellSize)
        ];
    }

    public Draw(context: CanvasRenderingContext2D): void {
        const primaryCurve = this.switched ? this.curves[1] : this.curves[0];
        const secodaryCurve = this.switched ? this.curves[0] : this.curves[1];

        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            primaryCurve, this.cellSize);
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackNoPlanksSprite,
            secodaryCurve, this.cellSize);

        this.RequiresRedraw = false;
    }

    public Switch(): void {
        this.switched = !this.switched;
        this.RequiresRedraw = true;
    }
}
import { BaseDirection } from "../directions/BaseDirectionEnum";
import { CurvedTrackDirection } from "../directions/CurvedTrackDirectionEnum";
import { StraightTrackDirection } from "../directions/StraightTrackDirectionEnum";
import { SwitchedTrackDirection } from "../directions/SwitchedTrackDirectionEnum";

export default class DirectionHelper {
    public static readonly AllBaseDirections: BaseDirection[] = [
        BaseDirection.Up,
        BaseDirection.Right,
        BaseDirection.Down,
        BaseDirection.Left
    ];
    public static DirectionsContain(directions: BaseDirection[], target: BaseDirection): boolean {
        return directions.indexOf(target) >= 0;
    }
    public static ExpandSwitchedTrackDirections(direction: SwitchedTrackDirection): BaseDirection[] {
        return [].concat(...this.ExpandSwitchedTrackToCurved(direction).map(this.ExpandCurvedTrackDirections));
    }
    public static ExpandSwitchedTrackToCurved(direction: SwitchedTrackDirection): CurvedTrackDirection[] {
        return this.SwitchedInnerDirections[direction];
    }
    public static ExpandCurvedTrackDirections(direction: CurvedTrackDirection): BaseDirection[] {
        return this.CurvedInnerDirections[direction];
    }
    public static ExpandStraightTrackDirections(direction: StraightTrackDirection): BaseDirection[] {
        return this.StraightInnerDirections[direction];
    }

    private static readonly SwitchedInnerDirections: IEnumArrayMap<CurvedTrackDirection> = {
        [SwitchedTrackDirection.UpRightDown]: [CurvedTrackDirection.UpRight, CurvedTrackDirection.RightDown],
        [SwitchedTrackDirection.RightDownLeft]: [CurvedTrackDirection.RightDown, CurvedTrackDirection.DownLeft],
        [SwitchedTrackDirection.DownLeftUp]: [CurvedTrackDirection.DownLeft, CurvedTrackDirection.LeftUp],
        [SwitchedTrackDirection.LeftUpRight]: [CurvedTrackDirection.LeftUp, CurvedTrackDirection.UpRight]
    };
    private static readonly CurvedInnerDirections: IEnumArrayMap<BaseDirection> = {
        [CurvedTrackDirection.UpRight]: [BaseDirection.Up, BaseDirection.Right],
        [CurvedTrackDirection.RightDown]: [BaseDirection.Right, BaseDirection.Down],
        [CurvedTrackDirection.DownLeft]: [BaseDirection.Down, BaseDirection.Left],
        [CurvedTrackDirection.LeftUp]: [BaseDirection.Left, BaseDirection.Up]
    };
    private static readonly StraightInnerDirections: IEnumArrayMap<BaseDirection> = {
        [StraightTrackDirection.LeftRight]: [BaseDirection.Left, BaseDirection.Right],
        [StraightTrackDirection.UpDown]: [BaseDirection.Up, BaseDirection.Down]
    };
}
// Should move this, but it is internal only
interface IEnumArrayMap<T> { [key: number]: T[]; }
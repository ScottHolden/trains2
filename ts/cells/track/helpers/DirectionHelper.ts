import { BaseDirection } from "../directions/BaseDirectionEnum";
import { CurvedDirection } from "../directions/CurvedDirectionEnum";
import { StraightDirection } from "../directions/StraightDirectionEnum";
import { SwitchedDirection } from "../directions/SwitchedDirectionEnum";

export default class DirectionHelper {
    public static DirectionsContain(directions: BaseDirection[], target: BaseDirection): boolean {
        return directions.indexOf(target) >= 0;
    }
    public static ExpandSwitchedTrackDirections(direction: SwitchedDirection): BaseDirection[] {
        return [].concat(...this.ExpandSwitchedTrackToCurved(direction).map(this.ExpandCurvedTrackDirections));
    }
    public static ExpandSwitchedTrackToCurved(direction: SwitchedDirection): CurvedDirection[] {
        return this.SwitchedInnerDirections[direction];
    }
    public static ExpandCurvedTrackDirections(direction: CurvedDirection): BaseDirection[] {
        return this.CurvedInnerDirections[direction];
    }
    public static ExpandStraightTrackDirections(direction: StraightDirection): BaseDirection[] {
        return this.StraightInnerDirections[direction];
    }

    private static readonly SwitchedInnerDirections = {
        [SwitchedDirection.UpRightDown]: [CurvedDirection.UpRight, CurvedDirection.RightDown],
        [SwitchedDirection.RightDownLeft]: [CurvedDirection.RightDown, CurvedDirection.DownLeft],
        [SwitchedDirection.DownLeftUp]: [CurvedDirection.DownLeft, CurvedDirection.LeftUp],
        [SwitchedDirection.LeftUpRight]: [CurvedDirection.LeftUp, CurvedDirection.UpRight]
    };
    private static readonly CurvedInnerDirections = {
        [CurvedDirection.UpRight]: [BaseDirection.Up, BaseDirection.Right],
        [CurvedDirection.RightDown]: [BaseDirection.Right, BaseDirection.Down],
        [CurvedDirection.DownLeft]: [BaseDirection.Down, BaseDirection.Left],
        [CurvedDirection.LeftUp]: [BaseDirection.Left, BaseDirection.Up]
    };
    private static readonly StraightInnerDirections = {
        [StraightDirection.LeftRight]: [BaseDirection.Left, BaseDirection.Right],
        [StraightDirection.UpDown]: [BaseDirection.Up, BaseDirection.Down],
        [StraightDirection.UpDownLeftRight]:
            [BaseDirection.Up, BaseDirection.Down, BaseDirection.Left, BaseDirection.Right]
    };
}
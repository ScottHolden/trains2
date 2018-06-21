import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import { SwitchedTrackDirectionEnum } from "./directions/SwitchedTrackDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import { ITrackCell } from "./ITrackCell";

export default class SwitchTrackCell implements ITrackCell {
    private readonly curve1: CurvedTrackDirection;
    private readonly curve2: CurvedTrackDirection;

    private switched: boolean = false;

    private get primaryCurve(): CurvedTrackDirection {
        return this.switched ? this.curve2 : this.curve1;
    }
    private get secodaryCurve(): CurvedTrackDirection {
        return this.switched ? this.curve1 : this.curve2;
    }

    public get ConnectedUp(): boolean {
        return this.ContainsDirection(CurvedTrackDirection.LeftUp) ||
            this.ContainsDirection(CurvedTrackDirection.UpRight);
    }
    public get ConnectedDown(): boolean {
        return this.ContainsDirection(CurvedTrackDirection.DownLeft) ||
            this.ContainsDirection(CurvedTrackDirection.RightDown);
    }
    public get ConnectedLeft(): boolean {
        return this.ContainsDirection(CurvedTrackDirection.DownLeft) ||
            this.ContainsDirection(CurvedTrackDirection.LeftUp);
    }
    public get ConnectedRight(): boolean {
        return this.ContainsDirection(CurvedTrackDirection.RightDown) ||
            this.ContainsDirection(CurvedTrackDirection.UpRight);
    }

    constructor(direction: SwitchedTrackDirectionEnum, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
        switch (direction) {
            case (SwitchedTrackDirectionEnum.UpRightDown): {
                this.curve1 = CurvedTrackDirection.UpRight;
                this.curve2 = CurvedTrackDirection.RightDown;
                break;
            }
            case (SwitchedTrackDirectionEnum.RightDownLeft): {
                this.curve1 = CurvedTrackDirection.RightDown;
                this.curve2 = CurvedTrackDirection.DownLeft;
                break;
            }
            case (SwitchedTrackDirectionEnum.DownLeftUp): {
                this.curve1 = CurvedTrackDirection.DownLeft;
                this.curve2 = CurvedTrackDirection.LeftUp;
                break;
            }
            case (SwitchedTrackDirectionEnum.LeftUpRight): {
                this.curve1 = CurvedTrackDirection.LeftUp;
                this.curve2 = CurvedTrackDirection.UpRight;
                break;
            }
        }
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

    private ContainsDirection(x: CurvedTrackDirection): boolean {
        return x === this.curve1 || x === this.curve2;
    }
}
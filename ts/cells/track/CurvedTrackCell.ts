import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { CurvedTrackDirection } from "./directions/CurvedTrackDirectionEnum";
import CurvedTrackHelper from "./helpers/CurvedTrackHelper";
import { ITrackCell } from "./ITrackCell";

export default class CurvedTrackCell implements ITrackCell {
    public get ConnectedUp(): boolean {
        return this.direction === CurvedTrackDirection.LeftUp ||
            this.direction === CurvedTrackDirection.UpRight;
    }
    public get ConnectedDown(): boolean {
        return this.direction === CurvedTrackDirection.DownLeft ||
            this.direction === CurvedTrackDirection.RightDown;
    }
    public get ConnectedLeft(): boolean {
        return this.direction === CurvedTrackDirection.DownLeft ||
            this.direction === CurvedTrackDirection.LeftUp;
    }
    public get ConnectedRight(): boolean {
        return this.direction === CurvedTrackDirection.RightDown ||
            this.direction === CurvedTrackDirection.UpRight;
    }

    constructor(private direction: CurvedTrackDirection, private spriteCollection: TrackSpriteCollection,
                private cellSize: number) {
    }

    public Draw(context: CanvasRenderingContext2D): void {
        CurvedTrackHelper.DrawSpriteWithTranslation(context, this.spriteCollection.CurvedTrackSprite,
            this.direction, this.cellSize);
    }

    protected SetDirection(direction: CurvedTrackDirection) {
        this.direction = direction;
    }
}
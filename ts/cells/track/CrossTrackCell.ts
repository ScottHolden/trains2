import TrackSpriteCollection from "../../sprite/TrackSpriteCollection";
import { ITrackCell } from "./ITrackCell";

export default class CrossTrackCell implements ITrackCell {
    public readonly ConnectedUp: boolean = true;
    public readonly ConnectedDown: boolean = true;
    public readonly ConnectedLeft: boolean = true;
    public readonly ConnectedRight: boolean = true;

    constructor(private spriteCollection: TrackSpriteCollection) {
    }

    public Draw(context: CanvasRenderingContext2D): void {
        this.spriteCollection.CrossTrackSprite.Draw(context, 0, 0);
    }
}
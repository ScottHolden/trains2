import { BaseDirection } from "./directions/BaseDirectionEnum";
import DirectionHelper from "./helpers/DirectionHelper";
import { ITrackCell } from "./ITrackCell";

export default abstract class TrackCellBase implements ITrackCell {
    public readonly ConnectedUp: boolean;
    public readonly ConnectedDown: boolean;
    public readonly ConnectedLeft: boolean;
    public readonly ConnectedRight: boolean;
    constructor(connectedDirections: BaseDirection[]) {
        this.ConnectedUp = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Up);
        this.ConnectedDown = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Down);
        this.ConnectedLeft = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Left);
        this.ConnectedRight = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Right);
    }
    public abstract Draw(context: CanvasRenderingContext2D): void;
}
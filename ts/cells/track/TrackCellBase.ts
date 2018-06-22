import { BaseDirection } from "./directions/BaseDirectionEnum";
import DirectionHelper from "./helpers/DirectionHelper";
import { ITrackCell } from "./ITrackCell";
import PathPart from "./PathPart";

export default abstract class TrackCellBase implements ITrackCell {
    public readonly abstract PathPart: PathPart;
    public readonly ConnectedUp: boolean;
    public readonly ConnectedDown: boolean;
    public readonly ConnectedLeft: boolean;
    public readonly ConnectedRight: boolean;
    public abstract RequiresRedraw: boolean;
    constructor(connectedDirections: BaseDirection[]) {
        this.ConnectedUp = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Up);
        this.ConnectedDown = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Down);
        this.ConnectedLeft = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Left);
        this.ConnectedRight = DirectionHelper.DirectionsContain(connectedDirections, BaseDirection.Right);
    }
    public abstract Draw(context: CanvasRenderingContext2D): void;
}
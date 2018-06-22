import GraphicsContext from "../area/GraphicsContext";
import Path from "./path/path";
import IPointAngle from "./point/ipointangle";
import IVelocityPoint from "./point/ivelocitypoint";

export default abstract class Vehicle {
    protected FrontAxle: IVelocityPoint;
    protected RearAxle: IPointAngle;

    constructor(private vehicleLength: number) {
    }

    public abstract Draw(context: GraphicsContext): void;

    public Move(path: Path, steps: number) {
        this.InternalMove(path, steps);
    }
    protected InternalMove(path: Path, steps: number) {
        // Drive!
        this.FrontAxle.SetPointAngle(path.Move(this.FrontAxle, steps));
        // Move back the length of the vehicle
        this.RearAxle.SetPointAngle(path.MoveDistance(this.FrontAxle, -this.vehicleLength));
    }
}
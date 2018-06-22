import IPointAngle from "../point/ipointangle";
import IVelocityPoint from "../point/ivelocitypoint";

export default class Path {
    public Move(start: IVelocityPoint, steps: number): IPointAngle {
        return this.MoveDistance(start, start.Velocity * steps);
    }
    public MoveDistance(start: IPointAngle, distance: number): IPointAngle {
        return null;
    }
}
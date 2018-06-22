import IPointAngle from "../point/IPointAngle";
import IVelocityPoint from "../point/IVelocityPoint";

export default class Path {
    public Move(start: IVelocityPoint, steps: number): IPointAngle {
        return this.MoveDistance(start, start.Velocity * steps);
    }
    public MoveDistance(start: IPointAngle, distance: number): IPointAngle {
        return null;
    }
}
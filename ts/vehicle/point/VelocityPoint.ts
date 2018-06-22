import IVelocityPoint from "./IVelocityPoint";
import PointAngle from "./PointAngle";

export default class VelocityPointAngle extends PointAngle implements IVelocityPoint {
    constructor(X: number = 0, Y: number = 0, Angle: number = 0, public Velocity: number = 0) {
        super(X, Y, Angle);
    }
    public Clone(): IVelocityPoint {
        return new VelocityPointAngle(this.X, this.Y, this.Angle, this.Velocity);
    }
    public SetVelocityPoint(velocityPoint: IVelocityPoint): IVelocityPoint {
        super.SetPointAngle(velocityPoint);
        this.Velocity = velocityPoint.Velocity;
        return this;
    }
}
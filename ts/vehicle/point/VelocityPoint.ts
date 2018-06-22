import IVelocityPoint from "./IVelocityPoint";
import PointAngle from "./PointAngle";

export default class VelocityPointAngle extends PointAngle implements IVelocityPoint {
    public Velocity: number;
    public Clone(): IVelocityPoint {
        return new VelocityPointAngle().SetVelocityPoint(this);
    }
    public SetVelocityPoint(velocityPoint: IVelocityPoint): IVelocityPoint {
        super.SetPointAngle(velocityPoint);
        this.Velocity = velocityPoint.Velocity;
        return this;
    }
}
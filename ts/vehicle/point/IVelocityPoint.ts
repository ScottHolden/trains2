import IPointAngle from "./IPointAngle";

export default interface IVelocityPoint extends IPointAngle {
    readonly Velocity: number;
    SetVelocityPoint(velocityPoint: IVelocityPoint);
    Clone(): IVelocityPoint;
}
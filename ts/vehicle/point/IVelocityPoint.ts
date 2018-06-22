import IPointAngle from "./IPointAngle";

export default interface IVelocityPoint extends IPointAngle {
    Velocity: number;
    SetVelocityPoint(velocityPoint: IVelocityPoint);
    Clone(): IVelocityPoint;
}
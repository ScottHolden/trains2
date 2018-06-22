import IPoint from "./IPoint";

export default interface IPointAngle extends IPoint {
    readonly Angle: number;
    SetPointAngle(pointAngle: IPointAngle);
    Clone(): IPointAngle;
}
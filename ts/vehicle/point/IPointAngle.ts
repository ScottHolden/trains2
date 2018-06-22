import IPoint from "./IPoint";

export default interface IPointAngle extends IPoint {
    Angle: number;
    SetPointAngle(pointAngle: IPointAngle);
    Clone(): IPointAngle;
}
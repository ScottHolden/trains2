export default interface IPoint {
    readonly X: number;
    readonly Y: number;
    SetPoint(point: IPoint);
    Clone(): IPoint;
    Equals(point: IPoint);
}
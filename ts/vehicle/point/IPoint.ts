export default interface IPoint {
    X: number;
    Y: number;
    SetPoint(point: IPoint);
    Clone(): IPoint;
}
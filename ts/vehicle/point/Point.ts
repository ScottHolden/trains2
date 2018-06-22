import IPoint from "./IPoint";

export default class Point implements IPoint {
    private static readonly EqualThreshold: number = 0.0001;
    constructor(public X: number = 0, public Y: number = 0) {
    }
    public Clone(): IPoint {
        return new Point(this.X, this.Y);
    }
    public SetPoint(source: IPoint): IPoint {
        this.X = source.X;
        this.Y = source.Y;
        return this;
    }
    public Equals(point: IPoint) {
        return Math.abs(this.X - point.X) < Point.EqualThreshold &&
                Math.abs(this.Y - point.Y) < Point.EqualThreshold;
    }
}
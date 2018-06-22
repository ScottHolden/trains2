import IPoint from "./IPoint";

export default class Point implements IPoint {
    public X: number;
    public Y: number;
    public Clone(): IPoint {
        return new Point().SetPoint(this);
    }
    public SetPoint(source: IPoint): IPoint {
        this.X = source.X;
        this.Y = source.Y;
        return this;
    }
}
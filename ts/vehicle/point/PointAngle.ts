import IPointAngle from "./IPointAngle";
import Point from "./Point";

export default class PointAngle extends Point implements IPointAngle {
    constructor(X: number = 0, Y: number = 0, public Angle: number = 0) {
        super(X, Y);
    }
    public Clone(): IPointAngle {
        return new PointAngle(this.X, this.Y, this.Angle);
    }
    public SetPointAngle(source: IPointAngle): IPointAngle {
        super.SetPoint(source);
        this.Angle = source.Angle;
        return this;
    }
}
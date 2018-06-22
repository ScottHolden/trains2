import IPointAngle from "./IPointAngle";
import Point from "./Point";

export default class PointAngle extends Point implements IPointAngle {
    public Angle: number;
    public Clone(): IPointAngle {
        return new PointAngle().SetPointAngle(this);
    }
    public SetPointAngle(source: IPointAngle): IPointAngle {
        super.SetPoint(source);
        this.Angle = source.Angle;
        return this;
    }
}
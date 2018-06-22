import Path from "./path/path";
import Vehicle from "./vehicle";

export default class DemoTrain extends Vehicle {
    private carriageCount: number;

    constructor(vehicleLength: number, carriageCount?: number) {
        super(vehicleLength);

        if (carriageCount !== null && carriageCount > 0) {
            this.carriageCount = carriageCount;
        }
    }

    public Draw(context: any): void {
        throw new Error("Method not implemented.");
    }

    protected InternalMove(path: Path, steps: number) {
        super.InternalMove(path, steps);
        // Map out carriages
        const carriageLength = 10;
        const carriageLinkageLength = 10;
        const carriage = this.RearAxle.Clone();
        for (let i = 0; i < this.carriageCount; i++) {
            carriage.SetPointAngle(path.MoveDistance(carriage, -carriageLinkageLength));
            // At front axle of carriage
            carriage.SetPointAngle(path.MoveDistance(carriage, -carriageLength));
            // At rear axle of carriage
        }
    }
}
import Path from "./path/Path";
import Vehicle from "./Vehicle";

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
            carriage.SetPointAngle(path.MoveDistance(carriage, -carriageLength));
            // At middle of carriage
        }
    }
}
import Vehicle from "./vehicle";

export default class DemoCar extends Vehicle {
    constructor(vehicleLength: number) {
        super(vehicleLength);
        throw new Error("Car's don't exist... yet.");
    }

    public Draw(context: any): void {
        throw new Error("Method not implemented.");
    }
}
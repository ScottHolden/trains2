import ICell from "./ICell";

export default class EmptyCell implements ICell {
    public Draw(_: CanvasRenderingContext2D): void {
        // Clear out!
    }
}
export default interface ICell {
    RequiresRedraw: boolean;
    Draw(context: CanvasRenderingContext2D): void;
}
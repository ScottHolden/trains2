export default interface IArea {
    GetCell(col: number, row: number);
    Draw(context: CanvasRenderingContext2D): void;
}
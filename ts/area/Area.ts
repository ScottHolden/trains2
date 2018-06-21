import ICell from "../cells/ICell";
import Grid from "./Grid";
import IArea from "./IArea";

export default class Area implements IArea {
    private readonly cells: Grid<ICell>;
    constructor(cols: number, rows: number) {
        this.cells = new Grid<ICell>(cols, rows);
    }
    public GetCell(col: number, row: number) {
        throw new Error("Method not implemented.");
    }
    public Draw(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}
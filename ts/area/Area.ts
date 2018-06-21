import ICell from "../cells/ICell";
import Grid from "./Grid";

export default class Area {
    private readonly cells: Grid<ICell>;
    private areaContext: CanvasRenderingContext2D | null;

    constructor(cols: number, rows: number) {
        this.cells = new Grid<ICell>(cols, rows);
    }
    public GetCell(col: number, row: number) {
        throw new Error("Method not implemented.");
    }
    public Draw(context: CanvasRenderingContext2D): void {
        if (this.areaContext === undefined || this.areaContext === null) {
            return;
        }
        throw new Error("Method not implemented.");
    }
    public AquireContext(context: CanvasRenderingContext2D): void {
        this.areaContext = context;
    }
    public ReleaseContext(): CanvasRenderingContext2D {
        const context = this.areaContext;
        this.areaContext = null;
        return context;
    }
}
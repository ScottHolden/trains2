import ICell from "../cells/ICell";
import GraphicsContext from "./GraphicsContext";
import Grid from "./Grid";

export default class Area {
    private readonly cells: Grid<ICell>;
    private areaContext: GraphicsContext | null;

    constructor(cols: number, rows: number) {
        this.cells = new Grid<ICell>(cols, rows);
    }
    public GetCell(col: number, row: number) {
        throw new Error("Method not implemented.");
    }
    public Draw(context: GraphicsContext): void {
        if (this.areaContext === undefined || this.areaContext === null) {
            return;
        }
        // Check for internal redraw, and draw those
        this.cells.ForPredicate((cell) => cell.RequiresRedraw, this.DrawWithInternalContext);
        // Draw area to given context
        this.areaContext.DrawTo(context);
    }
    public AquireContext(context: GraphicsContext): void {
        this.areaContext = context;
    }
    public ReleaseContext(): GraphicsContext {
        const context = this.areaContext;
        this.areaContext = null;
        return context;
    }
    private DrawWithInternalContext(cell: ICell): void {
        // Translate to cell position
        cell.Draw(this.areaContext.Context);
        // Translate back
    }
}
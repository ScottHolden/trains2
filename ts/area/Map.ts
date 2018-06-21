import Area from "./Area";
import Grid from "./Grid";

export default class Map {
    private readonly cells: Grid<Area>;

    public Draw(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}
export default class Grid<T> {
    private readonly items: T[];
    constructor(private readonly cols: number, private readonly rows: number) {
        this.items = new Array(cols * rows);
    }
    public Get(col: number, row: number): T {
        const index = this.TranslateIndex(col, row);
        return this.items[index];
    }
    public Set(col: number, row: number, value: T): void {
        const index = this.TranslateIndex(col, row);
        this.items[index] = value;
    }
    private TranslateIndex(col: number, row: number): number {
        if (col < 0) { throw new RangeError("Column index was less than 0"); }
        if (col >= this.cols) { throw new RangeError("Column index greater than or equal to number of columns"); }
        if (row < 0) { throw new RangeError("Row index was less than 0"); }
        if (row >= this.rows) { throw new RangeError("Row index greater than or equal to number of row"); }

        return col * this.rows + row;
    }
}
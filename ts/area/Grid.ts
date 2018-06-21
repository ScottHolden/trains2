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
    public Any(predicate: (item: T) => boolean): boolean {
        for (const item of this.items) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
    public ForPredicate(predicate: (item: T) => boolean, func: (item: T) => void): boolean {
        let anyFound = false;
        for (const item of this.items) {
            if (predicate(item)) {
                func(item);
                anyFound = true;
            }
        }
        return anyFound;
    }
    private TranslateIndex(col: number, row: number): number {
        if (col < 0) { throw new RangeError("Column index was less than 0"); }
        if (col >= this.cols) { throw new RangeError("Column index greater than or equal to number of columns"); }
        if (row < 0) { throw new RangeError("Row index was less than 0"); }
        if (row >= this.rows) { throw new RangeError("Row index greater than or equal to number of row"); }

        return col * this.rows + row;
    }
}
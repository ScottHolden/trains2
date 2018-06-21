
// Please remove/rewrite this... or even just give it a proper name!
export default class BonusHelper {
    public static AnyEqual<T>(item: T, ...others: T[]): boolean {
        if (item === undefined ||
            others === undefined ||
            others.length < 1) {
            return false;
        }
        for (const other of others) {
            if (item === other) {
                return true;
            }
        }
        return false;
    }
    public static AnyAnyEqual<T>(items: T[], ...others: T[]): boolean {
        if (items === undefined ||
            items.length < 1 ||
            others === undefined ||
            others.length < 1) {
            return false;
        }
        for (const item of items) {
            if (this.AnyEqual(item, ...others)) {
                return true;
            }
        }
        return false;
    }
}
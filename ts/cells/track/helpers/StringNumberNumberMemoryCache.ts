// tslint:disable-next-line:max-classes-per-file
export default class StringNumberNumberMemoryCache<V> {
    private readonly cache: {
        [key: string]: {
            [key: number]: {
                [key: number]: V;
            };
        };
    } = {};

    public GetOrSet(typeString: string, typeKey: number, numberKey: number,
                    setFunc: (typeKey: number, numberKey: number) => V) {
        if (this.cache[typeString] === undefined) {
            this.cache[typeString] = {};
        }
        if (this.cache[typeString][typeKey] === undefined) {
            this.cache[typeString][typeKey] = {};
        }
        if (this.cache[typeString][typeKey][numberKey] === undefined) {
            this.cache[typeString][typeKey][numberKey] = setFunc(typeKey, numberKey);
        }
        return this.cache[typeString][typeKey][numberKey];
    }
}
import { CurvedDirection } from "../directions/CurvedDirectionEnum";
import { StraightDirection } from "../directions/StraightDirectionEnum";
import StringNumberNumberMemoryCache from "./StringNumberNumberMemoryCache";

export default class TrackPathHelper {
    public static GetCurvedPathPart(direction: CurvedDirection, cellSize: number): number[][][] {
        return this.TrackPathCache.GetOrSet("CurvedDirection", direction, cellSize, this.InternalGetCurvedPathPart);
    }
    public static GetStraightPathPart(direction: StraightDirection, cellSize: number) {
        return this.TrackPathCache.GetOrSet("StraightDirection", direction, cellSize, this.InternalGetStraightPathPart);
    }

    private static readonly TrackPathCache: StringNumberNumberMemoryCache<number[][][]> =
        new StringNumberNumberMemoryCache<number[][][]>();

    private static InternalGetCurvedPathPart(direction: CurvedDirection, cellSize: number): number[][][] {
        const horzPathPart = [ [0, cellSize / 2], [cellSize, cellSize / 2] ];
        switch (direction) {
            case (CurvedDirection.LeftUp): {
                return [horzPathPart];
            }
        }
    }
    private static InternalGetStraightPathPart(direction: StraightDirection, cellSize: number) {
        const horzPathPart = [ [0, cellSize / 2], [cellSize, cellSize / 2] ];
        const vertPathPart =  [ [cellSize / 2, 0], [cellSize / 2, cellSize] ];
        switch (direction) {
            case (StraightDirection.LeftRight): {
                return [horzPathPart];
            }
            case (StraightDirection.UpDown): {
                return [vertPathPart];
            }
            case (StraightDirection.UpDownLeftRight): {
                return [horzPathPart, vertPathPart];
            }
        }
    }
}
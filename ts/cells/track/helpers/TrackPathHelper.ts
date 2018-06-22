import { CurvedDirection } from "../directions/CurvedDirectionEnum";
import { StraightDirection } from "../directions/StraightDirectionEnum";

export default class TrackPathHelper {
    public static GetCurvedPathPart(direction: CurvedDirection, cellSize: number) {
        const horzPathPart = [ [0, cellSize / 2], [cellSize, cellSize / 2] ];
        switch (direction) {
            case (CurvedDirection.LeftUp): {
                return [horzPathPart];
            }
        }
    }
    public static GetStraightPathPart(direction: StraightDirection, cellSize: number) {
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
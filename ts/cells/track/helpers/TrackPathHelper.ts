import LinkedPoint from "../../../vehicle/point/LinkedPoint";
import { CurvedDirection } from "../directions/CurvedDirectionEnum";
import { StraightDirection } from "../directions/StraightDirectionEnum";
import StringNumberNumberMemoryCache from "./StringNumberNumberMemoryCache";

export default class TrackPathHelper {
    public static GetCurvedPathPart(direction: CurvedDirection, cellSize: number): LinkedPoint[][] {
        return this.TrackPathCache.GetOrSet("CurvedDirection", direction, cellSize, this.GenerateCurvedPathPart);
    }
    public static GetStraightPathPart(direction: StraightDirection, cellSize: number): LinkedPoint[][] {
        return this.TrackPathCache.GetOrSet("StraightDirection", direction, cellSize, this.GenerateStraightPathPart);
    }

    private static readonly TrackPathCache: StringNumberNumberMemoryCache<LinkedPoint[][]> =
        new StringNumberNumberMemoryCache<LinkedPoint[][]>();

    private static GenerateCurvedPathPart(direction: CurvedDirection, cellSize: number): LinkedPoint[][] {
        // Guessing steps for the moment?
        const stepsInCurve = cellSize / 2;
        switch (direction) {
            case (CurvedDirection.UpRight): {
                return [this.GenerateCurve(cellSize, false, false, stepsInCurve)];
            }
            case (CurvedDirection.RightDown): {
                return [this.GenerateCurve(cellSize, false, true, stepsInCurve)];
            }
            case (CurvedDirection.DownLeft): {
                return [this.GenerateCurve(cellSize, true, true, stepsInCurve)];
            }
            case (CurvedDirection.LeftUp): {
                return [this.GenerateCurve(cellSize, true, false, stepsInCurve)];
            }
        }
    }
    private static GenerateCurve(cellSize: number, flipX: boolean, flipY: boolean,
                                 stepsInCurve: number = 10): LinkedPoint[] {
        // This gives us a Up-Right
        const points: LinkedPoint[] = [];
        const halfCellSize = cellSize / 2;
        let lastPoint: LinkedPoint;
        for (let i = 0; i <= stepsInCurve; i++) {
            const angle = (Math.PI / 2) * (i / stepsInCurve);
            let x = halfCellSize * (2 - Math.cos(angle));
            let y = halfCellSize * Math.sin(angle);
            if (flipX) {
                x = cellSize - x;
            }
            if (flipY) {
                y = cellSize - y;
            }
            const point = new LinkedPoint(x, y);
            if (i > 0) {
                point.AddLink(lastPoint);
            }
            lastPoint = point;
            points.push(point);
        }
        return points;
    }

    private static GenerateStraightPathPart(direction: StraightDirection, cellSize: number): LinkedPoint[][] {
        const halfCellSize = cellSize / 2;
        const points: LinkedPoint[][] = [];
        if (direction === StraightDirection.LeftRight || direction === StraightDirection.UpDownLeftRight) {
            const p1 = new LinkedPoint(0, halfCellSize);
            const p2 = new LinkedPoint(cellSize, halfCellSize);
            p1.AddLink(p2);
            points.push([p1, p2]);
        }
        if (direction === StraightDirection.UpDown || direction === StraightDirection.UpDownLeftRight) {
            const p1 = new LinkedPoint(halfCellSize, 0);
            const p2 = new LinkedPoint(halfCellSize, cellSize);
            p1.AddLink(p2);
            points.push([p1, p2]);
        }
        return points;
    }
}
import Sprite from "../../../sprite/Sprite";
import { CurvedTrackDirection } from "../directions/CurvedTrackDirectionEnum";

export default class CurvedTrackHelper {
    public static DrawSpriteWithTranslation(context: CanvasRenderingContext2D, sprite: Sprite,
                                            direction: CurvedTrackDirection, cellSize: number) {
        this.Translate(context, direction, cellSize);
        sprite.Draw(context, 0, 0);
        this.Translate(context, direction, cellSize, true);
    }

    private static Translate(context: CanvasRenderingContext2D, direction: CurvedTrackDirection,
                             cellSize: number, reverse: boolean = false): void {
        const rotation = this.GetTranslateRotation(direction);
        const translation = this.GetTranslateTranslation(direction, cellSize);
        if (rotation !== 0 ||
            translation[0] !== 0 ||
            translation[1] !== 0) {
            if (!reverse) {
                context.translate(translation[0], translation[1]);
                context.rotate(rotation);
            } else {
                context.rotate(-rotation);
                context.translate(-translation[0], -translation[1]);
            }
        }
    }

    private static GetTranslateRotation(direction: CurvedTrackDirection): number {
        switch (direction) {
            case (CurvedTrackDirection.UpRight): {
                return 0;
            }
            case (CurvedTrackDirection.RightDown): {
                return Math.PI / 2;
            }
            case (CurvedTrackDirection.DownLeft): {
                return Math.PI;
            }
            case (CurvedTrackDirection.LeftUp): {
                return Math.PI * 1.5;
            }
        }
    }

    private static GetTranslateTranslation(direction: CurvedTrackDirection, cellSize: number): number[] {
        switch (direction) {
            case (CurvedTrackDirection.UpRight): {
                return [0, 0];
            }
            case (CurvedTrackDirection.RightDown): {
                return [0, cellSize];
            }
            case (CurvedTrackDirection.DownLeft): {
                return [cellSize, cellSize];
            }
            case (CurvedTrackDirection.LeftUp): {
                return [cellSize, 0];
            }
        }
    }
}
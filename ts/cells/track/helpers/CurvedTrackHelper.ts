import Sprite from "../../../sprite/Sprite";
import { CurvedTrackDirection } from "../directions/CurvedTrackDirectionEnum";

export default class CurvedTrackHelper {
    public static DrawSpriteWithTranslation(context: CanvasRenderingContext2D, sprite: Sprite,
                                            direction: CurvedTrackDirection, cellSize: number) {
        this.Translate(context, direction, cellSize);
        sprite.Draw(context, 0, 0);
        this.Translate(context, direction, cellSize, true);
    }

    private static readonly TranslationMap = {
        [CurvedTrackDirection.UpRight]: [0, 0],
        [CurvedTrackDirection.RightDown]: [0, 1],
        [CurvedTrackDirection.DownLeft]: [1, 1],
        [CurvedTrackDirection.LeftUp]: [1, 0]
    }

    private static readonly RotationMap = {
        [CurvedTrackDirection.UpRight]: 0,
        [CurvedTrackDirection.RightDown]: Math.PI / 2,
        [CurvedTrackDirection.DownLeft]: Math.PI,
        [CurvedTrackDirection.LeftUp]: Math.PI * 1.5
    }

    private static Translate(context: CanvasRenderingContext2D, direction: CurvedTrackDirection,
                             cellSize: number, reverse: boolean = false): void {
        const rotation = this.RotationMap[direction];
        const translation = this.TranslationMap[direction];
        if (rotation !== 0 ||
            translation[0] !== 0 ||
            translation[1] !== 0) {
            if (!reverse) {
                context.translate(translation[0] * cellSize, translation[1] * cellSize);
                context.rotate(rotation);
            } else {
                context.rotate(-rotation);
                context.translate(-translation[0] * cellSize, -translation[1] * cellSize);
            }
        }
    }
}
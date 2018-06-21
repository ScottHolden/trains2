import Sprite from "../../../sprite/Sprite";
import { CurvedDirection } from "../directions/CurvedDirectionEnum";

export default class CurvedTrackHelper {
    public static DrawSpriteWithTranslation(context: CanvasRenderingContext2D, sprite: Sprite,
                                            direction: CurvedDirection, cellSize: number) {
        this.Translate(context, direction, cellSize);
        sprite.Draw(context, 0, 0);
        this.Translate(context, direction, cellSize, true);
    }

    private static readonly TranslationMap = {
        [CurvedDirection.UpRight]: [0, 0],
        [CurvedDirection.RightDown]: [0, 1],
        [CurvedDirection.DownLeft]: [1, 1],
        [CurvedDirection.LeftUp]: [1, 0]
    };

    private static readonly RotationMap = {
        [CurvedDirection.UpRight]: 0,
        [CurvedDirection.RightDown]: Math.PI / 2,
        [CurvedDirection.DownLeft]: Math.PI,
        [CurvedDirection.LeftUp]: Math.PI * 1.5
    };

    private static Translate(context: CanvasRenderingContext2D, direction: CurvedDirection,
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
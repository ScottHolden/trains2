import DataUrlSprite from "DataUrlSprite";
import Sprite from "Sprite";
import CrossTrackSprite from "track/CrossTrackSprite";
import CurvedTrackSprite from "track/CurvedTrackSprite";
import StraightTrackSprite from "track/StraightTrackSprite";

export default class TrackSpriteCollection {
    public readonly StraightTrackSprite: Sprite;
    public readonly StraightTerminatorTrackSprite: Sprite;
    public readonly CurvedTrackSprite: Sprite;
    public readonly CurvedTrackNoPlanksSprite: Sprite;
    public readonly CrossTrackSprite: Sprite;

    constructor(cellSize: number, trackWidth: number) {
        const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA51BMVEX////9/f32yBYAAAD5+fn19fUgICCTk5Ozs7MsLCwPDw8vLy/v7++JiYlaWlp4eHgICAjj4+PT09M0NDTLy8vZ2dm3t7e/v78SEAmEbROtra1AQEDd3d06Ojrr6+twcHCRkZEXFxejo6PswRakhhBiYmNNQgerjBAkIAttWQtjURF6ZA8oIQfcsxMlJSW7mhMxKAbSrBaPdBJdTRDIpBQYFAQmIRRKPwovKAq1lhSbgA9BNgnlvBb1zzPh05ckIRjs0m3255v01Emrky1QUFD45JT56qr69NT37r733377+OenlD/222efEVK+AAACVUlEQVQ4jb2TaXuaQBDH2RkBRTlFOayi4gGCRITUqqRprbVJ2u//ebriEa2keZf/m9155vfMucswHyeZ6zNq532ORawaqGjvk1ul20XsF/pUXu6rJ6MvMx3FKRVxvCDJW0E61iXyTFkqjGf0NEJIx+kd6ho2GalcCLb7JBfP1fZmXa1xhYlrCnsAieRQk+UYXi4M2OCOHGkILMM0JVL5VMQRQ9BPIasGLdFubguo8lboVSNBauRgy2Y6PaPNs/9yaivi1X3HotDNI4pDbjZK1l7LJpfcJ04uHZNqkUMIq6zHLsDD1x9pUm9c5K2L5KxOVSb2DGCzge8OfoPxo34GyxVyIZXrby3YqNXfO118AUgfzy/IkS9BogvmFJ41FJ+osQFYnfc47F6BpO0D/CFa6emFkAfIsvA0TnF4xXXDfSP08rT5tQMYDyzxtBJBveCaZgpUPwnZ7U9YLdPWKbdc75w5W7GoN1vC8+4hB/2pG53n40TNA1YSTVxQr7uAo/a3x9dR2lxFLuuGGJnxTMmoPxgfwWAAwF0te9iqVCUFpxbO94FGc9oSTH1qxO2bt1FCnGfmvZs3kSTJaLJvbOXcgDUTQwhwAlcaNW8jeiMcuDMMLrms6ENEdxi60xAn7ivoi7ccMxwHmEC2Rm9w4tLo5vlSGQt3jXTVcxM9f3WXxnEcGgUc/bLLbIbrGLIgxIP4Qo7RvKk7QRwNMsjuxitLKSowV9lLIU1MRG/hW9Zn+y2OYfSKH4O7DBb3iJL6NkeHybe9dbL4UpEb/8NysZqu1d6lPkx/AQG3OOF/txrXAAAAAElFTkSuQmCC';
        this.StraightTrackSprite = new DataUrlSprite(cellSize, cellSize, uri);
        // new StraightTrackSprite(cellSize, trackWidth, false);
        this.StraightTerminatorTrackSprite = new StraightTrackSprite(cellSize, trackWidth, true);
        this.CurvedTrackSprite = new CurvedTrackSprite(cellSize, true, trackWidth);
        this.CurvedTrackNoPlanksSprite = new CurvedTrackSprite(cellSize, false, trackWidth);
        this.CrossTrackSprite = new CrossTrackSprite(cellSize, trackWidth);
    }
}
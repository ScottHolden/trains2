import StraightTrackSprite from "./StraightTrackSprite";

export default class CrossTrackSprite extends StraightTrackSprite {
    constructor(cellSize: number, trackWidth: number) {
        super(cellSize, trackWidth, false);
        this.DrawRotatedStraightTrack(cellSize, trackWidth);
    }
}
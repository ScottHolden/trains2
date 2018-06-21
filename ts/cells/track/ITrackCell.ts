import ICell from "../ICell";

export interface ITrackCell extends ICell {
    readonly ConnectedUp: boolean;
    readonly ConnectedDown: boolean;
    readonly ConnectedLeft: boolean;
    readonly ConnectedRight: boolean;
}
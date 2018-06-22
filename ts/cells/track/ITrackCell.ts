import ICell from "../ICell";
import PathPart from "./PathPart";

export interface ITrackCell extends ICell {
    readonly ConnectedUp: boolean;
    readonly ConnectedDown: boolean;
    readonly ConnectedLeft: boolean;
    readonly ConnectedRight: boolean;
    readonly PathPart: PathPart;
}
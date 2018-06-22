import Point from "./Point";

export default class LinkedPoint extends Point {
    private readonly links: LinkedPoint[] = [];
    public AddLink(newPoint: LinkedPoint) {
        this.links.push(newPoint);
        newPoint.links.push(this);
    }
}
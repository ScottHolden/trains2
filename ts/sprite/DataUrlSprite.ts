import Sprite from "./Sprite";

export default class DataUrlSprite extends Sprite {
    constructor(width: number, height: number, src: string) {
        super(width, height);
        const image = new Image();
        image.onload = () => this.context.drawImage(image, 0, 0);
        image.src = src;
    }
}
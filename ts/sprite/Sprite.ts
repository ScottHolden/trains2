module trains.play {
    export class Sprite {
        private readonly canvas: HTMLCanvasElement;
        public readonly context: CanvasRenderingContext2D;
        private restored: boolean = false;
        private width: number;
        private height: number;
        constructor(width: number, height: number) {
            this.canvas = document.createElement("canvas");
            this.width = width;
            this.height = height;
            this.canvas.width = width + 1;
            this.canvas.height = height + 1;

            var context = this.canvas.getContext("2d");

            if(context === null)
            {
                throw "Unable to get 2d context from canvas"
            }

            this.context = context;

            // Blurry drawing fix
            this.context.save();
            this.context.translate(0.5, 0.5);
        }
        public Draw(context: CanvasRenderingContext2D, x: number, y: number) {
            if (!this.restored) {
                this.context.restore();
                this.restored = true;
            }
            context.drawImage(this.canvas, 0, 0, this.width, this.height, x - 0.5, y - 0.5, this.width, this.height);
        }
    }
}
export default class GraphicsContext {
    public readonly Context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    constructor(private readonly width: number, private readonly height: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width + 1;
        this.canvas.height = this.height + 1;
        const context = this.canvas.getContext("2d");

        if (context === null) {
            throw new Error("Unable to get 2d context from canvas");
        }

        this.Context = context;

        // Blurry drawing fix
        this.Context.translate(0.5, 0.5);
    }
    public DrawTo(context: GraphicsContext) {
        context.Context.drawImage(this.canvas, 0, 0, this.width, this.height, -0.5, -0.5, this.width, this.height);
    }
}
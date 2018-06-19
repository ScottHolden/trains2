/// <reference path="play.board.ts" />
/// <reference path="play.train.ts" />
/// <reference path="engine/loop.ts" />

module trains.play {
    export class RenderLoop extends Loop {
        constructor(private board: trains.play.Board) {
            super(30);
        }

        //DO NOT CHANGE FROM 240!!!!!!!!
        private msPerDayCycle = 240;
        private dayCycleSpeedModifier = 0.6;
        private dayToNightRatio = 5 / 12; //5 of 12 are night

        loopBody(): void {
            if (this.board.showDiagnostics) {
                trains.play.GameBoard.redraw();
            }
            this.board.trainContext.clearRect(0, 0, this.board.trainCanvas.width, this.board.trainCanvas.height);
            this.board.lightingBufferContext.clearRect(0, 0, this.board.trainCanvas.width, this.board.trainCanvas.height);

            //Nighttime Daytime
            var diff = ((this.board.gameLoop.gameTimeElapsed / (1000 * this.dayCycleSpeedModifier)) + (this.msPerDayCycle / 2)) % this.msPerDayCycle;
            if (this.board.cheat_alwaysNight) {
                diff = 0;
            }
            var r = (diff >= (this.msPerDayCycle / 2)) ? ((this.msPerDayCycle / 2) - diff) : 0;
            var g = (diff >= (this.msPerDayCycle / 2)) ? ((r / 135) * 100) : 0; //135 is magic!
            var b = (diff < (this.msPerDayCycle / 2)) ? diff : 0;
            var alpha = 0;
            if (diff < ((this.dayToNightRatio * this.msPerDayCycle) / 2)) {
                alpha = ((((this.dayToNightRatio * this.msPerDayCycle) / 2) - diff) / 100);
            } else if ((diff > (this.msPerDayCycle - ((this.dayToNightRatio * this.msPerDayCycle) / 2)))) {
                alpha = ((diff - (this.msPerDayCycle - ((this.dayToNightRatio * this.msPerDayCycle) / 2))) / 100);
            }
            this.board.lightingBufferContext.fillStyle = this.rgbToHex(r, g, b);
            this.board.lightingBufferContext.fillRect(0, 0, this.board.trainCanvas.width, this.board.trainCanvas.height);

            if (this.board.trains.length > 0) {
                this.board.trains.forEach(t => {
                    t.draw(this.board.trainContext);
                    if (((diff + (t.id / 2)) < 30) || ((diff - (t.id / 2)) > 210)) {
                        t.drawLighting(this.board.lightingBufferContext);
                    }
                    if (this.board.selectedTrain === t) {
                        t.draw(this.board.trainLogoContext, false);
                    }
                });
            }
            if (this.board.smokeParticleSystem.length > 0) {
                this.board.smokeParticleSystem.forEach(x=> x.Draw(this.board.trainContext));
            }

            this.board.trainContext.save();
            this.board.trainContext.globalAlpha = alpha;
            this.board.trainContext.drawImage(this.board.lightingBufferCanvas, 0, 0);
            this.board.trainContext.restore();
            if (this.board.showDiagnostics === true) {
                this.drawDiagnostics(this.board.trainContext);
            }
        }

        private rgbToHex(r: number, g: number, b: number): string {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        private drawDiagnostics(targetContext: CanvasRenderingContext2D): void {
            targetContext.font = "10px Verdana";
            targetContext.fillText("To render: " + this.GetPerformanceString(), 10, 10);
            targetContext.fillText("To logic: " + this.board.gameLoop.GetPerformanceString(), 10, 24);
            if (this.board.trains.length > 0) {
                targetContext.fillText("Train Count: " + (this.board.trains.length), 10, 38);
            }
        }
    }
}
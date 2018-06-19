/// <reference path="../play.board.ts" />

module trains.play {
    export class Loop {
        //To be extended:
        private targetLoopsPerSecond = 1;
        private minimumTimeout = 10;
        //Other:
        //TODO: create getters!
        private loopRunning = false;
        private lastDuration = 0;
        private lastStartTime = 0;
        private loopStartTime: number = 0;
        private lastLoopEndTime: number = 0;
        private averageLoopsPerSecond = 1;
        private averageLoopsPerSecondSampleSize = 5;
        private timeoutId: number = -1;
        //TODO: implement strictTiming

        constructor(targetLoopsPerSecond: number)
        {
            this.targetLoopsPerSecond = targetLoopsPerSecond;
        }

        public startLoop(): void {
            if (this.timeoutId < 0) {
                this.loopCallback();
            }
            this.loopRunning = true;
        }

        public stopLoop(): void {
            this.loopRunning = false;
        }

        public dispose(): void {
            if (this.timeoutId === undefined) {
                try {
                    clearTimeout(this.timeoutId);
                } finally {
                    this.timeoutId = -1;
                }
            }
        }

        public ElapsedSinceLastStart() {
            return this.loopStartTime - this.lastStartTime;
        }
        public ElapsedSinceLastEnd() {
            return this.loopStartTime - this.lastLoopEndTime
        }

        public GetPerformanceString() {
            return this.lastDuration.toFixed(2) + "ms (" + this.averageLoopsPerSecond.toFixed(2) + "/s)";
        }

        private loopCallback(): void {
            this.timeoutId = -1;
            if (this.lastLoopEndTime > 0) {
                this.loopStartTime = new Date().getTime();
                if (this.lastStartTime === 0) {
                    this.lastStartTime = this.loopStartTime;
                }
                if (this.loopRunning) {
                    this.loopBody();
                }
                this.lastDuration = new Date().getTime() - this.loopStartTime;
                if (this.lastStartTime > 0) {
                    this.averageLoopsPerSecond = ((this.averageLoopsPerSecond * (this.averageLoopsPerSecondSampleSize - 1)) + (this.loopStartTime - this.lastStartTime)) / this.averageLoopsPerSecondSampleSize;
                }
                this.lastStartTime = this.loopStartTime;
            }
            this.lastLoopEndTime = new Date().getTime();
            
            this.timeoutId = setTimeout(() => this.loopCallback(), Math.max((1000 / this.targetLoopsPerSecond) - this.lastDuration, this.minimumTimeout));
        }

        loopBody(): void {
            throw new Error("abstract");
        }
    }
}
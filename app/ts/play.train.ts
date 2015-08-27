/// <reference path="play.board.ts" />
/// <reference path="play.cell.ts" />
/// <reference path="play.board.renderer.ts" />
/// <reference path="play.train.renderer.ts" />
/// <reference path="util.ts" />

module trains.play {

        export class Train {

                private defaultSpeed = 2;

                public coords: trains.play.TrainCoords;

                private trainColourIndex: number;
                
                public name: string;

                private trainSpeed: number = this.defaultSpeed;
                
                private paperRockLizardScissorsSpock: number;

                constructor(public id: number, private board: trains.play.Board, currentCell: Cell) {
                        if (currentCell !== undefined) {
                                this.coords = {
                                        currentX: currentCell.x + (trains.play.gridSize / 2),
                                        currentY: currentCell.y + (trains.play.gridSize / 2),
                                        previousX: currentCell.x,
                                        previousY: currentCell.y - 1 //Cos we never want to be the centre of attention
                                };

                                if (Math.floor(Math.random() * 10) === 0) {
                                        this.trainColourIndex = -1;
                                } else {
                                        this.trainColourIndex = trains.play.TrainRenderer.GetRandomShaftColour();
                                }
                                
                                this.paperRockLizardScissorsSpock = Math.floor(Math.random() * 5) + 1;
                                
                                this.name = trains.util.getRandomName();
                        }                                
                }

                public chooChooMotherFucker(speed: number): void {
                        if (this.trainSpeed === 0) return;

                        var column = this.board.getGridCoord(this.coords.currentX);
                        var row = this.board.getGridCoord(this.coords.currentY);

                        var cell = this.board.getCell(column, row);
                        if (cell !== undefined) {
                                this.coords = this.getNewCoordsForTrain(cell, this.coords, this.trainSpeed * speed);
                        }
                        this.wreckYourself();
                }

                public slowYourRoll(): void {
                        this.trainSpeed--;
                        if (this.trainSpeed < 1) {
                                this.trainSpeed = 1;
                        }
                }

                public fasterFasterFaster(): void {
                        this.trainSpeed++;
                        if (this.trainSpeed > (play.gridSize / 2)) {
                                this.trainSpeed = (play.gridSize / 2);
                        }
                }

                public hammerTime(): void {
                        this.trainSpeed = 0;
                }

                public wakeMeUp(): void {
                        this.trainSpeed = this.defaultSpeed;
                }

                magicBullshitCompareTo(pen: number, sword: number): number {
                        if (pen === sword) return 0;
                        if (pen > sword) return -1;
                        return 1;
                }

                getNewCoordsForTrain(cell: Cell, coords: trains.play.TrainCoords, speed: number): trains.play.TrainCoords {

                        if (cell.direction === trains.play.Direction.Vertical) {
                                return {
                                        currentX: cell.x + (trains.play.gridSize / 2),
                                        currentY: coords.currentY + (speed * this.magicBullshitCompareTo(coords.previousY, coords.currentY)),
                                        previousX: coords.currentX,
                                        previousY: coords.currentY
                                };
                        }
                        else if (cell.direction === trains.play.Direction.Horizontal) {
                                return {
                                        currentX: coords.currentX + (speed * this.magicBullshitCompareTo(coords.previousX, coords.currentX)),
                                        currentY: cell.y + (trains.play.gridSize / 2),
                                        previousX: coords.currentX,
                                        previousY: coords.currentY
                                };
                        }
                        else if (cell.direction === trains.play.Direction.Cross) {
                                var x = (speed * this.magicBullshitCompareTo(coords.previousX, coords.currentX));
                                var y = (speed * this.magicBullshitCompareTo(coords.previousY, coords.currentY));
                                return {
                                        currentX: (x === 0) ? cell.x + (trains.play.gridSize / 2) : coords.currentX + x,
                                        currentY: (y === 0) ? cell.y + (trains.play.gridSize / 2) : coords.currentY + y,
                                        previousX: coords.currentX,
                                        previousY: coords.currentY
                                };
                        }

                        var yOffset = (cell.direction === trains.play.Direction.LeftDown || cell.direction === trains.play.Direction.RightDown) ? yOffset = trains.play.gridSize : 0;
                        var xOffset = (cell.direction === trains.play.Direction.RightUp || cell.direction === trains.play.Direction.RightDown) ? xOffset = trains.play.gridSize : 0;
                        var xOffsetFromGrid = (coords.currentX - cell.x) - xOffset;
                        if (xOffsetFromGrid === 0) xOffsetFromGrid += 0.001;
                        var yOffsetFromGrid = (coords.currentY - cell.y) - yOffset;
                        if (yOffsetFromGrid === 0) yOffsetFromGrid += 0.001;
                        var xOffsetFromGridLast = (coords.previousX - cell.x) - xOffset;
                        if (xOffsetFromGridLast === 0) xOffsetFromGridLast += 0.001;
                        var yOffsetFromGridLast = (coords.previousY - cell.y) - yOffset;
                        if (yOffsetFromGridLast === 0) yOffsetFromGridLast += 0.001;

                        var angle = Math.atan2(xOffsetFromGrid, yOffsetFromGrid);
                        var angleLast = Math.atan2(xOffsetFromGridLast, yOffsetFromGridLast);
                        var direction = this.magicBullshitCompareTo(angleLast, angle) * ((Math.abs(angleLast - angle) > Math.PI) ? -1 : 1);
                        var angleSpeed = speed / (trains.play.gridSize / 2);
                        var newAngle = (Math.PI / 2) - (angle + (angleSpeed * direction));

                        var xOffsetFromGridNew = ((trains.play.gridSize / 2) * Math.cos(newAngle)) + xOffset;
                        var yOffsetFromGridNew = ((trains.play.gridSize / 2) * Math.sin(newAngle)) + yOffset;

                        return {
                                currentX: cell.x + xOffsetFromGridNew,
                                currentY: cell.y + yOffsetFromGridNew,
                                previousX: coords.currentX,
                                previousY: coords.currentY
                        };
                }

                public draw(context: CanvasRenderingContext2D, translate: boolean = true): void {
                        var x = this.coords.currentX;
                        var y = this.coords.currentY;
                        var angle = Math.atan2(this.coords.previousX - x, this.coords.previousY - y);

                        context.save();

                        if (translate) {
                                context.translate(x, y);
                                context.rotate(angle * -1);
                        }
                        else{
                                context.translate(play.gridSize / 2, play.gridSize / 2);
                        }   
       

                        trains.play.TrainRenderer.DrawChoochoo(context, this.trainColourIndex);

                        context.restore();
                }

                public isTrainHere(column: number, row: number): boolean {
                        var myColumn = this.board.getGridCoord(this.coords.currentX);
                        var myRow = this.board.getGridCoord(this.coords.currentY);
                        return column === myColumn && row === myRow;
                }
                
                public wreckYourself(): boolean {
  
                        return this.board.trains.some(t =>t.clashOfTheTitans(t, this));
                }
                
                public whoIsTheWeakestLink(you: number, me: number): number {
                        if (you === me) return 0;
                        
                        var isEven = ((you + me) % 2) === 0;
                        var youHigher = you > me;
                        
                        if (youHigher === isEven) {
                                return 1;
                        }
                        else {
                                return 2;
                        }
                } 
                
                public getRPSLSClass(): string {
                        switch (this.paperRockLizardScissorsSpock)
                        {
                                case 1: {
                                        return "fa-hand-rock-o";
                                }
                                case 2: {
                                        return "fa-hand-paper-o";
                                }
                                case 3: {
                                        return "fa-hand-scissors-o";
                                }
                                case 4: {
                                        return "fa-hand-lizard-o";
                                }
                                case 5: {
                                        return "fa-hand-spock-o";
                                }
                        } 
                }  

                public clashOfTheTitans(train1: Train, train2: Train)
                {
                        var myColumn = this.board.getGridCoord(train1.coords.currentX);
                        var myRow = this.board.getGridCoord(train1.coords.currentY);

                        if (train1 !== train2 && train2.isTrainHere(myColumn, myRow)) 
                        {
                                if (train1.trainSpeed === train2.trainSpeed)
                                {
                                        var train1Seed = train1.paperRockLizardScissorsSpock;
                                        var train2Seed = train1.paperRockLizardScissorsSpock;
                                        
                                        switch (this.whoIsTheWeakestLink(train1Seed, train2Seed))
                                        {
                                                case 0:{
                                                        this.board.killItWithFire(train1, true);
                                                        this.board.killItWithFire(train2, true);
                                                        return true;
                                                } 
                                                case 1:{
                                                        this.board.killItWithFire(train2, true);
                                                        return true;
                                                }
                                                case 2:{
                                                        this.board.killItWithFire(train1, true);
                                                        return true;
                                                }
                                        }
                                } 
                                else if (train1.trainSpeed < train2.trainSpeed)
                                {
                                        this.board.killItWithFire(train1, false);
                                        return true;  
                                }
                                else
                                {
                                        this.board.killItWithFire(train2, false);
                                        return true;  
                                }  
                        }
                }
        }
}
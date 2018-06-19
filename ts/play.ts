/// <reference path="../types/jqueryui.d.ts" />
/// <reference path="play.board.ts" />
/// <reference path="util.ts" />
/// <reference path="event.ts" />
/// <reference path="logo.ts" />

module trains.play {

    export function InitialisePlay($container: JQuery): void {
        new trains.play.PlayManager($container);
    }

    export var GameBoard: Board;

    export class PlayManager {

        private playComponents: trains.play.PlayComponents;

        constructor($container: JQuery) {
            this.playComponents = GetPlayComponent($container);
            trains.play.GameBoard = new trains.play.Board(this.playComponents);

            var top = ($(window).height() - trains.play.GameBoard.canvasHeight) / 2;
            var left = ($(window).width() - trains.play.GameBoard.canvasWidth) / 2;

            $('body').height($(window).height());
            this.playComponents.$trackButtons.css("top", top);
            this.playComponents.$trainButtons.css("top", 15).css("right", 15);
            this.playComponents.$mute.width(left);
            this.playComponents.$autosave.width(left);

            this.playComponents.$trainButtons.draggable({
                handle: '.ui-handle',
                containment: 'body'
            });

            this.AttachEvents();

            GameBoard.loadCells();
        }

        private AttachEvents(): void {

            this.playComponents.$globalButtons.find('.ui-title').click(() => {
                this.playComponents.$globalButtons.toggleClass("minimised");
            });

            this.playComponents.$globalButtons.find('.ui-minimise').click(() => {
                this.playComponents.$globalButtons.addClass("minimised");
            });

            this.playComponents.$globalButtons.find('button').click((event) => {
                if(event.currentTarget !== null) {
                    trains.play.GameBoard.globalControlClick(event.currentTarget);
                }
            });

            this.playComponents.$trainButtons.find('.ui-close').click(() => {
                trains.play.GameBoard.hideTrainControls();
            });

            this.playComponents.$trainButtons.find('button').click((event) => {
                if(event.currentTarget !== null) {
                    trains.play.GameBoard.trainControlClick(event.currentTarget);
                }
            });

            this.playComponents.$trackButtons.find('button').click((event) => {
                if(event.currentTarget !== null) {
                    trains.play.GameBoard.trackControlClick(event.currentTarget);
                    trains.util.selectButton($(event.currentTarget));
                }
            });

            this.playComponents.$mute.click(() => {
                var $mute = this.playComponents.$mute;
                var mute = trains.util.toBoolean($mute.val());
                if (!mute) {
                    $mute.val("true");
                } else {
                    $mute.val("false");
                }
                trains.play.GameBoard.setMuted(!mute);
            });

            this.playComponents.$autosave.click(() => {
                var $autosave = this.playComponents.$autosave;
                var autosave = trains.util.toBoolean($autosave.val());
                if (!autosave) {
                    $autosave.val("true");
                } else {
                    $autosave.val("false");
                }
                trains.play.GameBoard.setAutoSave(!autosave);
                if (!autosave) {
                    trains.play.GameBoard.saveCells();
                }
            });

            trains.event.On("speedchanged", (_, trainID: number, speed: number) => {
                var setTrainSpeed = false;
                if (trains.play.GameBoard.selectedTrain !== undefined) {
                    if (trainID === trains.play.GameBoard.selectedTrain.id) {
                        setTrainSpeed = true;
                    }
                } else {
                    setTrainSpeed = true;
                }

                if (setTrainSpeed) {
                    this.DisplayTrainSpeed(speed);
                }
            });

            trains.event.On("showtraincontrols", (_, train: trains.play.Train) => {
                this.playComponents.$trainName.text(train.name);
                this.playComponents.$trainButtons.addClass("flipInX").show();
                this.playComponents.$trainButtons.one(trains.play.animationEndEventString, () => {
                    this.playComponents.$trainButtons.removeClass("flipInX");
                });
                this.DisplayTrainSpeed(train.getTrainSpeed());
            });

            trains.event.On("hidetraincontrols", (_) => {
                this.playComponents.$trainButtons.addClass("flipOutX");
                this.playComponents.$trainButtons.one(trains.play.animationEndEventString, () => {
                    this.playComponents.$trainButtons.removeClass("flipOutX").hide();
                });
            });
        }

        DisplayTrainSpeed(speed: number) {
            this.playComponents.$trainButtons.find('.ui-speed').text((speed * 10).toString() + " kms/h");
        }
    }

    export function GetPlayComponent($container: JQuery): trains.play.PlayComponents {

        var $trainCanvas = $container.find('.ui-train-canvas');
        var $trackCanvas = $container.find('.ui-track-canvas');
        var $gridCanvas = $container.find('.ui-grid-canvas');
        var $trainLogoCanvas = $container.find('.ui-train-logo-canvas');

        return {
            $trainCanvas: $trainCanvas,
            $trackCanvas: $trackCanvas,
            $gridCanvas: $gridCanvas,
            $trainLogoCanvas: $trainLogoCanvas,
            $canvases: $().add($trainCanvas).add($trackCanvas).add($gridCanvas),
            $trackButtons: $container.find('.ui-track-buttons'),
            $trainButtons: $container.find('.ui-train-buttons'),
            $globalButtons: $container.find('.ui-game-buttons'),
            $trainName: $container.find('.ui-train-name'),
            $mute: $container.find('.ui-mute'),
            $autosave: $container.find('.ui-autosave')
        };
    }

    export interface PlayComponents {
        $trainCanvas: JQuery;
        $trackCanvas: JQuery;
        $gridCanvas: JQuery;
        $canvases: JQuery;
        $trackButtons: JQuery;
        $trainButtons: JQuery;
        $globalButtons: JQuery;
        $trainLogoCanvas: JQuery;
        $trainName: JQuery;
        $mute: JQuery;
        $autosave: JQuery;
    }
}
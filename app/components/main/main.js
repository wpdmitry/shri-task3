import {BaseComponent} from "../../framework/BaseComponent";
import {DateComponent} from "../date/date";
import {CHANGE_DATE, SCROLL_X} from "../../events";
import {TimeScale} from "../time-scale/time-scale";
import {Rooms} from "../rooms/rooms";
import {Diagram} from "../diagram/diagram";

export class Main extends BaseComponent {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
        return `
            <div class="main">
                <div class="main__date"></div>
                <div class="main__wrapper1 js-scrolling-x">
                    <div class="main__time-scale"></div>
                    <div class="main__wrapper2">
                        <div class="main__rooms"></div>
                        <div class="main__diagram"></div>
                    </div>
                </div>
            </div>
        `
    }

    onRender() {
        this.showDate();
        this.showTimeScale();

        this.model.getRooms(dataRooms => {
            this.showRooms(dataRooms);
            this.showDiagram(dataRooms)
        });

        this.domElement.on(CHANGE_DATE, () => this.deepUpgrade());
    }

    upgrade() {
        this.setTimeScale();
    }

    createDate() {
        this.date = new DateComponent(this.model);
        this.date.renderTo(this.dateElement);
        this.addToListUpgrade(this.date);
    }

    createTimeScale() {
        this.timeScale = new TimeScale({
            model: this.model,
            start: 8,
            end: 23,
        });

        this.timeScale.renderTo(this.timeScaleElement);
        this.addToListUpgrade(this.timeScale);
    }

    createRooms() {
        this.rooms = new Rooms();
        this.rooms.renderTo(this.roomsElement);
        this.addToListUpgrade(this.rooms);
    }

    createDiagram() {
        this.diagram = new Diagram(this.model);
        this.diagram.renderTo(this.diagramElement);
        this.addToListUpgrade(this.diagram);
    }

    showDate() {
        if (!this.date) this.createDate();
    }

    showTimeScale() {
        if (!this.timeScale) this.createTimeScale();
    }

    setTimeScale() {
        this.timeScale.upgrade();
    }

    showRooms(dataRooms) {
        if (!this.rooms) this.createRooms();

        this.rooms.setRooms(dataRooms);
    }

    showDiagram(dataRooms) {
        if (!this.diagram) this.createDiagram();

        this.diagram.setCoordTimeScale({
            coord: this.timeScale.getCoordLabel(),
            scaleOfOneMinute: this.timeScale.getScaleOfOneMinute(),
        });

        this.diagram.setRooms(dataRooms);
    }

    get dateElement() {
        return this.getElement('.main__date');
    }

    get timeScaleElement() {
        return this.getElement('.main__time-scale');
    }

    get roomsElement() {
        return this.getElement('.main__rooms');
    }

    get diagramElement() {
        return this.getElement('.main__diagram');
    }

    get wrapper1Element() {
        return this.getElement('.main__wrapper1');
    }
}
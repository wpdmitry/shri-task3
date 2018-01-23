import {DateComponent} from "../date/date";
import {Base} from "../base/base";
import {TimeScale} from "../time-scale/time-scale";
import {Rooms} from "../rooms/rooms";
import {Diagram} from "../diagram/diagram";
import {CHANGE_DATE} from "../../events";

export class Main extends Base {

    constructor(model) {
        super();
        this.model = model;
    }

    render() {
        return `
            <div class="main">
                <div class="main__date"></div>
                <div class="main__wrapper1 js-scrolling">
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
        this.drawDate();
        const timeScale = this.drawTimeScale();
        this.drawRooms();
        setTimeout(() => this.drawDiagram(timeScale.coordLabel, timeScale.scaleOfOneMinute), 0);

        this.domElement.on(CHANGE_DATE, () => this.update());
    }

    drawDate() {
        const date = new DateComponent(this.model);
        date.renderTo(this.dateElement);
    }

    drawTimeScale() {
        const timeScale = new TimeScale(this.model);
        timeScale.renderTo(this.timeScaleElement);

        return timeScale;
    }

    drawRooms() {
        this.model.getRooms(dataRooms => {
            const rooms = new Rooms(dataRooms);
            rooms.renderTo(this.roomsElement);
        });
    }

    drawDiagram(...timeScale) {
        this.model.getRooms(dataRooms => {
            const diagram = new Diagram(dataRooms, this.model, timeScale);
            diagram.renderTo(this.diagramElement);
        });
    }

    get dateElement() {
        return this.getElements('main__date');
    }

    get timeScaleElement() {
        return this.getElements('main__time-scale');
    }

    get roomsElement() {
        return this.getElements('main__rooms');
    }

    get diagramElement() {
        return this.getElements('main__diagram');
    }
}
import {Input} from "../input/input";
import {BaseComponent} from "../../framework/BaseComponent";
import {helpers} from "../../helpers/helpers";
import {SELECT_DATE, SELECT_TIME_END, SELECT_TIME_START} from "../../events";

export class DateSelection extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `
                <div class="date-selection">
                    <div class="date-selection__date"></div>
                    <div class="date-selection__time">
                        <div class="date-selection__time-start"></div>
                        <div class="date-selection__delimiter">—</div>
                        <div class="date-selection__time-end"></div>
                    </div>
                </div>
        `
    }

    onRender() {
        this.createInputDate();
        this.createInputTime();
    }

    upgrade() {}

    createInputDate() {
        const title = helpers.deviceCheck() === 'touch' ?
            'Дата и время'
            :
            'Дата';

        this.inputDate = new Input({
            title,
            placeholder: '14 декабря, 2017',
            mod: 'date',
            eventsName: [SELECT_DATE],
            addClass: ['js-date']
        });

        this.inputDate.renderTo(this.dateElement);
        this.addToListUpgrade(this.inputDate);
    }

    createInputTime() {
        const title = helpers.deviceCheck() === 'touch' ?
            ['', '']
            :
            ['Начало', 'Конец'];

        this.inputTimeStart = new Input({
            title: title[0],
            placeholder: '12:00',
            maxLength: 5,
            mod: 'time',
            eventsName: [SELECT_TIME_START],
            addClass: ['js-time-start']
        });

        this.inputTimeEnd = new Input({
            title: title[1],
            placeholder: '13:00',
            maxLength: 5,
            mod: 'time',
            eventsName: [SELECT_TIME_END],
            addClass: ['js-time-end']
        });

        this.inputTimeStart.renderTo(this.timeStartElement);
        this.inputTimeEnd.renderTo(this.timeEndElement);
    }

    setValue(date, timeStart, timeEnd) {
        this.inputDate.setValue(date);
        this.inputTimeStart.setValue(timeStart);
        this.inputTimeEnd.setValue(timeEnd);
    }

    get dateElement() {
        return this.getElement('.date-selection__date');
    }

    get timeStartElement() {
        return this.getElement('.date-selection__time-start');
    }

    get timeEndElement() {
        return this.getElement('.date-selection__time-end');
    }
}
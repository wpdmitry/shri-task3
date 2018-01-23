import {Base} from "../base/base";
import {Input} from "../input/input";

export class DateSelection extends Base {

    constructor({model, date, timeStart, timeEnd}) {
        super();
        this.model = model;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    render() {
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
        let titleDate, titleTimeStart, titleTimeEnd;
        switch (this.deviceCheck()) {
            case 'desktop': {
                titleDate = 'Дата';
                titleTimeStart = 'Начало';
                titleTimeEnd = 'Конец';
                break;
            }

            case 'touch': {
                titleDate = 'Дата и время';
                titleTimeStart = '';
                titleTimeEnd = '';
                break;
            }
        }

        const inputDate = new Input({
            model: this.model,
            title: titleDate,
            placeholder: '14 декабря, 2017',
            calendar: true,
            value: `${this.date}`,
            bindCreate: 'inputDate',
        }),

            inputTimeStart = new Input({
                model: this.model,
                title: titleTimeStart,
                placeholder: '12:00',
                time: true,
                value: this.timeStart,
                bindCreate: 'inputTimeStart',
            }),

            inputTimeEnd = new Input({
                model: this.model,
                title: titleTimeEnd,
                placeholder: '13:00',
                time: true,
                value: this.timeEnd,
                bindCreate: 'inputTimeEnd',
            });

        inputDate.renderTo(this.dateElement);
        inputTimeStart.renderTo(this.timeStartElement);
        inputTimeEnd.renderTo(this.timeEndElement);

    }

    get dateElement() {
        return this.getElements('date-selection__date');
    }

    get timeStartElement() {
        return this.getElements('date-selection__time-start');
    }

    get timeEndElement() {
        return this.getElements('date-selection__time-end');
    }
}
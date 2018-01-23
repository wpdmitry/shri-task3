import {Base} from "../base/base";
import {Calendar} from "../calendar/calendar";
import {CHANGE_DATE} from "../../events";

export class DateComponent  extends Base {

    constructor(model) {
        super();
        this.model = model;
    }

    render() {
        return `
            <div class="date">
                <div class="date__button" data-btn="-1">
                    <img src="image/svg/arrow2.svg" alt="" class="date__arrow">
                </div>
                <div class="date__text"></div>
                <div class="date__button" data-btn="+1">
                    <img src="image/svg/arrow.svg" alt="" class="date__arrow">
                </div>
                <div class="date__calendar"></div>
            </div>
        `
    }

    onRender() {
        this.drawDate();
        this.drawCalendar();

        this.textElement.on('click', () => this.handleCalendar());

        this.buttonElement.forEach(btn => {
            btn.addEventListener('click', e => this.changeDate(e));
        })
    }

    drawDate() {
        this.textElement.innerHTML = this.model.getDateToLocalString();
    }

    drawCalendar() {
        this.calendar = new Calendar(this.model, true, 3).create();
        this.calendarElement.innerHTML = '';
        this.calendarElement.appendChild(this.calendar);
    }

    handleCalendar() {
        this.calendarElement.toggle();
        this.textElement.classList.toggle('date__text_active');
    }

    changeDate(e) {
        const btn = e.currentTarget;
        const where = +btn.dataset.btn;
        let currentDate = this.model.getCurrentDate();
        this.model.setDate(new Date(currentDate.setDate(currentDate.getDate() + where)));
        this.triggerEvent(CHANGE_DATE);
    }

    get calendarElement() {
        return this.getElements('date__calendar');
    }

    get textElement() {
        return this.getElements('date__text');
    }

    get buttonElement() {
        return this.getElements('date__button');
    }
}
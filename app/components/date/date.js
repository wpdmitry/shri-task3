import {Calendar} from "../calendar/calendar";
import {BaseComponent} from "../../framework/BaseComponent";
import {CHANGE_DATE} from "../../events";

export class DateComponent  extends BaseComponent {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
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
        this.upgrade();

        this.textElement.on('click', () => this.handleCalendar());
        this.buttonElement.on('click', e => this.changeDate(e));
    }

    upgrade() {
        this.showDate();
        this.drawCalendar();
    }

    showDate() {
        this.textElement.innerHTML = this.model.getDateUTCToString();
    }

    drawCalendar() {
        this.calendar = new Calendar(this.model, 3).create();
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
        let currentDate = this.model.getAppDateUTC();
        this.model.setAppDateUTC(currentDate.setUTCDate(currentDate.getUTCDate() + where));
        this.triggerEvent(CHANGE_DATE);
    }

    get calendarElement() {
        return this.getElement('.date__calendar');
    }

    get textElement() {
        return this.getElement('.date__text');
    }

    get buttonElement() {
        return this.getElement('.date__button');
    }
}
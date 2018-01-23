import {Base} from "../base/base";
import {AutoBind} from "../autobind/autobind";
import {Calendar} from "../calendar/calendar";
import {CHOOSE_DATE_ON_INPUT} from "../../events";

export class Input extends Base {

    constructor({model, title, placeholder, calendar = false, arrow = false, time = false,
                    value = '', bindDropDown = '', bindCreate = ''}) {
        super();
        this.model = model;
        this.title = title;
        this.placeholder = placeholder;
        this.calendar = calendar;
        this.arrow = arrow;
        this.value = value;
        this.bindDropDown = bindDropDown;
        this.bindCreate = bindCreate;
        this.time = time;
    }

    render() {
        const calendarHtml = `<div class="input__calendar">
                                <img class="input__img" src="image/svg/calendar.svg" alt="">
                              </div>
                             `;

        const arrowHtml = `<div class="input__arrow" data-bind="${this.bindDropDown ? `style:${this.bindDropDown}` : ''}">
                                <img class="input__img input__img_scale" src="image/svg/arrow.svg" alt="">
                              </div>
                             `;

        const resetHtml = `<div class="input__reset">
                                <img class="input__img input__img_scale" src="image/svg/close.svg" alt="">
                              </div>
                             `;


        return `
            <div class="input">
                <label for="title" class="input__label">${this.title}</label>
                <div class="input__wrapper">
                    <input 
                        type="text" 
                        class="input__text" 
                        id="title" 
                        value="${this.value}"  
                        ${this.time ? 'maxlength="5"' : ''} 
                        placeholder="${this.placeholder}"
                        data-bind="${this.bindDropDown ? `value:${this.bindDropDown},`:''}${this.bindCreate ? `value:${this.bindCreate}`: ''}">
                        
                        ${this.calendar ?  
                            calendarHtml 
                            :
                            this.time ? '' : resetHtml
                        }
                        ${this.arrow ? arrowHtml : ''}
                </div>
            </div> 
        `
    }

    onRender() {
        this.inputElement.on('focus', (e) => this.handleDropDownList(e));
        // this.inputElement.on('input', () => this.handleInput());
        // this.resetElement.on('click', () => this.handleReset())

        this.time ? this.inputElement.on('input', (e) => this.verificationTime(e)) : null;
        this.calendar ? this.inputElement.on('input', () => this.verificationDate()) : null;

        this.calendar ? this.drawCalendar(): null;
        this.calendar ? this.domElement.on(CHOOSE_DATE_ON_INPUT, e => this.chooseDate(e)) : null;
   }

    handleReset() {
        this.inputElement.value = '';
    }

    handleInput() {
        if (this.inputElement.value) {
            this.arrowElement.style.display = 'none';
            this.resetElement.style.display = 'block';
        } else {
            this.resetElement.style.display = 'none';
            this.arrowElement.style.display = 'block';
        }
    }

    chooseDate(e) {
        const {year, month, day} = e.detail;
        this.inputElement.value = `${day} ${month}, ${year}`;

        const event = new Event('change');
        this.inputElement.dispatchEvent(event);
    }

    drawCalendar() {
        let inputCalendar = this.calendarElement;
        let inputWrapper = inputCalendar.parentElement;
        let calendar = new Calendar(this.model, true, 1).create();

        let inputDropCalendar = this.createElement(
            'div',
            ['input__drop-calendar'],
        );

        inputDropCalendar.style.width = inputWrapper.offsetWidth + 'px';
        inputDropCalendar.style.height = inputWrapper.offsetWidth + 'px';

        inputDropCalendar.appendChild(calendar);
        inputWrapper.appendChild(inputDropCalendar);

        inputCalendar.addEventListener('click', function () {

            if (inputCalendar.classList.contains('input__calendar_openly')) {
                inputDropCalendar.classList.remove('input__drop-calendar_active');
                inputCalendar.classList.remove('input__calendar_openly');
            } else {
                inputDropCalendar.classList.add('input__drop-calendar_active');
                inputCalendar.classList.add('input__calendar_openly');
            }

        });

        document.addEventListener('click', (e) => {
            if (!(inputCalendar.contains(e.target) || inputDropCalendar.contains(e.target))) {
                inputDropCalendar.classList.remove('input__drop-calendar_active');
                inputCalendar.classList.remove('input__calendar_openly');
            }
        })
        ;
    }


    handleDropDownList(e) {
        const autobind = new AutoBind();
        autobind.setVariable(this.bindDropDown, 'display:block', e.target);
    }

    verificationTime(e) {
        let value = this.inputElement.value;
        let lastChar = value.slice(-1);

        if (Number.isInteger(+lastChar)) {
            if (value.length === 2) {
                this.inputElement.value += ':';
            }
        } else {
            this.inputElement.value = value.slice(0, -1);
        }
    }

    verificationDate() {
    }

    get inputElement() {
        return this.getElements('input__text');
    }

    get arrowElement() {
        return this.getElements('input__arrow');
    }

    get resetElement() {
        return this.getElements('input__reset');
    }

    get calendarElement() {
        return this.getElements('input__calendar');
    }
}
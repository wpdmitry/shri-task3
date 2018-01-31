import {BaseComponent} from "../../framework/BaseComponent";
import {
    CLOSE_MEMBERS, GET_MEMBERS, OPEN_MEMBERS, SELECT_DATE, SELECT_TIME_END, SELECT_TIME_START, SELECT_TITLE, SEND_DATA,
    UNSELECTED
} from "../../events";
import {validation} from "../../helpers/validation";

export class Input extends BaseComponent {

    constructor({title, placeholder, maxLength = 100, mod, eventsName, addClass = []}) {
        super();
        this.title = title;
        this.placeholder = placeholder;
        this.maxLength = maxLength;
        this.mod = mod;
        this.eventsName = eventsName;
        this.arrow = false;
        this.addClass = addClass;
    }

    template() {
        return `
            <div class="input">
                <label for="title" class="input__label">${this.title}</label>
                <div class="input__wrapper"> 
                    <input 
                        type="text" 
                        class="input__input input__input_${this.mod} ${this.addClass.join(' ')}" 
                        placeholder="${this.placeholder}"
                        maxlength="${this.maxLength}"
                    >
                </div>
            </div> 
        `
    }

    onRender() {
        switch (this.mod) {
            case 'text': this.drawReset(); break;
            case 'date': this.drawCalendar(); break;
            case 'time': {
                this.inputElement.on('input', e => this.validationTime(e));
                break;
            }
        }

        this.handleDropDownMembers();
        this.inputElement.on('blur', () => this.handleSendData());
   }

   upgrade() {}


    handleDropDownMembers() {
       if (this.eventsName) {
           if (this.eventsName.indexOf(OPEN_MEMBERS) !== -1) {
               this.drawArrow();
               this.inputElement.on('focus', () => this.handleOpenMembers());
               this.arrowElement.on('click', () => this.handleCloseMembers())
           }
       }
   }

    handleSendData() {
        const value = this.inputElement.value;

       if (this.eventsName) {
           if (this.eventsName.indexOf(SELECT_TITLE) !== -1)
               this.triggerEvent(SELECT_TITLE, {value});

           if (this.eventsName.indexOf(SELECT_DATE) !== -1)
               this.triggerEvent(SELECT_DATE, {value});

           if (this.eventsName.indexOf(SELECT_TIME_START) !== -1)
                this.triggerEvent(SELECT_TIME_START, {value});

           if (this.eventsName.indexOf(SELECT_TIME_END) !== -1)
               this.triggerEvent(SELECT_TIME_END, {value});
       }
   }

   handleOpenMembers() {
        this.triggerEvent(OPEN_MEMBERS);
        this.resetElement.hide();
        this.showArrow();
        this.arrow = true;
   }

   handleCloseMembers() {
        this.triggerEvent(CLOSE_MEMBERS);
        this.hideArrow();
        this.arrow = false;

        if (this.inputElement.value.length > 0) {
            this.resetElement.show();
        }
   }

   setValue(value) {

        if (this.mod === 'text') {
            this.inputTextElement.value = value;
            if (value) {
                this.resetElement.show();
            } else {
                this.resetElement.hide();
            }
        } else if (this.mod === 'date') {
            this.inputDatetElement.value = value;
            this.triggerEvent(SELECT_DATE, {value});

        } else if (this.mod === 'time') {
            this.inputTimeElement.value = value;
        }
   }

   drawReset() {
        const resetElement = this.createElement('div', ['input__reset']);
        const imgElement = this.createElement(
            'img',
            ['input__img', 'input__img_scale'],
            {
                'src': 'image/svg/close.svg',
                'alt': 'reset'
            }
        );

        resetElement.appendChild(imgElement);
        this.wrapperElement.appendChild(resetElement);

        this.resetElement.on('click', () => this.handleReset());
        this.inputElement.on('input', (e) => this.showReset(e))
   }

   showReset(e) {
        if (e.target.value.length > 0) {
            this.resetElement.show();
            this.arrow ? this.hideArrow() : null;
        } else {
            this.resetElement.hide();
            this.arrow ? this.showArrow() : null;
        }
   }

    handleReset() {
        this.inputElement.value = '';
        this.resetElement.hide();
        this.arrow ? this.showArrow() : null;

        this.triggerInput();
    }

    drawCalendar() {
        const calendarElement = this.createElement('div', ['input__calendar']);
        const imgElement = this.createElement(
            'img',
            ['input__img'],
            {
                'src': 'image/svg/calendar.svg',
                'alt': 'calendar'
            }
        );

        calendarElement.appendChild(imgElement);
        this.wrapperElement.appendChild(calendarElement);
    }

    drawArrow() {
        const arrowElement = this.createElement('div', ['input__arrow']);
        const imgElement = this.createElement(
            'img',
            ['input__img', 'input__img_scale'],
            {
                'src': 'image/svg/arrow.svg',
                'alt': 'arrow'
            }
        );

        arrowElement.appendChild(imgElement);
        this.wrapperElement.appendChild(arrowElement);
    }

    showArrow() {
        this.arrowElement.show();
    }

    hideArrow() {
        this.arrowElement.hide();
    }


    validationTime(e) {
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

    triggerInput() {
        const event = new Event('blur');
        this.inputElement.dispatchEvent(event);
    }

    get inputElement() {
        return this.getElement('.input__input');
    }

    get inputTextElement() {
        return this.getElement('.input__input_text');
    }

    get inputDatetElement() {
        return this.getElement('.input__input_date');
    }

    get inputTimeElement() {
        return this.getElement('.input__input_time');
    }

    get arrowElement() {
        return this.getElement('.input__arrow');
    }

    get resetElement() {
        return this.getElement('.input__reset');
    }

    get calendarElement() {
        return this.getElement('.input__calendar');
    }

    get wrapperElement() {
        return this.getElement('.input__wrapper');
    }

}
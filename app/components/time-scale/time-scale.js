import {BaseComponent} from "../../framework/BaseComponent";
import {helpers} from "../../helpers/helpers";

export class TimeScale extends BaseComponent {
    constructor({model, start, end}) {
        super();
        this.model = model;
        this.start = start;
        this.end = end;
        this.timeLabel = [...this.generateTimeLabels(start, end)];
        this.scaleOfOneMinute = null;
    }

    template() {
        return `
            <div class="time-scale">
                <div class="time-scale__empty"></div>
                <div class="time-scale__labels"></div>
                <div class="time-scale__empty"></div>
            </div>
        `
    }

    onRender() {
        this.upgrade();
    }

    upgrade() {
        this.showLabels();
        this.showCurrentLabel();
    }

    showLabels() {
        const state = helpers.stateDate(this.model.getAppDateUTC());

        this.labelsElement.innerHTML = this.timeLabel.reduce(((previousValue, currentValue) => {
            let classInactive = '';

            if (state === 0) {
                classInactive = currentValue <= this.model.getCurrentDateUTC().getHours() ? 'time-scale__label_inactive' : '';
                setTimeout(() => this.showLabels(), 1000 * 60 * (60  - this.model.getCurrentDateUTC().getMinutes()));
            } else if (state === -1 || state === '<'){
                classInactive = 'time-scale__label_inactive';
            }

            return previousValue + `
                            <div class="time-scale__label ${classInactive}">
                                ${currentValue}
                            </div>`
        }), '');
    }

    getCoordLabel() {
        let obj = Object.create(null);

        this.labelElement.forEach((item, index) => {
            if (!item.classList.contains('time-scale__label_current')) {
                obj[this.timeLabel[index]] = item.offsetLeft + 0.5 * item.offsetWidth;
            }
        });
        return obj;
    }

    getScaleOfOneMinute() {
        const coordLabel = this.getCoordLabel();
        return (coordLabel[this.end] - coordLabel[this.end - 1]) / 60;
    }

    showCurrentLabel() {
        if (helpers.stateDate(this.model.getAppDateUTC()) !== 0) return;

        const currentLabel = this.createElement(
            'div',
            ['time-scale__label', 'time-scale__label_current'],
            );

        currentLabel.hide();

        this.labelsElement.appendChild(currentLabel);
        setTimeout(moveCurrentLabel.bind(this), 0);
        this.timer ? clearTimeout(this.timer) : null;

        function moveCurrentLabel() {
            currentLabel.show();

            const currentDate = this.model.getCurrentDateUTC();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();

            const indentLeft = this.getCoordLabel()[hours] -
                0.5 * currentLabel.offsetWidth +
                minutes * this.getScaleOfOneMinute();
            currentLabel.style.left = indentLeft + 'px';
            currentLabel.innerHTML = helpers.getTimeFormatHHMM(currentDate);

            this.timer = setTimeout(() => moveCurrentLabel.call(this), 1000 * (60 - currentDate.getSeconds()));
        }
    }

    *generateTimeLabels(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    get labelsElement() {
        return this.getElement('.time-scale__labels');
    }

    get labelElement() {
        return this.getElement('.time-scale__label');
    }

}

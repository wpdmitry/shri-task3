import {Base} from "../base/base";

export class TimeScale extends Base {
    constructor(model) {
        super();
        this.model = model;
        this.startWorkDay = 8;
        this.endWorkDay = 23;
        this.timeLabel = [...this.generateTimeLabels(this.startWorkDay, this.endWorkDay)];
        this.coordLabel = Object.create(null);
        this.scaleOfOneMinute = null;
    }

    render() {
        return `
            <div class="time-scale">
                <div class="time-scale__empty"></div>
                <div class="time-scale__labels"></div>
                <div class="time-scale__empty"></div>
            </div>
        `
    }

    onRender() {
        this.drawLabels();
        this.calculateScaleLabels();
        this.drawCurrentLabel();
    }

    drawLabels() {
        if (this.model.isToday()) {
            const currentDate = this.model.setDate(new Date());

            this.labelsElement.innerHTML = this.timeLabel.reduce(((previousValue, currentValue) => {
                const classInactive = currentValue <= this.model.getCurrentDate().getHours() ? 'time-scale__label_inactive' : '';

                return previousValue + `
                                <div class="time-scale__label ${classInactive}">
                                    ${currentValue}
                                </div>`
            }), '');

            setTimeout(() => this.drawLabels(), 1000 * 60 * (60  - currentDate.getMinutes()));

        } else

            this.labelsElement.innerHTML = this.timeLabel.reduce(((previousValue, currentValue) => {
                return previousValue + `
                                <div class="time-scale__label time-scale__label_inactive">
                                    ${currentValue}
                                </div>`
            }), '');
    }

    calculateScaleLabels() {
        this.labelElement.forEach((item, index) => {
            this.coordLabel[this.timeLabel[index]] = item.offsetLeft + 0.5 * item.offsetWidth;
        });
        this.scaleOfOneMinute = (this.coordLabel[this.endWorkDay] - this.coordLabel[this.endWorkDay - 1]) / 60;
    }

    drawCurrentLabel() {
        if (!this.model.isToday()) return;

        const currentLabel = this.createElement('div', ['time-scale__label', 'time-scale__label_current'],);
        this.labelsElement.appendChild(currentLabel);
        moveCurrentLabel.call(this);

        function moveCurrentLabel() {
            const currentDate = this.model.setDate(new Date);

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();

            currentLabel.style.left = `${this.coordLabel[hours] -
            0.5 * currentLabel.offsetWidth +
            minutes * this.scaleOfOneMinute}px`;
            currentLabel.innerHTML = this.model.getStringTime();

            setTimeout(() => moveCurrentLabel.call(this), 1000* (60 - currentDate.getSeconds()));
        }
    }

    *generateTimeLabels(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    get labelsElement() {
        return this.getElements('time-scale__labels');
    }

    get labelElement() {
        return this.getElements('time-scale__label');
    }

}

import {Base} from "../base/base";
import {Popup} from "../popup/popup";

export class Diagram extends Base {

    constructor(rooms, model, timeScale) {
        super();
        this.rooms = rooms;
        this.model = model;
        this.coordTimeLabels = timeScale[0];
        this.scaleOfOneMinute = timeScale[1];
    }

    render() {
        const timeItemHtml = this.createTimeItemElement();
        let diagramHtml = '';
        for (let item of this.rooms) {
            const floor = item[0],
                rooms = item[1];

            diagramHtml +=
                `
                <div class="diagram__floor">
                
                    ${rooms.reduce((prevVal, currentVal) => {
                        const id = currentVal['id'];
    
                        return prevVal +
                            `
                           <div class="diagram__room" data-floor="${floor}" data-room="${id}">
                                ${timeItemHtml}
                           </div>
                            `
                    }, '')
                }    
                </div>
                `;
        }

        return `
            <div class="diagram">
                ${diagramHtml}
            </div>
            `
    }

    onRender() {
        this.model.getEvents(dataEvents => this.drawBusyMeetings(dataEvents));

        this.domElement.parentNode.addEventListener('click', e => this.handlePopup(e));
    }

    drawBusyMeetings(events) {

        events.forEach(event => {
            const roomId = event['room']['id'],
                title = event['title'],
                dateStart = new Date(event['dateStart']),
                dateEnd = new Date(event['dateEnd']),
                timeStart = this.getTime(dateStart),
                timeEnd = this.getTime(dateEnd);

            if (dateEnd > dateStart) {
                let timeItemElements = this.getTimeItemElementInRoom(roomId, timeStart, timeEnd);

                const w0 = this.differenceTimeInMinutes(timeItemElements[0].dataset.timeStart, timeStart),
                    w = this.differenceTimeInMinutes(timeStart, timeEnd),
                    w1 = this.differenceTimeInMinutes(timeEnd, timeItemElements[timeItemElements.length-1].dataset.timeEnd);

                const el0 = this.createElement(
                    'div',
                    ['diagram__time-item'],
                    {
                        'style': `min-width:${w0 * this.scaleOfOneMinute}px`,
                    },
                );
                const el = this.createElement(
                    'div',
                    ['diagram__time-item', 'diagram__time-item_busy'],
                    {
                        'style': `min-width:${w * this.scaleOfOneMinute}px`,
                        'data-time-start' : `${timeStart}`,
                        'data-time-end': `${timeEnd}`,
                    },
                );

                this.addLabelElement(el, event);

                const el1 = this.createElement(
                    'div',
                    ['diagram__time-item'],
                    {
                        'style': `min-width:${w1 * this.scaleOfOneMinute}px`,
                    },
                );

                timeItemElements[0].insertAdjacentElement('beforeBegin', el0);
                el0.insertAdjacentElement('beforeBegin', el);
                el.insertAdjacentElement('beforeBegin', el1);

                timeItemElements.forEach(item => {
                    item.parentNode.removeChild(item);
                });
            }
        });
    }

    getTimeItemElementInRoom(id, timeStart, timeEnd) {
        const room = this.getRoomElement(id);
        let meetings = room.getElementsByClassName('diagram__time-item');

        meetings = Array.from(meetings).filter(item => {
            if (item.hasAttribute('data-time-start')) {
                const compare1 = this.differenceTimeInMinutes(item.dataset.timeStart, timeStart),
                    compare2 = this.differenceTimeInMinutes(timeEnd, item.dataset.timeEnd);
                const flag1 = compare1 >= 0 && compare1 <= 60;
                const flag2 = compare2 >= 0 && compare2 <= 60;
                return flag1 || flag2
            } else {
                return false;
            }
        });

        return meetings;
    }

    getRoomElement(id) {
        const rooms = this.getElements('diagram__room');
        return rooms.find(item => {
            return item.dataset.room === id;
        });
    }

    handlePopup(event) {
        let labelElements = this.labelElements;
        if (labelElements === undefined) return;

        if (labelElements.length === undefined) {
            labelElements = [labelElements];
        }

        labelElements.forEach(item => {
            let childes = item.children;

            if (item.contains(event.target) && childes.length > 0) {

                for (let i = 0, l = childes.length; i < l; i++) {
                    childes[i].classList.add('diagram__label_active');
                }

            } else if (childes.length > 0){
                for (let i = 0, l = childes.length; i < l; i++) {
                    childes[i].classList.remove('diagram__label_active');
                }
            }
        });
    }

    addLabelElement(el, event) {
        const labelElement = this.createElement('div', ['diagram__label']),
            triangleElement = this.createElement('div', ['diagram__triangle']),
            popupElement = this.createElement('div', ['diagram__popup']);

        labelElement.appendChild(triangleElement);
        labelElement.appendChild(popupElement);

        labelElement.addEventListener('click', () => {
            triangleElement.classList.add('diagram__label_active');
            popupElement.classList.add('diagram__label_active');
        });

        const popup = new Popup(event);
        popup.renderTo(popupElement);

        el.appendChild(labelElement);
    }

    createTimeItemElement() {
        let timeItemHtml = '',
            prevCoordLabel = 0,
            widthFirstTimeItem = null;

        for (let key in this.coordTimeLabels) {
            const currentCoordLabel = this.coordTimeLabels[key],
                currentWidth = currentCoordLabel - prevCoordLabel;

            if (!widthFirstTimeItem) {
                timeItemHtml +=
                    `<div class="diagram__time-item" style="min-width: ${currentWidth}px"></div>`;
                widthFirstTimeItem = currentWidth;
            } else {
                timeItemHtml +=
                    `<div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px"
                        data-time-start="${parseInt(key) - 1}:00"
                        data-time-end="${key}:00">
                    </div>`;
            }

            prevCoordLabel = currentCoordLabel;
        }

        timeItemHtml += `<div class="diagram__time-item" style="min-width: ${widthFirstTimeItem}px"></div>`;

        return timeItemHtml;
    }

    getTime(date) {
        let hours = date.getUTCHours(),
            minutes = date.getUTCMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`
    }

    differenceTimeInMinutes(time1, time2) {
        const [hours1, minutes1] = time1.split(':'),
            [hours2, minutes2] = time2.split(':');

        const diffHours = parseInt(hours2) - parseInt(hours1);
        const diffMinutes = parseInt(minutes2) - parseInt(minutes1);

        return diffHours * 60 + diffMinutes;
    }

    get labelElements() {
        return this.getElements('diagram__label');
    }
}
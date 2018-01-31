import {BaseComponent} from "../../framework/BaseComponent";
import {helpers} from "../../helpers/helpers";
import {Popup} from "../popup/popup";
import {MEETING_PAGE} from "../../events";

export class Diagram extends BaseComponent {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
        return `
            <div class="diagram"></div>
            `
    }

    onRender() {
        document.on('click', e => this.handlePopup(e));
        this.domElement.on('click', e => this.handleCreate(e));
    }

    upgrade() {
        this.showTimeItems();
        this.model.getEvents(dataEvents => this.showBusyMeetings(dataEvents));
    }

    setRooms(rooms) {
        let floorHtml = '';
        let roomsHtml = '';
        let currentFloor = rooms[0]['floor'];

        rooms.forEach(room => {
            const roomId = room['id'];
            const floor = room['floor'];

            if (floor !== currentFloor) {
                floorHtml += `
                    <div class="diagram__floor" data-floor="${currentFloor}">
                        ${roomsHtml}
                    </div>
                `;

                roomsHtml = '';
                currentFloor = floor;
            }

            roomsHtml += `
                <div class="diagram__room" data-room-id="${roomId}"></div>
            `;
        });

        floorHtml += `
                    <div class="diagram__floor">
                        ${roomsHtml}
                    </div>
                `;

        this.domElement.innerHTML = floorHtml;
        this.upgrade();
    }

    handlePopup(e) {
        let labelElements = this.labelElements;
        if (!labelElements) return;

        labelElements = labelElements.length ? labelElements : [labelElements];

        labelElements.forEach(label => {
            if (label === e.target) {
                label.classList.remove('diagram__label_active');
                if (helpers.deviceCheck() === 'touch') {
                    label.children[1].style.left = `-${label.getBoundingClientRect().left}px`;
                }
            } else if (label.parentNode === e.target || label.contains(e.target)) {
                label.classList.add('diagram__label_active');
                if (helpers.deviceCheck() === 'touch') {
                    label.children[1].style.left = `-${label.getBoundingClientRect().left}px`;
                }
            } else {
                label.classList.remove('diagram__label_active');
            }
        });
    }

    handleCreate(e) {
        let rooms = this.roomElements;
        if (!rooms) return;

        rooms = rooms.length ?
            rooms
            :
            [rooms];

        let timeItemFreeElements = this.timeItemFreeElements;
        if (!timeItemFreeElements) return;

        timeItemFreeElements = timeItemFreeElements.length ?
            timeItemFreeElements
            :
            [timeItemFreeElements];

        rooms.forEach(room => {
            if (room.contains(e.target) || room === e.target) {
                timeItemFreeElements.forEach(item => {
                    if (e.target === item) {
                        const roomId = room.dataset.roomId;
                        const timeStart = item.dataset.timeStart;
                        const timeEnd = item.dataset.timeEnd;

                        this.triggerEvent(MEETING_PAGE, {
                            roomId,
                            timeStart,
                            timeEnd,
                        })
                    }
                })
            }
        });
    }

    showTimeItems() {
        const timeItemHtml = this.createTimeItemElement();

        this.roomElements.forEach(el => {
            el.innerHTML = timeItemHtml;
        })
    }

    showBusyMeetings(dataEvents) {

        dataEvents.forEach(event => {
            const roomId = event['room']['id'],
                title = event['title'],
                dateStart = helpers.getDateUTC(0, event['dateStart']),
                dateEnd = helpers.getDateUTC(0, event['dateEnd']),
                timeStart = helpers.getTimeFormatHHMM(dateStart),
                timeEnd = helpers.getTimeFormatHHMM(dateEnd);

            let timeItemElements = this.getTimeItemElementInRoom(roomId, timeStart, timeEnd);

            const wL = helpers.differenceTimeInMinutes(timeStart, timeItemElements[0].dataset.timeStart);
            const wM = helpers.differenceTimeInMinutes(timeEnd, timeStart);
            const wR = helpers.differenceTimeInMinutes(timeItemElements[timeItemElements.length-1].dataset.timeEnd, timeEnd);

            const elL = this.createElement(
                'div',
                ['diagram__time-item', 'diagram__time-item_free'],
                {
                    'style': `min-width: ${wL * this.scaleOfOneMinute}px`,
                    'data-time-start': `${timeItemElements[0].dataset.timeStart}`,
                    'data-time-end': `${timeStart}`
                },
            );

            const elM = this.createElement(
                'div',
                ['diagram__time-item', 'diagram__time-item_busy'],
                {
                    'style': `min-width: ${wM * this.scaleOfOneMinute}px`,
                    'data-time-start': `${timeStart}`,
                    'data-time-end': `${timeEnd}`,
                },
            );

            this.addLabelElement(elM, event);

            const elR = this.createElement(
                'div',
                ['diagram__time-item', 'diagram__time-item_free'],
                {
                    'style': `min-width: ${wR * this.scaleOfOneMinute}px`,
                    'data-time-start': `${timeEnd}`,
                    'data-time-end': `${timeItemElements[timeItemElements.length - 1].dataset.timeEnd}`
                },
            );

            timeItemElements[0].insertAdjacentElement('beforeBegin', elL);
            timeItemElements[0].insertAdjacentElement('beforeBegin', elM);
            timeItemElements[0].insertAdjacentElement('beforeBegin', elR);

            timeItemElements.forEach(item => {
                item.parentNode.removeChild(item);
            });

        })
    }

    setCoordTimeScale({coord, scaleOfOneMinute}) {
        this.coordTimeLabels = {};
        Object.assign(this.coordTimeLabels, coord);
        this.scaleOfOneMinute = scaleOfOneMinute;
    }

    getTimeItemElementInRoom(id, timeStart, timeEnd) {
        const room = this.getRoomElement(id);
        let meetings = room.getElementsByClassName('diagram__time-item');

        meetings = Array.from(meetings).filter(item => {
            if (item.hasAttribute('data-time-start')) {
                const compare1 = helpers.differenceTimeInMinutes(timeStart, item.dataset.timeStart);
                const compare2 = helpers.differenceTimeInMinutes(item.dataset.timeEnd, timeEnd);

                const flag1 = compare1 >= 0 && compare1 < 60;
                const flag2 = compare2 >= 0 && compare2 < 60;
                const flag3 = compare1 < 0 && compare2 < 0;

                return flag1 || flag2 || flag3
            } else {
                return false;
            }
        });

        return meetings;
    }

    getRoomElement(id) {
        const rooms = this.roomElements;
        return rooms.find(item => {
            return item.dataset.roomId === id;
        });
    }

    addLabelElement(el, event) {
        const labelElement = this.createElement('div', ['diagram__label']);
        const triangleElement = this.createElement('div', ['diagram__triangle']);
        const popupElement = this.createElement('div', ['diagram__popup']);

        labelElement.appendChild(triangleElement);
        labelElement.appendChild(popupElement);

        labelElement.on('click', () => {
            triangleElement.classList.add('diagram__label_active');
            popupElement.classList.add('diagram__label_active');
        });

        const popup = new Popup(event);
        popup.renderTo(popupElement);
        this.addToListUpgrade(popup);

        el.appendChild(labelElement);
    }

    createTimeItemElement() {
        let timeItemHtml = '';
        let currentWidth;

        const listCoordLabels = Object.keys(this.coordTimeLabels);
        listCoordLabels.forEach((key, index) => {
            if (index === 0) {
                currentWidth = this.coordTimeLabels[key];

                timeItemHtml += `
                    <div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px">
                    </div>
                `;
            } else {
                currentWidth = this.coordTimeLabels[key] - this.coordTimeLabels[key - 1];

                timeItemHtml += `
                    <div 
                        class="diagram__time-item diagram__time-item_free" 
                        style="min-width: ${currentWidth}px"
                        data-time-start="${key - 1}:00"
                        data-time-end="${key}:00">
                    </div>
                `;
            }

            if (index === listCoordLabels.length - 1) {
                currentWidth = helpers.deviceCheck() === 'desktop' ?
                    this.domElement.offsetWidth - this.coordTimeLabels[key]
                    :
                    24.5;

                timeItemHtml += `
                    <div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px">
                    </div>
                `;
            }
        });

        return timeItemHtml;
    }

    get labelElements() {
        return this.getElement('.diagram__label');
    }

    get roomElements() {
        return this.getElement('.diagram__room')
    }

    get timeItemFreeElements() {
        return this.getElement('.diagram__time-item_free');
    }
}
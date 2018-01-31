import {BaseComponent} from "../../framework/BaseComponent";
import {SELECT_TALK} from "../../events";

export class Talks extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="talks">
                <div class="talks__title"></div>
            </div> 
        `
    }

    onRender() {
        this.domElement.on('click', e => this.handleChooseTalk(e));
    }

    upgrade() {}

    handleChooseTalk(e) {
        let talksItem = this.itemElements;
        if (!talksItem) return;
        if (!talksItem.length) {
            talksItem = [talksItem];
        }

        talksItem.forEach(talk => {
            if (talk.contains(e.target) || talk === e.target) {
                talk.classList.add('talks__item_chosen', 'js-talk');

                const timeElement = talk.getElementsByClassName('talks__time')[0];
                timeElement.classList.add('talks__time_chosen');

                const locationElement = talk.getElementsByClassName('talks__location')[0];
                locationElement.classList.add('talks__location_chosen');

                const roomId = talk.dataset.roomId;

                this.triggerEvent(SELECT_TALK);

                talksItem.forEach(t => {
                    if (t !== talk) {
                        t.classList.remove('talks__item_chosen', 'js-talk');

                        const timeElement = t.getElementsByClassName('talks__time')[0];
                        timeElement.classList.remove('talks__time_chosen');

                        const locationElement = t.getElementsByClassName('talks__location')[0];
                        locationElement.classList.remove('talks__location_chosen');
                    }
                })
            }
        })
    }

    setText(text) {
        this.titleElement.textContent = text;
    }

    setRoom({id, title, floor, timeStart, timeEnd}) {

        const talks = this.createElement(
            'div',
            ['talks__item', 'talks__item_chosen'],
            {
                'data-room-id': `${id}`
            }
        );

        const talksTime = this.createElement(
            'div',
            ['talks__time', 'talks__time_chosen'],
            {
                'data-time-start': `${timeStart}`,
                'data-time-end': `${timeEnd}`
            }
        );
        talksTime.textContent = `${timeStart}—${timeEnd}`;

        const talksLocation = this.createElement(
            'div',
            ['talks__location', 'talks__location_chosen']
        );
        talksLocation.innerHTML = `${title} &middot; ${floor} этаж`;

        talks.appendChild(talksTime);
        talks.appendChild(talksLocation);

        this.domElement.appendChild(talks);
    }

    setRooms(rooms) {

        rooms.forEach(room => {
            const id = room['id'];
            const title = room['title'];
            const floor = room['floor'];
            const timeStart = room['timeStart'];
            const timeEnd = room['timeEnd'];

            const talks = this.createElement(
                'div',
                ['talks__item'],
                {
                    'data-room-id': `${id}`
                }
            );

            const talksTime = this.createElement(
                'div',
                ['talks__time'],
                {
                    'data-time-start': `${timeStart}`,
                    'data-time-end': `${timeEnd}`
                }
            );
            talksTime.textContent = `${timeStart}—${timeEnd}`;

            const talksLocation = this.createElement(
                'div',
                ['talks__location']
            );
            talksLocation.innerHTML = `${title} &middot; ${floor} этаж`;

            talks.appendChild(talksTime);
            talks.appendChild(talksLocation);

            this.domElement.appendChild(talks);
        });
    }

    removeRooms() {
        let itemElement = this.itemElements;

        if (!itemElement) return;

        if (!itemElement.length) {
            itemElement = [itemElement];
        }

        itemElement.forEach(item => {
            item.parentNode.removeChild(item);
        })
    }

    get titleElement() {
        return this.getElement('.talks__title');
    }

    get itemElements() {
        return this.getElement('.talks__item');
    }

    get timeElement() {
        return this.getElement('.talks__time');
    }

    get locationElement() {
        return this.getElement('.talks__location');
    }

    get chosenElement() {
        return this.getElement('.talks__item_chosen');
    }
}
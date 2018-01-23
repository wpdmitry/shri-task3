import {Base} from "../base/base";
import {AutoBind} from "../autobind/autobind";

export class Talks extends Base {

    constructor({model, talkText, timeStart, timeEnd, room, bindCreate}) {
        super();
        this.model = model;
        this.talkText = talkText;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.room = room;
        this.bindCreate = bindCreate;
    }

    render() {
        const roomHtml = `<div 
                            class="talks__item talks__item_chosen" 
                            data-room="${this.room.id}"
                            ${this.bindCreate ? `[data-room]:${this.bindCreate}` : ''}>
                            <div class="talks__time talks__time_chosen">${this.timeStart}—${this.timeEnd}</div>
                            <div class="talks__location talks__location_chosen">${this.room.title} &middot; ${this.room.floor} этаж</div>
                          </div>`;

        return `
            <div class="talks">
                <div class="talks__title">${this.talkText}</div>
                ${this.room ? roomHtml : ''}
            </div> 
        `
    }

    onRender() {
        this.searchTalks();
    }

    searchTalks() {
        const autobind = new AutoBind();
            // usersId = autobind.getVariable('member').map(item => {
            //     return item.el.getAttribute(item.props[0]);
            // });


        const promiseInputDate = new Promise((resolve, reject) => {
            const inputDate = autobind.getVariable('inputDate')[0].el;
            inputDate.addEventListener('change', () => {
                resolve(inputDate.value);
            });
        });

        const promiseInputTimeStart =  new Promise((resolve, reject) => {
            const inputTimeStart = autobind.getVariable('inputTimeStart')[0].el;
            inputTimeStart.addEventListener('change', () => {
                resolve(inputTimeStart.value);
            });

        });

        const promiseInputTimeEnd = new Promise((resolve, reject) => {
            const inputTimeEnd = autobind.getVariable('inputTimeEnd')[0].el;
            inputTimeEnd.addEventListener('change', () => {
                resolve(inputTimeEnd.value);
            })
        });

        Promise.all([promiseInputDate, promiseInputTimeStart, promiseInputTimeEnd])
            .then(res => {
                this.model.getRecommendation({
                    date: res[0],
                    timeStart: res[1],
                    timeEnd: res[2],
                    callback: this.drawTalks.bind(this),
                })
            });
    }

    drawTalks(freeRooms, timeStart, timeEnd) {
        const firstChild = this.domElement.children[0];
        this.domElement.innerHTML = '';
        this.domElement.appendChild(firstChild);

        freeRooms.forEach(room => {
            const itemElement = this.createElement(
                'div',
                ['talks__item'],
                {
                    'data-room': room.id,
                }
            );

            const timeElement = this.createElement('div', ['talks__time']);
            timeElement.innerHTML = `${timeStart}—${timeEnd}`;

            const locationElement = this.createElement('div', ['talks__location']);
            locationElement.innerHTML = `${room.title} &middot; ${room.floor} этаж`;

            itemElement.appendChild(timeElement);
            itemElement.appendChild(locationElement);

            this.domElement.appendChild(itemElement);
        })
    }
}
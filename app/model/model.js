import {loadRooms} from "../api/loadRooms";
import {loadEvents} from "../api/loadEvents";

export class Model {

    constructor() {
        this.event = Object.create(null);
        this._currentFrozenDate = new Date();
        this._currentDate = new Date();
        this._rooms = null;
        this._events = null;
    }

    getCurrentFrozenDate() {
        return this._currentFrozenDate;
    }

    getRooms(callback) {
        // if (this._rooms) return callback(this._rooms);

        loadRooms(data => {
            this._rooms = data;
            callback(data);
        });
    }

    getRecommendation({countMember = null, date, timeStart, timeEnd, callback}) {
        const dateStart = this.parseDate(date, timeStart);
        const dateEnd = this.parseDate(date, timeEnd);

        loadEvents(data => {
            let busyRoomsId = data.filter(event => {
                const flag1 = dateStart >= event.dateStart && dateStart <= event.dateEnd;
                const flag2 = dateEnd <= event.dateEnd && dateEnd >= event.dateStart;

                return flag1 && flag2;
            })
                .map(event => {
                    return event['room']['id'];
                });

            loadRooms((err,data) => {
                let freeRooms = data['data']['rooms'].filter(room => {
                    if (busyRoomsId.indexOf(room['id']) === -1) {
                        return true;
                    }
                });

                callback(freeRooms, timeStart, timeEnd);
            }, false);
        });
    }


    getEvents(callback) {
        // if (this._events) {
        //     events = this._events;
        // }

        loadEvents(data => {
            this._events = data;
            selectionDate.call(this, data);
        });

        function selectionDate(eventData) {

            eventData = eventData.filter(event => {
                const eventDate = new Date(event['dateStart']);

                const flag1 = eventDate.getUTCFullYear() === this.getCurrentDate().getFullYear();
                const flag2 = eventDate.getUTCMonth() === this.getCurrentDate().getMonth();
                const flag3 = eventDate.getUTCDate() === this.getCurrentDate().getDate();

                return flag1 && flag2 && flag3
            });

            callback(eventData);
        }

    }

    isToday() {
        const flag1 = this.getCurrentDate().getFullYear() === this.getCurrentFrozenDate().getFullYear();
        const flag2 = this.getCurrentDate().getMonth() === this.getCurrentFrozenDate().getMonth();
        const flag3 = this.getCurrentDate().getDate() === this.getCurrentFrozenDate().getDate();

        return flag1 && flag2 && flag3
    }


    getCurrentDate() {
        return this._currentDate;
    }

    setDate(date) {
        this._currentDate = date;
        return this.getCurrentDate();
    }

    getDateToLocalString() {
        return this.getCurrentDate().toLocaleString('ru', {
            day: 'numeric',
            month: 'short'
        })
    }

    getStringTime() {
        let hours = this.getCurrentDate().getHours();
        let minutes = this.getCurrentDate().getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`
    }

    parseDate(date, time) {
        const monthToNumber = {
            "января": 0,
            "февраля": 1,
            "марта": 2,
            "апреля": 3,
            "мая": 4,
            "июня": 5,
            "июля": 6,
            "августа": 7,
            "сентября": 8,
            "октября": 9,
            "ноября": 10,
            "декабря": 11,
        };

        let [number, month, year] = date.replace(',', '').split(' ');
        let [hours, minutes] = time.split(':');

        return new Date(+year, monthToNumber[month], +number, +hours+3, +minutes).toISOString();
    }
}
import {loadRooms} from "../api/loadRooms";
import {loadEvents} from "../api/loadEvents";
import {helpers} from "../helpers/helpers";
import {loadUsers} from "../api/loadUsers";
import {removeEvent} from "../api/removeEvent";
import {getRecommendationTalks} from "../helpers/getRecommendationTalks";
import {createEvent} from "../api/createEvent";

export class Model {

    constructor() {
        this._offset = 0;
        this._rooms = null;
        this._events = null;
        this._users = null;
    }

    getAppDateUTC() {
        return helpers.getOffsetDateUTC(this._offset)
    }

    setAppDateUTC(date) {
        this._offset = date - this.getCurrentDateUTC();
    }

    getCurrentDateUTC() {
        return helpers.getDateUTC();
    }

    getDateUTCToString() {
        return helpers.stateDateString(this.getAppDateUTC());
    }

    getRooms(callback) {
        if (this._rooms) {
            console.log('rooms from cache');
            callback(this._rooms);

        } else {
            loadRooms(dataRooms => {
                this._rooms = dataRooms.slice();
                callback(dataRooms);
            });
        }

        // setInterval(() => {
        //     loadRooms(dataRooms => {
        //         if (dataRooms.length !== this._rooms) {
        //             this._rooms = dataRooms.slice();
        //
        //             callback(dataRooms);
        //         }
        //     })
        // }, 60000);
    }

    getRoomById(id, callback) {
        this.getRooms(rooms => {
            const room = rooms.find(item => {
                return item['id'] === id;
            });

            callback(room);
        })
    }

    getUsers(callback) {
        loadUsers(users => callback(users));
    }

    getEvents(callback, date = this.getAppDateUTC()) {
        // if (this._events) {
        //     console.log('events from cache');
        //     callback(this.selectEvents(this._events));
        // }
        loadEvents(events => callback(this.selectEvents(events, date)));
    }

    selectEvents(events, date) {
        let _events = events.slice();

        return _events.filter(event => {
            const dateStart = helpers.getDateUTC(0, event['dateStart']);
            const dateEnd = helpers.getDateUTC(0, event['dateEnd']);

            const flag1 = helpers.stateDate(dateStart, date) === 0;
            const flag2 = helpers.stateDate(dateEnd, date) === 0;
            const flag3 = dateEnd > dateStart;

            return flag1 && flag2 && flag3
        })
    }

    deleteEvent(id, callback) {
        removeEvent(id, res => callback(res));
    }

    createNewEvent({title, dateStart, dateEnd, membersId, roomId, callback}) {
        createEvent({
            title,
            dateStart,
            dateEnd,
            membersId,
            roomId,
            callback,
        })
    }

    dataProcessing(dateStart, dateEnd, membersId) {
        const data = {
            date: {
                dateStart,
                dateEnd,
            },
            membersId,
            db: {},
        };

        return new Promise(resolve => {
            this.getEvents(events => {
                data.db.events = events;
                resolve(data);
            }, data.date.dateStart)
            })
            .then(data => {
                return new Promise(resolve => {
                    this.getRooms(rooms => {
                        data.db.rooms = rooms;
                        resolve(data);
                    })
                })
            })
            .then(data => {
                return new Promise(resolve => {
                    this.getUsers(users => {
                        data.db.users = users;
                        resolve(data);
                    })
                })
            })
            .then(data => {
                return getRecommendationTalks(data);
            })
        }
}
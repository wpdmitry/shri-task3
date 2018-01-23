import {Base} from "../base/base";
import {Person} from "../person/person";
import {CREATE__MEETING, EDIT_MEETING} from "../../events";

export class Popup extends Base {

    constructor(event) {
        super();
        this.event = event;
    }

    render() {
        const dateStart = new Date(this.event['dateStart']),
            dateEnd = new Date(this.event['dateEnd']);

        this.id = this.event['id'];
        this.title = this.event['title'];
        this.room = this.event['room'];
        this.users = this.event['users'];
        this.countOthers = this.users.length - 1;
        this.day = dateStart.toLocaleString('ru', {day: 'numeric', month: 'long'});
        this.year = dateStart.getFullYear();
        this.timeStart = this.getTime(dateStart);
        this.timeEnd = this.getTime(dateEnd);

            return `
                <div class="popup">
                    <div class="popup__edit">
                        <img class="popup__edit-img" src="image/svg/edit.svg" alt="">
                    </div>
                    <div class="popup__title">${this.title}</div>
                    <div class="popup__description">
                        <span class="popup__date">${this.day}, </span>
                        <span class="popup__time">${this.timeStart} - ${this.timeEnd}</span>
                        <span class="popup__delimiter">·</span>
                        <span class="popup__room">${this.room['title']}</span>
                    </div>
                    <div class="popup__members">
                        <div class="popup__creator"></div>
                        <div class="popup__other">
                            и ${this.countOthers}
                            ${this.countOthers === 1 ? 
                                    `участник` 
                                    : 
                                    `${this.countOthers > 1 && this.countOthers < 5 ? 'участника' : 'участников'}`
                            }
                        </div>
                    </div>
                </div>

            `


    }

    onRender() {
        this.drawPerson(this.event['users'][0]);

        this.editElement.on('click', () => this.handleEditMeeting());
    }

    drawPerson(user) {
        const login = user['login'],
            avatar = user['avatarUrl'];

        const person = new Person({
            login: login,
            avatar: avatar,
        });
        person.renderTo(this.creatorElement);
    }

    handleEditMeeting() {
        this.triggerEvent(EDIT_MEETING, {
            id: this.id,
            title: this.title,
            date: `${this.day}, ${this.year}`,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            room: this.room,
            users: this.users,
        });
    }

    get creatorElement() {
        return this.getElements('popup__creator');
    }

    get editElement() {
        return this.getElements('popup__edit');
    }

    getTime(date) {
        let hours = date.getUTCHours(),
            minutes = date.getUTCMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`
    }
}
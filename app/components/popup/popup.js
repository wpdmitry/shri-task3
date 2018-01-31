import {Person} from "../person/person";
import {BaseComponent} from "../../framework/BaseComponent";
import {helpers} from "../../helpers/helpers";
import {MEETING_PAGE} from "../../events";

export class Popup extends BaseComponent {

    constructor({id, title, room, users, dateStart, dateEnd}) {
        super();
        this.id = id;
        this.title = title;
        this.room = room;
        this.users = users;
        this.dateStart = helpers.getDateUTC(0, dateStart);
        this.dateEnd = helpers.getDateUTC(0, dateEnd);
    }

    template() {
        const countOthers = this.users.length - 1;
        const dayWithMonth = this.dateStart.toLocaleString('ru', {day: 'numeric', month: 'long'});

        this.day = this.dateStart.getDate();
        this.year = this.dateStart.getFullYear();

        this.timeStart = helpers.getTimeFormatHHMM(this.dateStart);
        this.timeEnd = helpers.getTimeFormatHHMM(this.dateEnd);

        return `
            <div class="popup">
                <div class="popup__edit">
                    <img class="popup__edit-img" src="image/svg/edit.svg" alt="edit">
                </div>
                <div class="popup__title">${this.title}</div>
                <div class="popup__description">
                    <span class="popup__date">${dayWithMonth}, </span>
                    <span class="popup__time">${this.timeStart} - ${this.timeEnd}</span>
                    <span class="popup__delimiter">·</span>
                    <span class="popup__room">${this.room['title']}</span>
                </div>
                <div class="popup__members">
                    <div class="popup__creator"></div>
                    <div class="popup__other">
                        и ${countOthers}
                        ${countOthers === 1 ? 
                                `участник` 
                                : 
                                `${countOthers > 1 && countOthers < 5 ? 'участника' : 'участников'}`
                        }
                    </div>
                </div>
            </div>
        `
    }

    onRender() {
        this.drawPerson(this.users[0]);

        this.editElement.on('click', () => this.handleEdit());
    }

    upgrade() {

    }

    drawPerson(user) {
        const login = user['login'],
            avatar = user['avatarUrl'];

        const person = new Person({
            login: login,
            avatar: avatar,
        });

        person.renderTo(this.creatorElement);
        this.addToListUpgrade(person);
    }

    handleEdit() {
        this.triggerEvent(MEETING_PAGE, {
            eventId: this.id,
            title: this.title,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            roomId: this.room['id'],
            usersId: this.users.map(user => user['id']),
        });
    }

    get creatorElement() {
        return this.getElement('.popup__creator');
    }

    get editElement() {
        return this.getElement('.popup__edit');
    }
}
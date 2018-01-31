import {BaseComponent} from "../../framework/BaseComponent";
import {Header} from "../header/header";
import {Main} from "../main/main";
import {Meeting} from "../meeting/meeting";
import {Footer} from "../footer/footer";
import {
    BREAK_PROMISES,
    BREAK_PROMISES_ON_MAIN, CONFIRMED, CONTINUE_PROMISES, CREATE_EVENT, DELETE_EVENT, MAIN_PAGE,
    MEETING_PAGE, OK, SELECT_DATE,
    SELECT_MEMBERS, SELECT_TALK,
    SELECT_TIME_END,
    SELECT_TIME_START, SELECT_TITLE,
    UNCONFIRMED
} from "../../events";
import {Router} from "../../framework/Router";
import {Model} from "../../model/model";
import {Notification} from "../notification/notification";
import {validation} from "../../helpers/validation";
import {helpers} from "../../helpers/helpers";

export class App extends BaseComponent {

    constructor() {
        super();
        this.model = new Model();

        this.router = new Router();
        this.router.register('/', this.showMainPage.bind(this));
        this.router.register('/meeting', this.showMeetingPage.bind(this));
    }

    template() {
        return `
            <div class="app"> 
                <div class="app__header"></div>   
                <div class="app__main"></div>  
                <div class="app__meeting"></div>
                <div class="app__footer"></div> 
                <div class="app__notification">
                    <div class="app__notification-create"></div>
                    <div class="app__notification-delete"></div>
                </div> 
            </div> 
        `
    }

    onRender() {
        this.router.go({path: '/', addInHistory: false});

        this.domElement.on(MEETING_PAGE, e => {
            this.detail = e.detail;
            this.router.go({path: '/meeting'});
        });

        this.domElement.on(MAIN_PAGE, () => {
            this.router.go({path: '/'});
            this.deepUpgrade();
            this.stopPromises();
            this.runPromises();
        });

        this.domElement.on(DELETE_EVENT, () => this.showNotificationDelete());
        this.domElement.on(CREATE_EVENT, () => {
            this.router.go({path: '/'});
            this.deepUpgrade();
            this.stopPromises();
            this.runPromises();
            this.showNotificationCreate();
        });

        this.runPromises();
    }

    upgrade() {}

    createHeader() {
        this.header = new Header();
        this.header.renderTo(this.headerElement);
        this.addToListUpgrade(this.header)
    }

    createMain() {
        this.main = new Main(this.model);
        this.main.renderTo(this.mainElement);
        this.addToListUpgrade(this.main);
    }

    createMeeting() {
        this.meeting = new Meeting(this.model);
        this.meeting.renderTo(this.meetingElement);
        this.addToListUpgrade(this.meeting);
    }

    createFooter() {
        this.footer = new Footer();
        this.footer.renderTo(this.footerElement);
        this.addToListUpgrade(this.footer);
    }

    createNotificationCreate() {
        this.notificationCreate = new Notification({type: 'create'});
        this.notificationCreate.renderTo(this.notificationCreateElement);
        this.addToListUpgrade(this.notificationCreate);

        this.domElement.on(OK, e => this.handleNotificationCreate(e));
    }

    createNotificationDelete() {
        this.notificationDelete = new Notification({type: 'delete'});
        this.notificationDelete.renderTo(this.notificationDeleteElement);
        this.addToListUpgrade(this.notificationDelete);

        this.domElement.on(CONFIRMED, e => this.handleNotificationDelete(e));
        this.domElement.on(UNCONFIRMED, e => this.handleNotificationDelete(e));
    }

    showMainPage() {
        if (!this.header) this.createHeader();
        if (!this.main) this.createMain();

        this.meetingElement.hide();
        this.footerElement.hide();

        this.header.showButton();
        this.mainElement.show();
    }

    showMeetingPage() {
        if (!this.meeting) this.createMeeting();
        if (!this.footer) this.createFooter();

        this.mainElement.hide();
        this.header.hideButton();

        this.meeting.setDetail(this.detail);
        this.meetingElement.show();
        this.footer.setDetail(this.detail);
        this.footerElement.show();
    }

    showNotificationCreate() {
        if (!this.notificationCreate) this.createNotificationCreate();

        this.notificationCreate.setDateTime(this.strDate);
        this.notificationCreate.setLocation(this.strLocation);
        this.notificationDeleteElement.hide();
        this.notificationCreateElement.show();
        this.notificationElement.classList.add('app__notification_active');

        this.model.createNewEvent({
            title: this.title,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            membersId: this.membersId,
            roomId: this.roomId,
            callback: console.log,
        });
    }

    showNotificationDelete() {
        if (!this.notificationDelete) this.createNotificationDelete();

        this.notificationCreateElement.hide();
        this.notificationDeleteElement.show();
        this.notificationElement.classList.add('app__notification_active');
    }

    hideNotificationDelete() {
        this.notificationDeleteElement.hide();
        this.notificationElement.classList.remove('app__notification_active');
    }

    hideNotificationCreate() {
        this.notificationCreateElement.hide();
        this.notificationElement.classList.remove('app__notification_active');
    }

    handleNotificationCreate(e) {
        this.hideNotificationCreate();
        this.deepUpgrade();
    }

    handleNotificationDelete(e) {
        const eventId = this.detail['eventId'];

        switch (e.type) {
            case CONFIRMED: {
                this.model.deleteEvent(eventId, console.log);
                this.deepUpgrade();
                this.router.go({path: '/'});
                break;
            }
            case UNCONFIRMED:
                break;
        }

        this.hideNotificationDelete();
    }

    createPromises() {

        const promiseTitle = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TITLE, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseDate = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_DATE, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeStart = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TIME_START, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeEnd = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TIME_END, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseMembers = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_MEMBERS, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTalk = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TALK, e => {
                removeEvent();
                resolve();
            });
        });

        const breakPromise = new Promise((resolve, reject) => {
            let removeEvent1, removeEvent2;

            removeEvent1 = this.domElement.on(BREAK_PROMISES_ON_MAIN, () => {
                removeEvent1();
                removeEvent2();
                reject('stop');
            });

            removeEvent2 = this.domElement.on(CONTINUE_PROMISES, () => {
                removeEvent1();
                removeEvent2();
                resolve();
            });
        });

        return [
            promiseTitle,
            promiseDate,
            promiseTimeStart,
            promiseTimeEnd,
            promiseMembers,
            promiseTalk,
            breakPromise,
        ]
    }

    stopPromises() {
        this.triggerEvent(BREAK_PROMISES_ON_MAIN);
    }

    runPromises() {

        Promise.race(this.createPromises())
            .then(() => {
                    const flag1 = this.meeting.getDataForRecommendation();
                    const flag2 = this.checkTitleAndTalks();

                    if (!!flag1 && flag2) {
                        this.footer.setActiveButtonCreate();
                        this.dateStart = flag1[0];
                        this.dateEnd = flag1[1];
                        this.membersId = flag1[2];
                        this.strDate = helpers.glueTwoDateForString(flag1[0], flag1[1]);
                    } else {
                        this.footer.setDisabledButtonCreate();

                    }
                    this.runPromises();
                }
            )
            .catch((err) => {})
    }

    checkTitleAndTalks() {
        const title = this.getElement('.js-title').value;
        let talk = this.getElement('.js-talk');
        if (talk) {
            const roomId = talk.dataset.roomId;
            this.roomId = roomId;
            this.title = title;
            this.model.getRoomById(roomId, room => {
                this.strLocation = `${room['title']} &middot; ${room['floor']} этаж`;
            });
        }

        return !!talk && validation.title(title);
    }

    get headerElement() {
        return this.getElement('.app__header')
    }

    get mainElement() {
        return this.getElement('.app__main')
    }

    get meetingElement() {
        return this.getElement('.app__meeting');
    }

    get footerElement() {
        return this.getElement('.app__footer');
    }

    get notificationElement() {
        return this.getElement('.app__notification');
    }

    get notificationDeleteElement() {
        return this.getElement('.app__notification-delete');
    }

    get notificationCreateElement() {
        return this.getElement('.app__notification-create');
    }
}
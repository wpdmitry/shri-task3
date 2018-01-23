import {Base} from "../base/base";
import {Header} from "../header/header";
import {Main} from "../main/main";
import {Meeting} from "../meeting/meeting";
import {Footer} from "../footer/footer";
import {SHOW_MAIN, CREATE__MEETING, EDIT_MEETING} from "../../events";
import {Model} from "../../model/model";

export class App extends Base {

    constructor() {
        super();
        this.model = new Model();
    }

    render() {
        return `
            <div class="app">
                <div class="app__header"></div>
                <div class="app__main"></div>
                <div class="app__meeting"></div>
                <div class="app__footer"></div>
            </div> 
            `
    }

    onRender() {
        this.showMain();

        this.domElement.on(SHOW_MAIN, () => this.showMain());
        this.domElement.on(CREATE__MEETING, () => this.showCreateMeeting());
        this.domElement.on(EDIT_MEETING, event => this.showEditMeeting(event));
    }

    showMain() {
        const header = new Header({button: true});
        const main = new Main(this.model);

        header.renderTo(this.headerElement);
        main.renderTo(this.mainElement);

        this.meetingElement.hide();
        this.footerElement.hide();

        this.headerElement.show();
        this.mainElement.show();
    }

    showCreateMeeting() {
        const header = new Header({button: false});
        const meeting = new Meeting(this.model, undefined);
        const footer = new Footer({edit: false});

        header.renderTo(this.headerElement);
        meeting.renderTo(this.meetingElement);
        footer.renderTo(this.footerElement);

        this.mainElement.hide();

        this.headerElement.show();
        this.meetingElement.show();
        this.footerElement.show();
    }

    showEditMeeting(event) {
        const editData = event.detail;

        const header = new Header({button: false});
        const meeting = new Meeting(this.model, editData || undefined);
        const footer = new Footer({edit: true});

        header.renderTo(this.headerElement);
        meeting.renderTo(this.meetingElement);
        footer.renderTo(this.footerElement);

        this.mainElement.hide();

        this.headerElement.show();
        this.meetingElement.show();
        this.footerElement.show();
    }

    get headerElement() {
        return this.getElements('app__header');
    }

    get mainElement() {
        return this.getElements('app__main');
    }

    get meetingElement() {
        return this.getElements('app__meeting');
    }

    get footerElement () {
        return this.getElements('app__footer');
    }
}
import {BaseComponent} from "../../framework/BaseComponent";
import {helpers} from "../../helpers/helpers";

export class Rooms extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="rooms"></div> 
        `
    }

    onRender() {

        if (helpers.deviceCheck() === 'touch') {
            const wrapper1 = document.getElementsByClassName('js-scrolling-x')[0];
            wrapper1.addEventListener('scroll', e => this.scrolling(e));
        }
    }

    upgrade() {}

    setRooms(rooms) {
        let floorHtml = '';
        let roomsHtml = '';
        let currentFloor = rooms[0]['floor'];

        rooms.forEach(room => {
            const roomId = room['id'];
            const title = room['title'];
            const capacity = room['capacity'];
            const floor = room['floor'];

            if (floor !== currentFloor) {
                floorHtml += `
                    <div class="rooms__floor" data-floor="${currentFloor}">
                        <div class="rooms__floor-text">${currentFloor} ЭТАЖ</div>
                        ${roomsHtml}
                    </div>
                `;

                roomsHtml = '';
                currentFloor = floor;
            }

            roomsHtml += `
                <div class="rooms__room" data-room-id="${roomId}">
                    <div class="rooms__room-title">${title}</div>
                    <div class="rooms__room-capacity">до ${capacity} человек</div>
                </div>
            `;
        });

        floorHtml += `
                    <div class="rooms__floor">
                        <div class="rooms__floor-text">${currentFloor} ЭТАЖ</div>
                        ${roomsHtml}
                    </div>
                `;

        this.domElement.innerHTML = floorHtml;
    }

    scrolling(e) {
        const target = e.target;

        if (target.scrollLeft > this.domElement.offsetWidth) {
            this.toFixRoomsFloorText(target.scrollLeft);
            this.toFixRoomsRoomTitle(target.scrollLeft);
        } else {
            this.toFixRoomsFloorText(0);
            this.toFixRoomsRoomTitle(0);
        }
    }

    toFixRoomsFloorText(indent) {
        // if (this.floorTextElement.length === undefined) {
        //     this.floorTextElement.style.left = indent + 'px';
        // }

        Array.from(this.floorTextElement()).forEach(function (item) {
            item.style.left = indent + 'px';
        })
    }

    toFixRoomsRoomTitle(indent) {
        // let roomtitle = this.roomTitleElement();
        //
        // if (this.roomTitleElement.length === undefined) {
        //     roomtitle = [roomtitle];
        // }

        Array.from(this.roomTitleElement()).forEach(function (item) {
            item.style.left = indent + 'px';
            indent ?
                item.classList.add('rooms__room-title_scrolling')
                :
                item.classList.remove('rooms__room-title_scrolling');
        });
    }


    roomTitleElement() {
        return this.getElement('.rooms__room-title');
    }

    floorTextElement() {
        return this.getElement('.rooms__floor-text');
    }
}
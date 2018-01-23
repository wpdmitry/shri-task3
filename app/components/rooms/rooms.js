import {Base} from "../base/base";
import {loadRooms} from "../../api/loadRooms";

export class Rooms extends Base {

    constructor(rooms) {
        super();
        this.rooms = rooms;
    }

    render() {
        let roomsHtml = '';

        for (let item of this.rooms) {
            const floor = item[0],
                rooms = item[1];

            roomsHtml +=
                `
                <div class="rooms__floor">
                    <div class="rooms__floor-text">${floor} ЭТАЖ</div>
                    
                    ${rooms.reduce((prevVal, currentVal) => {
                        const id = currentVal['id'], 
                            title = currentVal['title'],
                            capacity = currentVal['capacity'];
                        
                        return prevVal + 
                            `
                           <div class="rooms__room" data-floor="${floor}" data-room="${id}">
                                <div class="rooms__room-title">
                                    ${title}
                                </div>
                                
                                <div class="rooms__room-capacity">
                                    до ${capacity} человек
                                </div>
                            </div>
                           `
                    }, '')}    
                </div>
                `;
        }

        return `
            <div class="rooms">
                ${roomsHtml}
            </div> 
        `
    }

    onRender() {

        const wrapper1 = document.getElementsByClassName('js-scrolling')[0];
        wrapper1.addEventListener('scroll', e => this.scrolling(e));
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
        return this.getElements('rooms__room-title');
    }

    floorTextElement() {
        return this.getElements('rooms__floor-text');
    }
}
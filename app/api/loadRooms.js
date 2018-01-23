import {ajax} from "./ajax";

export function loadRooms(callback, transform = true) {

    const qs = `query {rooms {id title capacity floor}}`;

    ajax({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: transform ? transformRooms : callback,
    });

    function transformRooms(err, data) {
        if (err) {
            console.log(err, 'on load rooms');
            return;
        }

        let rooms = data['data']['rooms'];
        rooms.sort((room1, room2) => {
            return room2['floor'] - room1['floor'];
        });

        let roomsOnFloors = new Map(),
            floor = -1;

        rooms.forEach((item) => {
            if (item['floor'] !== floor) {
                floor = item['floor'];
                roomsOnFloors.set(floor, []);
            }

            roomsOnFloors.get(floor).push(item);
        });

        callback(roomsOnFloors);
    }
}
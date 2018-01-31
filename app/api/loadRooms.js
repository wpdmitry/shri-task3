import {ajax} from "./ajax";

export function loadRooms(callback) {

    const qs = `query {rooms {id title capacity floor}}`;

    ajax({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: dataChecking,
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on load rooms');
            return;
        }

        let rooms = data['data']['rooms'];
        sortByFloor(rooms);
        callback(rooms);
    }

    function sortByFloor(rooms) {
        rooms.sort((room1, room2) => {
            return room2['floor'] - room1['floor'];
        });
    }
}
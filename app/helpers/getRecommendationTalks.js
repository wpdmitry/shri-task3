import {helpers} from "./helpers";

export function getRecommendationTalks({date, membersId, db}) {
    const dateStart = date.dateStart;
    const dateEnd = date.dateEnd;
    const rooms = db.rooms;
    const events = db.events;
    const users = db.users;


    const busyRooms = events.filter(event => {
        const eventDateStart = +helpers.getDateUTC(0, event['dateStart']);
        const eventsDateEnd = +helpers.getDateUTC(0, event['dateEnd']);

        const flag1 = +dateStart >= eventDateStart && +dateStart <= eventsDateEnd;
        const flag2 = +dateEnd >= eventDateStart && +dateEnd <= eventsDateEnd;

        return flag1 || flag2;
    })
        .map(event => {
            return event['room']['id'];
        });

    let freeRooms = rooms.filter(room => {
        const roomId = room['id'];
        const flag1 = busyRooms.indexOf(roomId) === -1;
        const flag2 = +room['capacity'] >= membersId.length;

        return flag1 && flag2;
    });

    freeRooms.sort((room1, room2) => {
        const room1Floor = +room1['floor'];
        const room2Floor = +room2['floor'];

       let total1Floor = 0;
       let total2Floor = 0;

       membersId.forEach(memberId => {

           const user = users.find(user => {
               return user['id'] == memberId;
           });

           const memberFloor = +user['homeFloor'];

           total1Floor += Math.abs(memberFloor - room1Floor);
           total2Floor += Math.abs(memberFloor - room2Floor);
       });

       return total1Floor - total2Floor;
    });

    return freeRooms.map(room => {
        return {
            id: room['id'],
            title: room['title'],
            floor: room['floor'],
            timeStart: helpers.getTimeFormatHHMM(dateStart),
            timeEnd: helpers.getTimeFormatHHMM(dateEnd),
        }
    })
}


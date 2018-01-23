import {ajax} from "./ajax";

export function createEvent({title, date, timeStart, timeEnd, users, room, event, callback}) {

    const dateStart = parseDate(date, timeStart),
        dateEnd = parseDate(date, timeEnd);

    const qs = `
             mutation {
              createEvent(
                input: {
                  title: "${title}",
                  dateStart: "${dateStart}",
                  dateEnd: "${dateEnd}",
                },
                    usersIds: [${users.join(',')}],
                    roomId: "${room}",
              ) {
                    id
                }
              }
    `;

    console.log(qs);

    ajax({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: transformData,
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on create events');
            return;
        }

        callback(data);
    }
}

function parseDate(date, time) {
    const monthToNumber = {
        "января": 0,
        "февраля": 1,
        "марта": 2,
        "апреля": 3,
        "мая": 4,
        "июня": 5,
        "июля": 6,
        "августа": 7,
        "сентября": 8,
        "октября": 9,
        "ноября": 10,
        "декабря": 11,
    };

    let [number, month, year] = date.replace(',', '').split(' ');
    let [hours, minutes] = time.split(':');

    return new Date(parseInt(year), monthToNumber[month], parseInt(number), parseInt(hours), parseInt(minutes)).toISOString();
}

import {ajax} from "./ajax";

export function loadEvents(callback) {

    const qs = `
        {
             events {
                id
                title
                dateStart	
                dateEnd
                users {
                  id
                  login
                  homeFloor
                  avatarUrl
                }
                room {
                  id
                  floor
                  title
                }
              }
        }
    `;

    ajax({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: transformData,
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on load events');
            return;
        }

        callback(data['data']['events']);
    }
}
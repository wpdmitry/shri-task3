import {ajax} from "./ajax";

export function loadUsers(callback) {

    const qs = `
        {
            users {
                id
                login
                homeFloor
                avatarUrl
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
            console.log(err, 'on load users');
            return;
        }

        callback(data['data']['users']);
    }
}
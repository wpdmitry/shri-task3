export function ajax({method, url, data = null, callback}) {

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            let err = `$[{xhr.status}] ${xhr.statusText}`;
            callback(err, null);
        } else {
            let jsonData = JSON.parse(xhr.responseText);
            callback(null, jsonData);
        }
    };

    xhr.send(data);
}
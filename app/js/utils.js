(function (global) {
    'use strict';

    function noop() {}

    function parseResponse(xhr) {
        if (xhr.responseHeaders['Content-Type'] === 'application/json') {
            return JSON.parse(xhr.responseText);
        }
        return xhr.responseText;
    }

    function ajax(url, success, error) {

        var xhr = new XMLHttpRequest(), response;

        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // DONE

                response = parseResponse(xhr);

                if (xhr.status === 200) {
                    (success || noop)(response);
                } else {
                    (error || noop)(response);
                }

            }

        };

        xhr.send('');
        return xhr;
    }

    global.ajax = ajax;
}(window));
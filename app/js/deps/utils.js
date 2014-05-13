(function (LMN) {
    'use strict';

    function extend(Parent, childProto) {
        function Sur() {}
        Sur.prototype = Parent.prototype;

        function Child() {
            if (typeof this.initialize === 'function') {
                this.initialize.apply(this, arguments);
            }
        }
        Child.prototype = new Sur();
        Child.prototype.contstructor = Child;
        Child.prototype.__super__ = Parent.prototype;

        for (var prop in childProto) {
            if (childProto.hasOwnProperty(prop)) {
                Child.prototype[prop] = childProto[prop];
            }
        }

        return Child;
    }

    function noop() {}

    function parseResponse(obj) {
        var xhr = obj.xhr, url = obj.url;

        if (url.match(/\.json$/) ||
            xhr.getResponseHeader('Content-Type') === 'application/json') {
            return JSON.parse(xhr.responseText);
        }
        return xhr.responseText;
    }

    function ajax(url, success, error) {

        var xhr = new XMLHttpRequest(), response;

        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // DONE

                response = parseResponse({ url: url, xhr: xhr });

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

    LMN.ajax = ajax;
    LMN.extend = extend;
}(window.LMN));

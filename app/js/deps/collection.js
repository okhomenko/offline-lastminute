(function (LMN) {
    'use strict';
    var ajax = LMN.ajax;

    function Collection(opts) {
        this.url = opts.url;
    }

    Collection.prototype.fetch = function (cb) {
        ajax(this.url, cb);
    };

    LMN.Collection = Collection;
}(window.LMN));
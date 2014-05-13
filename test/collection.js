// should fetch collection from server
// should call success on fetch

describe('Collection', function () {
    'use strict';
    var xhr, requests, Collection, cb;

    beforeEach(function () {
        Collection = window.LMN.Collection;

        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
        cb = sinon.spy();
    });

    afterEach(function () {
        xhr.restore();
    });

    it('should fetch via ajax', function () {
        var collection = new Collection({
            url: 'url'
        });
        collection.fetch();
        requests[0].url.should.equal('url');
    });

    it('should call callback on success', function () {
        var collection = new Collection({
            url: 'url'
        });
        collection.fetch(cb);
        requests[0].respond(200, {'Content-Type': 'application/json'}, '[]');
        cb.should.have.been.calledWith([]);
    });

});
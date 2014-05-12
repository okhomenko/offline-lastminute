// should make GET requests
// should use success and error callbacks, 200 - success, others - error
// should parse json if Content-Type: application/json
describe('ajax', function () {
    'use strict';
    var xhr, ajax, requests,
        url, success, error;

    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    beforeEach(function () {
        ajax = window.ajax;

        url = 'valid url';
        success = sinon.spy();
        error = sinon.spy();
    });

    afterEach(function () {
        xhr.restore();
    });

    it('should make GET request', function () {
        ajax(url);
        requests[0].method.should.equal('GET');
    });

    it('should make GET request with provided url', function () {
        ajax(url);
        requests[0].url.should.equal(url);
    });

    it('should call success callback with response', function () {
        ajax(url, success);
        requests[0].respond(200, {}, '[]');
        success.should.have.been.calledWith('[]');
    });

    it('should call error callback with response', function () {
        ajax(url, success, error);
        requests[0].respond(500, {}, 'Error occured');
        error.should.have.been.calledWith('Error occured');
    });

    it('should parse response if Content-Type: application/json', function () {
        ajax(url, success);
        requests[0].respond(200, {'Content-Type': 'application/json'}, '[]');
        success.should.have.been.calledWith([]);
    });

});
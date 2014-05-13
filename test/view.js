// @render
// should render template to @el
// should exec callback on finish render

describe('View', function () {
    'use strict';
    var view, callback;

    beforeEach(function () {

        view = new window.LMN.View({
            template: '<ul></ul>'
        });

        callback = sinon.spy();
    });

    describe('@render', function () {
        it('should render template', function () {
            view.render();
            view.el.tagName.should.equal('UL');
        });

        it('should exec callback', function () {
            view.render(callback);
            callback.should.have.been.calledWith(view.el);
        });
    });

});
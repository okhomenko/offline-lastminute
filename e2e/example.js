describe('Lastminute hotelpage', function () {
    'use strict';

    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });

    function open() {
        browser.get('http://localhost:8080');
    }

    it('should contain valid title', function () {
        open();
        expect(browser.getTitle()).toEqual('Lastminute hotels');
    });

    describe('open first time', function () {
        var hotelsList;

        beforeEach(function () {
            open();
            hotelsList = element.all(by.css('.lmn-hotels ul li'));
        });

        it('should contain list of hotels', function () {
            expect(hotelsList.count()).toEqual(4);
        });

        it('should show first hotel in description', function () {
            var descName = element(by.css('.lmn-description-view .name'));
            expect(descName.getText()).toEqual(hotelsList.get(0).getText());
        });


    });

    describe('click', function () {
        var hotelsList;

        function getDescProp(prop) {
            return element(by.css('.lmn-description-view .' + prop));
        }

        beforeEach(function () {
            open();
            hotelsList = element.all(by.css('.lmn-hotels ul li'));
        });

        it('should update name', function () {
            hotelsList.get(1).click();
            expect(getDescProp('name').getText()).toEqual(hotelsList.get(1).getText());
        });

        it('should make item list active', function () {
            hotelsList.get(2).click();
            expect(hotelsList.get(2).getAttribute('className')).toContain('active');
        });

    });
});

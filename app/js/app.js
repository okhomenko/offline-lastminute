(function (LMN) {
    'use strict';

    var hotelsEl = document.querySelector('.lmn-view');

    var hotels = new LMN.Collection({
        url: 'data/hotels.json'
    });

    var listView = new LMN.Views.ListView();

    listView.render(function (el) {
        hotelsEl.appendChild(el);
    });

    hotels.fetch(function (data) {
        var hotels = data.hotels;
        hotels.forEach(function (hotel) {
            var view = new LMN.Views.ItemView({ model: hotel });
            view.render(function (el) {
                listView.ul.appendChild(el);
            });

        });
    });

}(window.LMN));

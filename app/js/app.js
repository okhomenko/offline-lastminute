(function (global, LMN) {
    'use strict';

    var hotelsEl = document.querySelector('.lmn-view');

    var hotels = new LMN.Collection({
        url: 'data/hotels.json'
    });

    var listView = new LMN.Views.ListView({
        collection: hotels,
        autoFetch: true,
        SubView: LMN.Views.ItemView,
        DescriptionView: LMN.Views.DescriptionView,
        descriptionEl: document.querySelector('.lmn-description-view')
    });

    listView.render(function (el) {
        hotelsEl.appendChild(el);
        el.view.bindAll();
    });

    global.app = {

    };

    global.app.views = {
        hotelsView: listView
    };

}(window, window.LMN));

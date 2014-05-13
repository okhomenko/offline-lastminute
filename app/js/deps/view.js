(function (LMN) {
    'use strict';

    var extend = LMN.extend;

    function noop() {}

    function View() {}

    View.prototype.render = function (cb) {
        var container = document.createElement('div');

        container.innerHTML = this.template;
        this.el = container.firstChild;

        (cb || noop)(this.el);

        return this;
    };

    var ListView = extend(View, {
        template: '<ul></ul>',

        initialize: function (opts) {
            opts = opts || {};
            this.collection = opts.collection;
            this.autoFetch = opts.autoFetch;
            this.SubView = opts.SubView || View;
            this.DescriptionView = opts.DescriptionView || View;
            this.descriptionEl = opts.descriptionEl;
        },

        render: function (cb) {
            this.__super__.render.call(this);

            if (this.autoFetch) this.populate();

            this.el.view = this;
            cb(this.el);
        },

        populateOne: function (model) {
            var _this = this;
            var view = new this.SubView({ model: model });
            view.render(function (el) {
                _this.el.appendChild(el);
            });
        },

        populate: function () {
            var _this = this;
            // fetch and populate on success
            this.collection.fetch(function (data) {
                // clear list only on success, if fail keep previous view
                _this.el.innerHTML = '';

                var hotels = data.hotels;
                hotels.forEach(_this.populateOne.bind(_this));
            });
        },

        renderDescription: function(model) {
            var _this = this;
            var view = new this.DescriptionView({ model: model });

            view.render(function (el) {
                _this.descriptionEl.innerHTML = '';
                _this.descriptionEl.appendChild(el);
            });
        },

        bindAll: function () {
            var _this = this;
            this.el.addEventListener('click', function (e) {
                var view;
                if (e.target.nodeName === 'LI') {
                    view = e.target.view;
                    _this.renderDescription(view.model);
                }
            });
        }
    });

    var ItemView = extend(View, {
        template: '<li></li>',

        initialize: function (opts) {
            opts = opts || {};
            this.model = opts.model;
            this.model.view = this;
        },

        render: function (cb) {
            this.__super__.render.call(this);

            this.el.view = this;

            this.populate(this.model);

            cb(this.el);

            return this;
        },

        populate: function (model) {
            this.el.innerText = model.name;

            return this;
        }

    });

    var DescriptionView = extend(View, {
        template: ['<div>',
          '<span class=name></span>',
          '<span class=rating></span>',
          '<span class=price></span>',
          '<img class=imgUrl />',
        '</div>'].join(''),

        initialize: function (opts) {
            opts = opts || {};
            this.model = opts.model;
        },

        render: function (cb) {
            this.__super__.render.call(this);
            this.name = this.el.querySelector('.name');
            this.rating = this.el.querySelector('.rating');
            this.price = this.el.querySelector('.price');
            this.imgUrl = this.el.querySelector('.imgUrl');

            this.populate();

            cb(this.el);
        },

        populate: function () {
            this.name.innerText = this.model.name;
            this.rating.innerText = this.model.rating;
            this.price.innerText = this.model.price;
            this.imgUrl.src = this.model.imgUrl;
        }
    });

    LMN.Views = {
        BaseView: View,
        ListView: ListView,
        ItemView: ItemView,
        DescriptionView: DescriptionView
    };

}(window.LMN));

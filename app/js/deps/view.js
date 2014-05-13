(function (LMN) {
    'use strict';

    var extend = LMN.extend;

    function noop() {}

    var View = extend({}, {
        initialize: function (opts) {
            opts = opts || {};

            for (var opt in opts) {
                if (opts.hasOwnProperty(opt)) this[opt] = opts[opt];
            }

            return this;
        },
        render: function (cb) {
            var container = document.createElement('div');

            container.innerHTML = this.template;
            this.el = container.firstChild;

            (cb || noop)(this.el);

            return this;
        }
    });

    var ListView = extend(View, {
        template: '<ul class=list></ul>',

        initialize: function (opts) {
            opts = opts || {};
            this.collection = opts.collection;
            this.autoFetch = opts.autoFetch;
            this.SubView = opts.SubView || View;
            this.DescriptionView = opts.DescriptionView || View;
            this.descriptionEl = opts.descriptionEl;
        },

        render: function (cb) {
            var _this = this;
            this.__super__.render.call(this);

            if (this.autoFetch) {
                this.populate(function () {
                    if (_this._subviews.length) {
                        _this.activate(_this._subviews[0]);
                    }
                });
            }

            _this.el.view = _this;
            (cb || noop)(_this.el);
        },

        populateOne: function (model) {
            var _this = this, view;

            view = new this.SubView({ model: model });
            view.render(function (el) {
                _this.el.appendChild(el);
            });

            this._subviews.push(view);
        },

        populate: function (cb) {
            var _this = this;
            // fetch and populate on success
            this.collection.fetch(function (data) {
                // clear list only on success, if fail keep previous view
                _this.el.innerHTML = '';
                _this._subviews = [];

                var hotels = data.hotels;
                hotels.forEach(_this.populateOne.bind(_this));
                (cb || noop)();
            });
        },

        renderDescription: function (model) {
            var _this = this, view;

            view = new this.DescriptionView({ model: model });

            view.render(function (el) {
                _this.descriptionEl.innerHTML = '';
                _this.descriptionEl.appendChild(el);
            });
        },

        deactivate: function () {
            var active = this.el.querySelector('.active');
            if (active) active.classList.remove('active');
        },

        activate: function (subview) {
            if (typeof subview === 'number') subview = this._subviews[subview];
            this.deactivate();
            subview.el.classList.add('active');
            this.renderDescription(subview.model);
        },

        bindAll: function () {
            var _this = this;
            this.el.addEventListener('click', function (e) {
                var view;
                if (e.target.nodeName === 'LI') {
                    view = e.target.view;
                    _this.activate(view);
                }
            });
        }
    });

    var ItemView = extend(View, {
        template: '<li class=item></li>',

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
        template: ['<div class=description-view>',
          '<div class="col2 col1-mob">',
              '<img class=imgUrl />',
          '</div>',
          '<div class="col8 col3-mob">',
              '<span class=name></span>',
              '<span class=rating></span>',
              '<div class=price-container>',
                  '<span class=price></span>',
                  '<span class=price-info>Total hotel stay</span>',
              '</div>',
          '</div>',
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
            this.rating.classList.add('star' + this.model.rating);
            this.price.innerText = parseFloat(this.model.price).toFixed(2);
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

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
        template: ['<div>',
            '<ul></ul>',
        '</div>'].join(''),

        initialize: function (opts) {
            opts = opts || {};
            this.model = opts.model;
        },

        render: function (cb) {
            this.__super__.render.call(this);

            this.ul = this.el.querySelector('ul');
            cb(this.ul);
        }
    });

    var ItemView = extend(View, {
        template: ['<li>',
          '<span class=name></span>',
          '<span class=rating></span>',
          '<span class=price></span>',
          '<img class=imgUrl />',
        '</li>'].join(''),

        initialize: function (opts) {
            this.model = opts.model;
        },

        render: function (cb) {
            this.__super__.render.call(this);

            this.name = this.el.querySelector('.name');
            this.rating = this.el.querySelector('.rating');
            this.price = this.el.querySelector('.price');
            this.imgUrl = this.el.querySelector('.imgUrl');

            this.populate(this.model);

            cb(this.el);

            return this;
        },

        populate: function (model) {
            this.name.innerText = model.name;
            this.rating.innerText = model.rating;
            this.price.innerText = model.price;
            this.imgUrl.src = model.imgUrl;

            return this;
        }
    });

    LMN.Views = {
        BaseView: View,
        ListView: ListView,
        ItemView: ItemView
    };

}(window.LMN));

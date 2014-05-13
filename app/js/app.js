(function (global, LMN) {
    'use strict';

    var hotels, hotelsEl, descEl, getDescTmplDOM;

    hotelsEl = document.querySelector('.lmn-hotels');
    descEl = document.querySelector('.lmn-description-view');

    function fetch() {
        LMN.ajax('data/hotels.json', populateHotels);
    }

    function populateHotels(data) {
        hotels = data.hotels;

        var list = renderHotels(hotels);
        hotelsEl.innerHTML = '';
        hotelsEl.appendChild(list);
        bind(list);

        // activate by default first hotel
        activateHotel(0);
    }

    function renderHotels(hotels) {
        var list = document.createElement('ul'), fragment;
        list.className = 'list';

        fragment = document.createDocumentFragment();
        hotels.map(renderHotel).forEach(function (item) {
            fragment.appendChild(item);
        });

        list.appendChild(fragment);

        return list;
    }

    function renderHotel(hotel, index) {
        var item = document.createElement('li');
        item.className = 'item';

        item.innerText = hotel.name;
        item.setAttribute('data-index', index);

        return item;
    }


    getDescTmplDOM = (function () {
        // cache
        var descTmpl, descTmplDOM;

        return function () {
            if (!descTmplDOM) {
                descTmpl = descTmpl ||
                    document.querySelector('#description-template').innerText;

                descTmplDOM = document.createElement('div');
                descTmplDOM.innerHTML = descTmpl;
            }

            // do not need .cloneNode() as we always work with the same instance
            return descTmplDOM;
        };
    }());

    function renderDescription(index) {
        var container, hotel;

        container = getDescTmplDOM();
        hotel = hotels[index];

        container.querySelector('.name').innerText = hotel.name;
        container.querySelector('.rating').classList.add('star' + hotel.rating);
        container.querySelector('.price').innerText = parseFloat(hotel.price).toFixed(2);
        container.querySelector('.imgUrl').src = hotel.imgUrl;

        descEl.innerHTML = container.innerHTML;
    }

    function bind(list) {
        list.addEventListener('click', function (e) {
            if (e.target && e.target.nodeName === 'LI') {
                activateHotel(e.target);
            }
        });
    }

    function addActiveClass(item) {
        var active = hotelsEl.querySelector('.active');

        if (active) {
            active.classList.remove('active');
        }

        item.classList.add('active');
    }

    function activateHotel(item) {
        var index;

        if (typeof item === 'number') {
            index = item;
            item = hotelsEl.querySelectorAll('.item')[index];
        } else {
            index = parseInt(item.getAttribute('data-index'), 10);
        }

        addActiveClass(item);
        renderDescription(index);
    }

    fetch();

}(window, window.LMN));

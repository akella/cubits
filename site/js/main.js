(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// require('slick-carousel');
var Slider = require('./modules/press-slider.js');
var Tabs   = require('./modules/tabs.js');

$(document).ready(function() {

    var slider      = $('.press-slider'),
        contactTabs = $('.js-contacts');
        tabs        = $('.js-tabs');
        tooltip     = $('.js-tooltip');


    // press slider on main page
    if ( slider.length ) slider = new Slider(slider);


    // tabs
    if ( tabs.length ) {
        tabs.each(function(index, el) {
            new Tabs(el, '.tab__btn', '.tab-content');
        });
    }
    if ( contactTabs.length ) {
        contactTabs = new Tabs(contactTabs, '.office', '.tab-content');
    }


    // tooltip
    if ( tooltip ) {
        tooltip.tooltipster({
            animation: 'fade',
            position: 'bottom',
            speed: 300,
            delay: 300,
            offsetX: 0,
            offsetY: 20,
            maxWidth: 480,
            interactive: true,
            trigger: 'hover',
            functionInit: function() {
                var content = this.find('.member__about');
                return content;
            }
        });
    }
});
},{"./modules/press-slider.js":2,"./modules/tabs.js":3}],2:[function(require,module,exports){
// require('slick-carousel');

function Slider(selector) {
    this.wrapper           = selector instanceof jQuery ? selector : $(selector);
    this.slider            = this.wrapper.find('.press-slider__slides');
    this.arrow             = this.wrapper.find('.press-slider__arrow');
    this.navButton         = this.wrapper.find('.press-slider__btn');
    this.activeClass       = 'is-active';
    this.currentSlideIndex = 0;
    this.positions         = [];
    this.init();
}


Slider.prototype._initEvents = function() {
    var _ = this;

    _.navButton.on('click', function(e) {
        e.preventDefault();
        var index = $(this).index();
        _.slider.slick('slickGoTo', index);
    });

    _.slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        _.currentSlideIndex = nextSlide;
        _._updateButtons(currentSlide);
        _._updateArrowPos();
    });

    $(window).on('resize', function() {
        _._updatePositions();
        _._updateArrowPos();
    });
};


Slider.prototype._updateArrowPos = function() {
    var _   = this,
        btn = $(_.navButton[_.currentSlideIndex]),
        pos = _.positions[_.currentSlideIndex];

    _.arrow.css('left', pos);
};


Slider.prototype._updateButtons = function(index) {
    var _ = this;

    if ( typeof index == 'number' && index >= 0 ) {
        $(_.navButton[index]).removeClass(_.activeClass);
    }
    else {
        _.navButton.removeClass(_.activeClass);
    }

    $(_.navButton[_.currentSlideIndex]).addClass(_.activeClass);
};


Slider.prototype._updatePositions = function() {
    var _ = this;

    _.positions = [];

    _.navButton.each(function(index, el) {
        var btn = $(el),
            pos = Math.ceil(btn.position().left + btn.outerWidth() / 2);

        _.positions.push(pos);
    });
};


Slider.prototype.init = function() {
    var _ = this;

    _._initEvents();
    _._updatePositions();
    _._updateButtons();
    _._updateArrowPos();

    _.slider.slick({
        accessibility: false,
        autoplay: true,
        // fade: true,
        // speed: 300,
        arrows: false,
        dots: false,
        autoplaySpeed: 10000,
        slide: '.press-slider__slide'
    });
};

module.exports = Slider;
},{}],3:[function(require,module,exports){
function Tabs(wrapper, tab, content) {
    this.tabs = $(wrapper).find(tab || '.js-tab');
    this.content = $(wrapper).find(content || '.js-tab-content');
    this.activeClass = 'is-active';
    this.activeTabIndex = 0;

    this._init();
}

Tabs.prototype._initEvents = function() {
    var _ = this;

    _.tabs.each(function(index, el) {
        $(this).on('click', function(e) {
            e.preventDefault();
            _.changeContent(index);
        });
    });
};

Tabs.prototype._init = function() {
    var _ = this;

    _.tabs.each(function(index, el) {
        if ( $(el).hasClass(_.activeClass) ) _.activeTabIndex = index;
    });
    _._initEvents();
};

Tabs.prototype.changeContent = function(index) {
    var _ = this;

    $( _.tabs[_.activeTabIndex] ).removeClass(_.activeClass);
    $( _.tabs[index] ).addClass(_.activeClass);
    $( _.content[_.activeTabIndex] )
        .removeClass(_.activeClass);
        // .hide();
    $( _.content[index] )
        // .show()
        .addClass(_.activeClass);

    _.activeTabIndex = index;
};

module.exports = Tabs;
},{}]},{},[1])


//# sourceMappingURL=main.js.map
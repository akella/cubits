(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Slider             = require('./modules/press-slider.js');
var Tabs               = require('./modules/tabs.js');
var PhoneSlider        = require('./modules/phone-slider.js');
var TestimonialsSlider = require('./modules/testimonials-slider.js');

$(document).ready(function() {

    var slider          = $('.press-slider'),
        contactTabs     = $('.js-contacts'),
        tabs            = $('.js-tabs'),
        tooltip         = $('.js-tooltip'),
        interfaceSlider = $('.interface-slider'),
        testimonials    = $('.js-testimonials'),
        breakpoint      = 751,
        win             = $(window),
        winWidth        = win.width();


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


    // slider in iphone on main page
    if ( interfaceSlider.length && winWidth <= breakpoint ) {
        interfaceSlider = new PhoneSlider(interfaceSlider);
    }

    if ( testimonials.length && winWidth <= breakpoint ) {
        testimonials = new TestimonialsSlider(testimonials);
    }

    win.on('resize', function() {
        winWidth = win.width();

        if ( winWidth <= breakpoint ) {

            if ( interfaceSlider.length && !interfaceSlider.active ) {
                interfaceSlider = new PhoneSlider(interfaceSlider);
            }

            if ( testimonials.active === false ) {
                testimonials.init();
            } else if ( testimonials.length ) {
                testimonials = new TestimonialsSlider(testimonials);
            }
        }
        else {

            if ( testimonials.active ) {
                testimonials.destroy();
            }
        }
    });


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
},{"./modules/phone-slider.js":2,"./modules/press-slider.js":3,"./modules/tabs.js":4,"./modules/testimonials-slider.js":5}],2:[function(require,module,exports){
function PhoneSlider(element, breakpoint) {
    this.wrapper    = element instanceof jQuery ? element : $(element);
    this.phone      = this.wrapper.find('.interface-slider__screenshots');
    this.text       = this.wrapper.find('.interface-slider__text');
    this.prevArrow  = this.wrapper.find('.interface-slider__prev');
    this.nextArrow  = this.wrapper.find('.interface-slider__next');
    this.active     = false;

    this.init();
    return this;
}

PhoneSlider.prototype.init = function() {
    var _ = this;
    if ( _.active ) return;

    _.phone.slick({
        autoplay: false,
        arrows: false,
        asNavFor: _.text
    });
    _.text.slick({
        asNavFor: _.phone,
        arrows: true,
        fade: true,
        autoplay: false,
        prevArrow: _.prevArrow,
        nextArrow: _.nextArrow,
    });

    _.active = true;
};

module.exports = PhoneSlider;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
function TestimonialsSlider(element) {
    this.wrapper = element instanceof jQuery ? element : $(element);
    this.active = false;
    this.init();
    return this;
}

TestimonialsSlider.prototype.init = function() {
    var _ = this;

    if ( _.active ) return;

    this.wrapper.slick({
        arrows: true,
        autoplay: false,
        prevArrow: '<button type="button" class="icon icon-prev"></button>',
        nextArrow: '<button type="button" class="icon icon-next"></button>',
    });
    _.active = true;
};

TestimonialsSlider.prototype.destroy = function() {
    var _ = this;

    if ( !_.active ) return;

    _.wrapper.slick('unslick');
    _.active = false;
};

module.exports = TestimonialsSlider;
},{}]},{},[1])


//# sourceMappingURL=main.js.map
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
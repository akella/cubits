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
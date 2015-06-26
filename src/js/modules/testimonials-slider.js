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
var Slider             = require('./modules/press-slider.js');
var Tabs               = require('./modules/tabs.js');
var PhoneSlider        = require('./modules/phone-slider.js');
var TestimonialsSlider = require('./modules/testimonials-slider.js');
var Filter             = require('./modules/filter.js');

$(document).ready(function() {

  var slider          = $('.press-slider');
  var contactTabs     = $('.js-contacts');
  var tabs            = $('.js-tabs');
  var tooltip         = $('.js-tooltip');
  var interfaceSlider = $('.interface-slider');
  var testimonials    = $('.js-testimonials');
  var jobs            = $('.jobs-tiles');
  var breakpoint      = 751;
  var win             = $(window);
  var winWidth        = win.width();

  // press slider on main page
  if (slider.length) {
    slider = new Slider(slider);
  }

  // tabs
  if (tabs.length) {
    tabs.each(function(index, el) {
      new Tabs(el, '.tab__btn', '.tab-content');
    });
  }

  if (contactTabs.length) {
    contactTabs = new Tabs(contactTabs, '.office', '.tab-content');
  }

  // filtering jobs
  if (jobs.length) {
    jobs = new Filter(jobs, '.office', {
      itemSelector: '.jobs-tiles__item'
    });
  }

  // slider in iphone on main page
  if (interfaceSlider.length && winWidth <= breakpoint) {
    interfaceSlider = new PhoneSlider(interfaceSlider);
  }

  if (testimonials.length && winWidth <= breakpoint) {
    testimonials = new TestimonialsSlider(testimonials);
  }

  win.on('resize', function() {
    winWidth = win.width();

    if (winWidth <= breakpoint) {

      if (interfaceSlider.length && !interfaceSlider.active) {
        interfaceSlider = new PhoneSlider(interfaceSlider);
      }

      if (testimonials.active === false) {
        testimonials.init();
      } else if (testimonials.length) {
        testimonials = new TestimonialsSlider(testimonials);
      }
    } else {

      if (testimonials.active) {
        testimonials.destroy();
      }
    }
  });

  // tooltip
  if (tooltip) {
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

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
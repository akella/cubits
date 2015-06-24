global.$ = global.jQuery = require('jquery');
// require('modernizr');
var Slider = require('./modules/press-slider.js');
var Tabs   = require('./modules/tabs.js');

$(document).ready(function() {

    var slider = $('.press-slider'),
        contactTabs = $('.js-contacts');
        tabs   = $('.js-tabs');

    if ( slider.length ) slider = new Slider(slider);

    if ( tabs.length ) {
        tabs.each(function(index, el) {
            new Tabs(el, '.tab__btn', '.tab-content');
        });
    }
    if ( contactTabs.length ) {
        contactTabs = new Tabs(contactTabs, '.office', '.tab-content');
    }
});
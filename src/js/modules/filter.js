function Filter(element, filterBtnSelector, props) {
  this.wrapper     = element instanceof jQuery ? element : $(element);
  this.filterBtn   = $(filterBtnSelector);
  this.activeClass = 'is-active';
  this.props       = props || {};

  this.init();
}

Filter.prototype._initEvents = function() {
  var _ = this;

  _.filterBtn.on('click', function(e) {
    e.preventDefault();
    var btn = $(this);
    var group = btn.data('group');
    _.wrapper.shuffle('shuffle', group);
    _.filterBtn.removeClass(_.activeClass);
    btn.addClass(_.activeClass);
  });
};

Filter.prototype.init = function(argument) {
  var _        = this;
  var defaults = {
    speed: 350,
    easing: 'ease-out',
    itemSelector: '',
    gutterWidth: 0,
    columnWidth: 0
  };

  $.extend(defaults, _.props);

  _._initEvents();
  _.wrapper.shuffle(defaults);
};

module.exports = Filter;

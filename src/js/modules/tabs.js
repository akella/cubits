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
    if ($(el).hasClass(_.activeClass)) _.activeTabIndex = index;
  });
  _._initEvents();
};

Tabs.prototype.changeContent = function(index) {
  var _ = this;

  $(_.tabs[_.activeTabIndex]).removeClass(_.activeClass);
  $(_.tabs[index]).addClass(_.activeClass);
  $(_.content[_.activeTabIndex])
      .removeClass(_.activeClass);

  // .hide();
  $(_.content[index])

      // .show()
      .addClass(_.activeClass);

  _.activeTabIndex = index;
};

module.exports = Tabs;

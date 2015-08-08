var i18n = EMO.i18n;

Template.main_tabs.helpers({
  title: function () {
    return {
      capture: i18n.t('capture'),
      results: i18n.t('results')
    };
  }
});

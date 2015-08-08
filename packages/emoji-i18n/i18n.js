var i18n = EMO.i18n;

i18n.t = function (str, options) {
  return TAPi18n.__(str, options);
};

i18n.getLanguage = function () {
  return TAPi18n.getLanguage();
};

i18n.setLanguage = function () {
  lang.set(language);
};

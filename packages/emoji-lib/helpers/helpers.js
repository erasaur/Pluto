var helpers = EMO.helpers;
var utils = EMO.utils;

helpers.getSetting = function (setting) {
  return utils.get(Meteor, 'settings.' + setting);
};

helpers.log = (function () {
  var noop = function () {};
  return helpers.getSetting('public.DEBUG') ? console.log.bind(console) : noop;
})();

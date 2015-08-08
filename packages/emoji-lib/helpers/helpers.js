var helpers = EMO.helpers;
var utils = EMO.utils;

helpers.getSetting = function (setting) {
  return utils.get(Meteor, 'settings.' + setting);
};

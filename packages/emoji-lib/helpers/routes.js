var utils = EMO.utils;
var routes = EMO.helpers.routes = {};

routes.controller = function () {
  return Router && Router.current();
};

routes.params = function (keys) {
  var controller = routes.controller();
  var params = controller && controller.params || {};
  return keys ? _.pick(params, keys) : params;
};

routes.query = function (key) {
  var params = routes.params();
  return key ? utils.get(params, 'query.' + key) : params;
};

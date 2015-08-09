var helpers = EMO.helpers;
var routes = helpers.routes;
var storage = helpers.storage;
var log = helpers.log;

Template.results.onCreated(function () {
  var self = this;
  self._results = new ReactiveVar();

  var original = routes.query('original');
  var unicode = routes.query('unicode');
  var fail = routes.query('fail');

  console.log(original, unicode);

  if (original) {
    unicode = decodeURIComponent(unicode);

    var newResult = {
      original: original
    };

    // if (result[0] === '\\') {
    if (!fail) {
      newResult.emoji = unicode;
      self._results.set(newResult);

      // save to local persistent storage
      storage.add(newResult);
    }
    else {
      log('emoji translation failed bro. use gtranslate using language: ' + Session.get('preferred_language'));

      // TODO: translate with google translate
      self._results.set(newResult);
    }
  }
});

Template.results.onRendered(function() {
    function hey () {
      $('.sun')
        .animate( { 'borderColor': "5px solid #fff" }, 2000)
        .animate( { 'borderColor': "5px solid transparent" }, 2000, hey);
    }
    hey(); 
});

Template.results.helpers({
  results: function () {
    var template = Template.instance();
    return template._results.get();
  },
  past_results: function () {
    return storage.get();
  }
});

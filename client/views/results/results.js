var helpers = EMO.helpers;
var routes = helpers.routes;
var storage = helpers.storage;
var log = helpers.log;

Template.results.onCreated(function () {
  var self = this;
  self._loading = new ReactiveVar(false);
  self._results = new ReactiveVar();

  var text = decodeURIComponent(routes.query('text'));

  console.log(text);

  if (text) {
    self._loading.set(true);

    Meteor.call('textToUni', text, function (error, result) {
      var newResult = {
        original: text
      };

      if (error) {
        showError();
      } else {
        if (result[0] === '\\') {
          newResult.emoji = result;
          self._results.set(newResult);

          // save to local persistent storage
          storage.set(newResult);
        }
        else {
          log('emoji translation failed bro. use gtranslate using language: ' + Session.get('preferred_language'));

          // TODO: translate with google translate
          self._results.set(newResult);
        }

        self._loading.set(false);
      }
    });
  }
});

Template.results.helpers({
  loadingResults: function () {
    var template = Template.instance();
    return template._loading.get();
  },
  results: function () {
    var template = Template.instance();
    return template._results.get();
  },
  past_results: function () {
    return storage.get();
  }
});

if (Meteor.isCordova) {
  var log = EMO.helpers.log;

  Meteor.startup(function () {
    navigator.globalization.getPreferredLanguage(
      function (language) {
        Session.set('preferred_language', language.value);
      },
      function () {
        log('Error getting language!!!1');
      }
    );
  });
};

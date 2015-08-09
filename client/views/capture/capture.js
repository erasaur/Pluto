var log = EMO.helpers.log;

Template.capture.onCreated(function () {
  this._loading = new ReactiveVar();
});

Template.capture.helpers({
  loadingResults: function () {
    var template = Template.instance();
    return template._loading.get();
  }
});

Template.capture.events({
  'click #js-capture': function (event, template) {
    function showError () {
      IonPopup.alert({
        title: 'Error',
        template: 'There was an error processing the audio',
        okText: 'Ok'
      });
    }

    function captureSuccess (mediaFiles) {
      template._loading.set(true);

      Meteor.call('audioToText', mediaFiles, function (error, text) {
        if (error) {
          showError();
        } else {
          Meteor.call('textToUnicode', text, function (error, result) {
            if (error) {
              showError();
            } else {
              console.log(result.unicodeString);
              console.log(encodeURIComponent(result.unicodeString));

              var query = 'original=' + encodeURIComponent(text) +
                          '&unicode=' + encodeURIComponent(result.unicodeString);

              if (result.fail) {
                query += '&fail=1';
              }

              Router.go('results', {}, { query: query });
            }
            template._loading.set(false);
          });
        }
      });
    }

    function captureError (error) {
      showError();
    }

    navigator.device.capture.captureAudio(captureSuccess, captureError, { duration: 10 });
  }
});

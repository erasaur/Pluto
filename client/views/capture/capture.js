var log = EMO.helpers.log;

Template.capture.onCreated(function () {
  this.results = new ReactiveVar();
});

Template.capture.helpers({
  results: function () {
    var template = Template.instance();
    return template.results.get();
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
      Meteor.call('audioToText', mediaFiles, function (error, result) {
        if (error) {
          showError();
        } else {
          Router.go('results', { query: 'text=' + encodeURIComponent(result) });
        }
      });
    }

    function captureError (error) {
      showError();
    }

    navigator.device.capture.captureAudio(captureSuccess, captureError, { duration: 10 });
  }
});

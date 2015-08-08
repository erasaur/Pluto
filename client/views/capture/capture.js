var helpers = EMO.helpers;
var Speech = Meteor.npmRequire('google-speech-api');

Template.capture.events({
  'click #js-capture': function (event, template) {
    function captureSuccess (mediaFiles) {
      Meteor.call('audioToText', mediaFiles, function (error, result) {
        if (error) {
          IonPopup.alert('Error', 'There was an error processing the audio', 'Ok');
        } else {
          Router.go('results');
        }
      });
    }

    function captureError (error) {
      IonPopup.alert('Error', 'There was an error processing the audio', 'Ok');
    }

    navigator.device.capture.captureAudio(captureSuccess, captureError, { duration: 10 });
  }
});

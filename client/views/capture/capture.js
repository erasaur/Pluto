Template.capture.events({
  'click #js-capture': function (event, template) {
    function captureSuccess (mediaFiles) {
      Meteor.call('audioToText', mediaFiles, function (error, result) {
        if (error) {
          IonPopup.alert({
            title: 'Error',
            template: 'There was an error processing the audio',
            okText: 'Ok'
          });
        } else {
          console.log(result);
          Router.go('results');
        }
      });
    }

    function captureError (error) {
      IonPopup.alert({
        title: 'Error',
        template: 'There was an error processing the audio',
        okText: 'Ok'
      });
    }

    navigator.device.capture.captureAudio(captureSuccess, captureError, { duration: 10 });
  }
});

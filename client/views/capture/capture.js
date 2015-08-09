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
          var words = Meteor.call('textToUni', result);
          if words[0]=='\\' {
            //set the CSS Content
          }
          else {
            //do translation
          }

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
    navigator.globalization.getPreferredLanguage(
        function (language) {alert('language: ' + language.value + '\n');},
        function () {alert('Error getting language\n');}
    );
  }
});

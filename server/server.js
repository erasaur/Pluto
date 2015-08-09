var helpers = EMO.helpers;
var utils = EMO.utils;
var Speech = Meteor.npmRequire('google-speech-api');
var Future = Meteor.npmRequire('fibers/future');

var dict = {};

Meteor.startup(function() {
  dict = JSON.parse(Assets.getText('emoji_processed.json'));
});

Meteor.methods({
  'audioToText': function (files) {
    check(files, [Object]);

    var opts = {
      clipSize: 10,
      file: files[0].fullPath,
      filetype: 'wav',
      key: helpers.getSetting('GOOGLE_API_KEY')
    };

    var future = new Future();

    Speech(opts, function (err, results) {
      console.log(err, results);

      // results = [ { result: [ { alternative: [Object], final: true } ], result_index: 0 } ]

      results = utils.get(results[0], 'result[0]alternative'); //  [ { transcript: 'chicken noodle soup', confidence: 0.9806636 }, ... ]

      console.log(results[0].transcript);

      future.return(results[0].transcript); // 'chicken noodle soup'

      // console.log(results[results.result_index]);
      // console.log(results[0].result[0].alternative);
    });
    return future.wait();
  },
  //Converts valid text to emoji
  'textToUni': function (textString) {
    var textArray = "I RODE A CAR TODAY".toUpperCase().split(" ");
    var returnContent = "";
    //var ucodes = []
    textArray.forEach(function(i){
      i = i.trim();
      if (typeof dict[i] !== 'undefined') {
        returnString += "\\" +dict[i] + " ";
      }
    });
    if (returnContent) {
      return returnContent;
    }
    else {
      return textString;
    }
  }
});

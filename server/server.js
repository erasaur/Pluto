var helpers = EMO.helpers;
var utils = EMO.utils;
var Speech = Meteor.npmRequire('google-speech-api');

Meteor.methods({
  'audioToText': function (files) {
    check(files, [Object]);

    var opts = {
      clipSize: 10,
      file: files[0].fullPath,
      filetype: 'wav',
      key: helpers.getSetting('GOOGLE_API_KEY')
    };

    Speech(opts, function (err, results) {
      console.log(err, results);

      // results = [ { result: [ { alternative: [Object], final: true } ], result_index: 0 } ]

      results = utils.get(results[0], 'result[0]alternative'); //  [ { transcript: 'chicken noodle soup', confidence: 0.9806636 }, ... ]
      console.log(results[0].transcript); // 'chicken noodle soup'

      // console.log(results[results.result_index]);
      // console.log(results[0].result[0].alternative);
    });
  }
});

var helpers = EMO.helpers;
var utils = EMO.utils;
var Speech = Meteor.npmRequire('google-speech-api');
var Future = Meteor.npmRequire('fibers/future');

var dict = {};

Meteor.startup(function() {
  dict = JSON.parse(Assets.getText('emoji_processed.json'));
});

Meteor.methods({
  audioToText: function (files) {
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
  // converts valid text to emoji
  textToUnicode: function (textString) {
    check(textString, String);

    if (_.contains(textString, 'meteor')) {
      result = '&#x1F46B; &#x2764; &#x1F320;';
      return {
        unicodeString: result || textString, // return original string if no emoji's match
        fail: fail // fail if ALL words have no matching emoji
      };
    }

    var wordArray = textString.toUpperCase().split(' ');
    var result = '';
    var upper = '';
    var fail = true;

    var blacklist = ['the', 'a', 'one', 'some', 'few', 'in', 'for', 'of', 'with', 'by', 'at', 'as'];

    wordArray.forEach(function (word) {
      if (_.contains(blacklist, word)) {
        result += word + ' ';
        return;
      }

      word = word.replace(/\s/g, '');
      upper = word.toUpperCase();

      var temp;

      _.each(dict, function (emoji, name) {
        if (upper === name) {
          temp = emoji;
          return false;
        }

        var regex = new RegExp('\\b' + upper + '\\b');

        if (regex.test(name)) {
          temp = emoji;
        }
      });

      if (temp) {
        fail = false;
        //result += '\\' + dict[upper].unified + ' '; // append unicode value to result
        result += '&#x' + temp.unified + ';';
      } else {
        result += word; // append original text
      }
      result += ' ';
    });

    console.log(result || textString);

    return {
      unicodeString: result || textString, // return original string if no emoji's match
      fail: fail // fail if ALL words have no matching emoji
    };
  }
});

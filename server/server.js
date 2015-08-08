Meteor.methods({
  'audioToText': function (files) {
    check(files, [Object]);

    var opts = {
      clipSize: 10,
      file: files[i],
      filetype: 'wav',
      key: helpers.getSetting('GOOGLE_API_KEY')
    };

    speech(opts, function (err, results) {
      console.log(results);
      // [{result: [{alternative: [{transcript: '...'}]}]}]
    });
  }
});

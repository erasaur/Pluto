var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji_pretty.json'));
var dict = {};

var res = arr.map(function (emoji) {
  var values = { image: emoji.image, unified: emoji.unified };

  if (emoji.name) {
    dict[emoji.name] = values;
  }
  emoji.short_names.forEach(function (sn) {
    dict[sn] = values;
  });
});

fs.writeFile('emoji_processed.json', JSON.stringify(dict), function (error) {
  console.log(error);
});

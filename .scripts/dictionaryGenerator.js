var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji_pretty.json'));

var dict = {};

var res = arr.map(function (emoji) {
  var values = [emoji.image, emoji.unified]
  if (emoji.name) {
    if (!dict[emoji.name]) {
      dict[emoji.name] = values;
    }
  }
  emoji.short_names.forEach(function (sn) {
    var keyShortName = emoji.short_name.split("_").join(" ").toUpperCase();
    if (!dict[keyShortName]) {
      dict[keyShortName] = values;
    }
  });
});

fs.writeFile('emoji_processed.json', JSON.stringify(dict), function (error) {
  console.log(error);
});

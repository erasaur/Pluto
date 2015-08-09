var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji_pretty.json'));

var dict = [];

var res = arr.map(function (emoji) {
  var obj = {};
  if (!emoji.name) {
    var keyShortName = emoji.short_name.split("-").join(" ").toUpperCase();
    obj[keyShortName] = emoji.unified;
    dict.push(obj);
  }
  else {
    obj[emoji.name] = emoji.unified;
    dict.push(obj);
  }
});

fs.writeFile('emoji_processed.json', JSON.stringify(dict), function (error) {
  console.log(error);
});

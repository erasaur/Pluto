var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji_pretty.json'));

var dict = [];

var res = arr.map(function (emoji) {
  if (!emoji.name) {
    keyShortName = emoji.short_name.split("-").join(" ").toUpperCase();
    dict.push({
      key: keyShortName,
      value: emoji.unified
    });
  }
  else {
    dict.push({
      key: emoji.name,
      value: emoji.unified
    })
  }
});

fs.writeFile('emoji_processed.json', JSON.stringify(dict), function (error) {
  console.log(error);
});

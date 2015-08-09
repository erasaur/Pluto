var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji_pretty.json'));

var dict = [];

var res = arr.map(function (emoji) {
  values = {
    "unified": emoji.unified,
    "short_name": emoji.short_name,
  },
  dict.push({
    key: emoji.name,
    value: values
  });
});

fs.writeFile('emoji-processed.json', JSON.stringify(dict), function (error) {
  console.log(error);
});

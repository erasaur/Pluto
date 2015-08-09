var fs = require('fs');
// var path = require('path');

var arr = JSON.parse(fs.readFileSync('emoji.json'));

var res = arr.map(function (emoji) {
  return {
    name: emoji.name
  };
});

fs.writeFile('emoji-result.json', JSON.stringify(res), function (error) {
  console.log(error);
});

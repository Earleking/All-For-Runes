var fs = require('fs'), 
request = require('request');

const runes = require("../static/json/runes.json");


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// Thanks Stelar
for(var tree of runes) {
    download(`http://stelar7.no/cdragon/latest/perkstyles/${tree["id"]}.png`, `./static/runes/styles/${tree["id"]}.png`, function(){
    
    });
    for(var slot of tree["slots"]) {
        for(var rune of slot["runes"]) {
            download(`http://stelar7.no/cdragon/latest/perks/${rune["id"]}.png`, `./static/runes/perks/${rune["id"]}.png`, function(){
    
            });
        }
    }
}


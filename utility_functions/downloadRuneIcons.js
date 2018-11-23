var fs = require('fs'), 
request = require('request');

const runes = require("../static/json/runes.json");
const stats = require("../static/json/statShards.json");

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// Thanks Stelar
for(var tree of runes) {
    download(`http://opgg-static.akamaized.net/images/lol/perkStyle/${tree["id"]}.png`, `./static/runes/styles/${tree["id"]}.png`, function(){
    
    });
    for(var slot of tree["slots"]) {
        for(var rune of slot["runes"]) {
            download(`http://opgg-static.akamaized.net/images/lol/perk/${rune["id"]}.png`, `./static/runes/perks/${rune["id"]}.png`, function(){
    
            });
        }
    }
}

for(var slot of stats["slots"]) {
    for(var shard of slot) {
        download(`http://opgg-static.akamaized.net/images/lol/perkShard/${shard}.png`, `./static/runes/stats/${shard}.png`, () => {

        });
    }
}

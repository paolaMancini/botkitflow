//
// Fallback Command
//
//var smartfab = require('./restClient.js');
//var smartfab = require("./events.js");
var request = require("request");

module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {

        var options = { method: 'GET',
             url: 'http://194.79.57.109:8080//SFapi/machines',
         };

        request(options, function (error, response, body) {
         if (error) throw new Error(error);

             console.log(body);
        });

        
        bot.reply(message, "Hello");
             
    });
}

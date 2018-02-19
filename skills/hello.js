//
// Fallback Command
//
//var smartfab = require('./restClient.js');
var smartfab = require("./events.js");
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

        smartfab.machines("fakeMachine0",function (err, events, text) {a
        if (err) {
                 console.log("#### ERROR");
            return;
        }

        if (events.length == 0) {
            console.log('machines lenght: '+events.mahcines.lenght)
            return;
        }
        
        console.log("smartfab.machines.lenght: "+smartfab.machines.lenght);
        //console.log("The date and time are currently: " + dt.myDateTime())       
        bot.reply(message, "Hello");
             
    });
}

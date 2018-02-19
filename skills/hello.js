//
// Fallback Command
//
//var smartfab = require('./restClient.js');
var  = require("./events.js");
module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
        
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

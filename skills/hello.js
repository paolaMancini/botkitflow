//
// Fallback Command
//
var smartfab = require('./restClient.js');

module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
        console.log("smartfab.machines.lenght: "+smartfab.machines.lenght);
        //console.log("The date and time are currently: " + dt.myDateTime())       
        bot.reply(message, "Hello");
             
    });
}

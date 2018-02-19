//
// Fallback Command
//
var smartfab = require('./restClient');

module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
        console.log("smartfab.allData.lenght: "+smartfab.allData.lenght);
        //console.log("The date and time are currently: " + dt.myDateTime())       
        bot.reply(message, "Hello");
             
    });
}

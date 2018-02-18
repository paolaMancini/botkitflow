//
// Fallback Command
//
var dt = require('./restClient');
module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
        console.log("The date and time are currently: " + dt.myDateTime());
        bot.reply(message, "Hello");
             
    });
}

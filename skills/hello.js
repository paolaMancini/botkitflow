//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
             
        bot.reply(message, "Hi there");
        bot.reply(message, "Hello");
             
    });
}

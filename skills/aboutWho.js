//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears(['about|who are you'], 'direct_message,direct_mention', function (bot, message) {
        var mardown = "This is the IndychatBot for ROLD SmartFab, the ready-to-use platform which which allows the SMEs to monitor, analyze and manage data and information coming from production plants."
            + bot.appendMention(message, "help");
            
        bot.reply(message, mardown);
    });
}

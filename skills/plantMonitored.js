module.exports = function(controller) {

    controller.hears(['plant'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         bot.reply(message, "The plants monitored are:<br>**plant1**");
    });


}

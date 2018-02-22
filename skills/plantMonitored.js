module.exports = function(controller) {

    controller.hears(['plants moitored'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         bot.reply(message, "The plants monitored are:<br>**Plant1**");
    });


}

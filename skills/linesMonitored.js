module.exports = function(controller) {

    controller.hears(['machines'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         bot.reply(message, "Monitored machines: <br>**machine0**,**machine1**, **machine2**, **machine3**, **machine4**, **machine5**");
    });


}

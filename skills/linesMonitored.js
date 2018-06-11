module.exports = function(controller) {

    controller.hears(['machines'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         bot.reply(message, "Monitored machines: <br>**machine_0**,**machine_1**, **machine_2**, **machine_3**, **machine_4**, **machine_5**");
    });


}

module.exports = function(controller) {

    controller.hears(['lines'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         bot.reply(message, "Production Lines managed:<br>**machine_1**, **machine_2**, **machine_3**, **machine_4**, **machine_5**, **machine_6**");
    });


}

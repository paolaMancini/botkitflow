module.exports = function(controller) {

    controller.hears([/'hello'|'hi'|'good morning'/], 'message_received', function(bot, message) {

        if (message.user && message.user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }

    });
}
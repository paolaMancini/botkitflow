module.exports = function(controller) {

    controller.hears(['hi', 'hello', 'good morning'], 'message_received', function(bot, message) {

        var message_options = [
            "Hello there!",
            "Hi!"
        ]
        var random_index = Math.floor(Math.random() * message_options.length)
        var chosen_message = message_options[random_index]

        bot.reply(message, chosen_message)
    });
}
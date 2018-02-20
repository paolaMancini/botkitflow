module.exports = function(controller) {

    controller.hears(['hello', 'hey', 'hi', 'aloha'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var message_options = [
            "Hello there!",
            "Hello.",
            "Hi.",
            "Hey, what's up!",
        ]
        var random_index = Math.floor(Math.random() * message_options.length)
        var chosen_message = message_options[random_index]

        bot.reply(message, chosen_message)

    });
}
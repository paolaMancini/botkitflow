//
// Fallback Command
//

slackController.hears('openRoom', 'direct_message', dialogflowMiddleware.hears, function(
    bot,
    message
) {
    bot.reply(message, 'Hello!');
});
 }

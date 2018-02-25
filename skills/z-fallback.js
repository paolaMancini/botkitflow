//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
        //var mardown = "Sorry, I did not understand.<br/>Try "
           // + bot.appendMention(message, "help");
            
        //bot.reply(message, mardown);
        
        
        var message_options = [
            "Sorry, I did not understand.<br/>Try "
            + bot.appendMention(message, "help"),
             "Sorry, it's not clear for me.<br/>Try "
            + bot.appendMention(message, "help"),
             "Say again with other words.<br/>Try "
            + bot.appendMention(message, "help"),
            
        //bot.reply(message, mardown);
         //   "Fine thanks!",
           // "Very well, thank you.",
            "//Not so bad, thanks for asking.",
            //"Very good, thank you.",
        ]
        
        var random_index = Math.floor(Math.random() * message_options.length)
        var chosen_message = message_options[random_index];
       
        bot.reply(message, chosen_message);
     });
        
    });
}


module.exports = function(controller) {

    controller.hears([/pieces done last minute/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var message_options = [
            "Fine thanks!",
            "Very well, thank you.",
            "Not so bad, thanks for asking.",
            "Very good, thank you.",
        ]
        
        var random_index = Math.floor(Math.random() * message_options.length)
        var chosen_message = message_options[random_index];
       
        bot.reply(message, chosen_message);
     });
}
module.exports = function(controller) {

    controller.hears(['pieces done last minute'/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var markdown='[:bar_chart:](http://194.79.57.109:8080/SFnoify/mainChart)';
        var chosen_message = "Click on the icon to see the trend "+markdown;
      
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

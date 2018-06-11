 
module.exports = function(controller) {

    controller.hears(['web portal'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var markdown='[ROLD SmartFab web portal!](http://194.79.57.109/smartFabDEMO/)';
        var chosen_message = "Click on "+markdown;
      
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

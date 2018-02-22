 
module.exports = function(controller) {

    controller.hears(['web portal'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        var chosen_message = '[ROLD SmartFab web portal!](http://194.79.57.109/smartFabDEMO/)';
        bot.reply(message, "Have a look to the ");
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

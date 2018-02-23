 
module.exports = function(controller) {

    controller.hears(['pieces done last minute'/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
      var markdown='[ROLD SmartFab web portal!](http://194.79.57.109/smartFabDEMO/)';
        //var markdown='[:bar_chart:](http://194.79.57.109:8080/SFnoify/mainChart)';
        var chosen_message = "Click on the icon to see the trend "+markdown;
      
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

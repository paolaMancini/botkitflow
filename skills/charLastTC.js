module.exports = function(controller) {

    controller.hears([/last tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
         var markdown='[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0)';
        var chosen_message = "Please, click on the " +markdown+ "to view the data";
      
        bot.reply(message, chosen_message);
        bot.reply();
     });
}

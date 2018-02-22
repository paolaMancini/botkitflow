 
module.exports = function(controller) {

    controller.hears(['prova'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        var chosen_message = 'http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0' ;
       
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

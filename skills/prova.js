 
module.exports = function(controller) {

    controller.hears(['prova'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        var chosen_message = "'[📞](Contact Center: //pmr?sip=sip:paola.mancini@italtel.call.ciscospark.com)'" ;
       
        bot.reply(message, chosen_message);
        bot.reply();

    });


}

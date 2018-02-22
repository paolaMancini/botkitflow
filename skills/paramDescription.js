var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/param descriptions/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            bot.reply(message, "The list of parameter descriptions is:<br>");       
        
              Events.fetchMachDetails1(machineName, lineName, param, function(errMach, events, textMach) {
                    if (errMach) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }

                    if (plant.length == 0) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }
                    console.log("textMach: ", textMach);
                    bot.reply(message, textMach + "%");

                })

        });
}

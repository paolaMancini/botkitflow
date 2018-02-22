var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/param descriptions/i], 'direct_message,direct_mention',
        function(bot, message) {
            var machine="fakeMachine0";
            console.log('message: ', message);
            bot.reply(message, "The list of parameter descriptions is:<br>");       
        
             Events.fetchMachDetails(machine, function(errMach, events, textMach) {
                    if (errMach) {
                        bot.reply(message, "*sorry, could not contact the organizers :-(*");
                        return;
                    }

                    if (events.length == 0) {
                        bot.reply(message, textMach + "\n\n_Type next for upcoming events_");
                        return;
                    }

                    // Store events
                    console.log("text: ", textMach);
                    bot.reply(message, textMach);

                    askForFurtherLines(plant, mpattern, controller, bot, message);

                });

        });
}

var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/param descriptions/i], 'direct_message,direct_mention',
        function(bot, message) {
            var machine="fakeMachine0";
            console.log('message: ', message);
            var msg ="The list of parameter descriptions is:";
            bot.reply(message,msg );       
        
             Events.fetchMachDetails(machine, function(errMach, events, textMach) {
                    if (errMach) {
                        bot.reply(message, "*sorry, could not contact the organizers :-(*");
                        return;
                    }

                    if (events.length == 0) {
                        bot.reply(message, textMach + "\n\n_Type next for upcoming events_");
                        return;
                    }

                 
                    var nb = events.machine.length;
                     
                    if (nb == 1) {
                        msg = "No details found";
                    }
                    msg="<br>";
                    for (var i = 0; i < nb; i++) {
                        var current = events.machine[i];
                        
                        //msg += current.machine + " - " + current.description + +" - " +  current.machine;
                        msg += "**"+current.name + ": **" + current.description;
                        //debug("msg= ", msg);
                    }                 
                    // Store events
                    console.log("text: ", msg);
                    bot.reply(message, msg);

                    

                });

        });
}

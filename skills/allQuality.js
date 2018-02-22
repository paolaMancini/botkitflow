var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/all quality/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
             
                Events.fetchMachines(function(err, plant, text) {
                    if (err) {
                        bot.reply(message, "*sorry, could not contact the organizers :-(*");
                        return;
                    }

                    if (plant.length == 0) {
                        bot.reply(message, text + "\n\n_Type next for upcoming events_");
                        return;
                    }

                    var num = plant.machines.length;
                    console.log("Machines number: ", num);
                    var mex = "The quality values are:<br>";

                    for (var i = 0; i < num; i++) {
                       
                        //Fetch quality value for every machine
                        Events.fetchMachDetails(plant.machines[i].machine, function(errMach, events, textMach) {
                            if (errMach) {
                                bot.reply(message, "*sorry, could not contact the organizers :-(*");
                                return;
                            }

                            if (events.length == 0) {
                                bot.reply(message, textMach + "\n\n_Type next for upcoming events_");
                                return;
                            }

                            for (var i = 0; i < events.machine.length; i++) {
                                var current = events.machine[i];
                                console.log("current.name: ", current.name);
                                if (events.machine[i].name == "quality") {
                                    mex += plant.machines[i].alias + ": **" + current.value + "**%<br>";
                                }
                            }
                            console.log("text: ", mex);
                            bot.reply(message, mex);
                        })

                    }
  
                });
            

        });
}

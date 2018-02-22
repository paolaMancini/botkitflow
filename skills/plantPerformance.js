var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/performance data about plant (.*)/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            var plantName = message.match[1];
            //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).

            if (plantName === '1') {

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
              
                    for (var i = 0; i < num; i++) {
                        var mach = plant.machines[i].machine;
                        var aliasM = plant.machines[i].alias;
                    
                        //Fetch availability value for every machine
                        Events.fetchMachDetails1(mach,aliasM,"performance",function(errMach, events, textMach) {
                            if (errMach) {
                                bot.reply(message, "The machine is not repsonding");
                                return;
                            }

                            if (plant.length == 0) {
                                bot.reply(message, "The machine is not repsonding");
                                return;
                            }
                            console.log("textMach: ", textMach);
                            bot.reply(message, "The performance values are:<br>");
                            bot.reply(message, textMach);                          
                             
                        })

                    }
                   
                });
            } else {
                bot.reply(message, 'I\'m sorry. I don\'t know this plant.');
            }

        });
}

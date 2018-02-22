var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/availability data about plant (.*)/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            var plantName = message.match[1];
            //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).

            if (plantName == '1') {

                Events.fetchMachines(function(err, plant, text) {
                    if (err) {
                        bot.reply(message, "*sorry, could not contact the organizers :-(*");
                        return;
                    }

                    if (plant.machines.length == 0) {
                        bot.reply(message, text + "\n\nThe machine is not responding");
                        return;
                    }

                    var num = plant.machines.length;
                    console.log("Machines number: ", num);
                    var mex = "The availability values are:<br>";
                    var aliasM;
                    for (var i = 0; i < num; i++) {

                       
                        aliasM=plant.machines[i].alias;
                        console.log("plant.machines[i].alias "+ aliasM+ " i= "+ i);
                        
                        //Fetch availability value for every machine
                        Events.fetchMachDetails(plant.machines[i].machine, function(errMach, events, textMach) {
                        console.log("plant.machines[i].machine "+plant.machines[i].machine);
                            if (errMac);
                            if (errMach) {
                                bot.reply(message, "The machine is not responding");
                                return;
                            }
                            if (events.length == 0) {
                                bot.reply(message, "The machine is not responding");
                                return;
                            }


                            for (var j = 0; j < events.machine.length; i++) {
                                var current = events.machine[i];

                                if (events.machine[j].name == "availability") {
                                    mex = aliasM + ": **" + current.value + "**";
                                }
                            }
                            console.log("text: ", mex);
                            bot.reply(message, mex);
                        })

                    }


                });
            } else {
                bot.reply(message, 'I\'m sorry. I don\'t know this plant.');
            }

        });
}

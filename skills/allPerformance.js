var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/all performance/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
             
               Events.fetchMachines(function(err, plant, text) {
                    if (err) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }

                    if (plant.length == 0) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }

                    var num = plant.machines.length;

                    console.log("Machines number: ", num);

                    var mex = "The performance values are:<br>";
                    for (var i = 0; i < num; i++) {
                        var mach = plant.machines[i].machine;

                        var aliasM = plant.machines[i].alias;
                    
                        //Fetch availability value for every machine
                        Events.fetchMachDetails1(mach,aliasM,"performance",function(errMach, events, textMach) {
                            if (errMach) {
                                bot.reply(message, "The machine is not responding");
                                return;
                            }

                            if (plant.length == 0) {
                                bot.reply(message,"The machine is not responding");
                                return;
                            }
                            console.log("textMach: ", textMach);
                            bot.reply(message, textMach);                          
                             
                        })

                    }

                    
                });
            

        });
}

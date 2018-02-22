var request = require('request');
var Events = require("./events");
module.exports = function(controller) {

    controller.hears([/line names/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            bot.reply(message, "The line names are:");               
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
                    var msg;
                    for (var i = 0; i < num; i++) {
                        var mach = plant.machines[i].machine;
                        var aliasM = plant.machines[i].alias;                  
                        msg += "**"+aliasM+"**<br>"
                    }             
                    bot.reply(message,msg);
                });
            

        });
}

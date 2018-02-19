//
// Fallback Command
//
var dt = require('./restClient');
module.exports = function (controller) {

    controller.hears(['hello|hi|good morning'], 'direct_message,direct_mention', function (bot, message) {
        //console.log("The date and time are currently: " + dt.myDateTime());
         for (var i = 0; i < dt.allData.machines.length; i++) {
                           var machine = dt.allData.machines[i].machine;
                         var alias =dt.allData.machines[i].alias;
                         var oee = dt.allData.machines[i].alias;
                     
                           console.log(machine);
                         console.log(alias);
                         console.log(oee);
         }
        bot.reply(message, "Hello");
             
    });
}

var fs = require('fs');
module.exports = function(controller) {

    controller.hears(
        [/pao cicle|pc/i], 'direct_message,direct_mention',
        function(bot, message) {

            // Fetch value argument


            bot.startConversation(message, function(err, convo) {

                convo.ask("Please choose a machine among 'machine_0', 'machine_1', 'machine_2', 'machine_3', 'machine_4', 'machine_5'", [{
                        pattern: "^machine_0|machine_1|machine_2|machine_3|machine_5$",
                        callback: function(response, convo) {
                            // ends current conversation
                            convo.stop();

                            showMachine(fromAliasToName(response.text), bot, message);
                            return;
                        },
                    },
                    {
                        default: true,
                        callback: function(response, convo) {
                            convo.say("Sorry, this machine is not correct. Try again...");
                            convo.repeat();
                            convo.next();
                        }
                    }
                ]);
            });
        })
}

function showMachine(machine, bot, message) {
    // Append .js extension
    console.log('machine: ' + machine);
    if (machine == undefined) {
        bot.reply(message, "Sorry, this machine is not correct.");
    } else {
        bot.reply(message, "In the chart the requested data");
 
        
        var link = `http://194.79.57.109:8080/SFnotify/chart?machine=${machine}&graph=2&graphPage=0`;
 	 
        
        console.log('link: ',array);

        //bot.reply(message, { text: '', files: array });
	    bot.reply(message,{text: '', files:['http://194.79.57.109:8080/SFnotify/mainChart']});
	  bot.reply(message, { text: '', files:   [fs.createReadStream(link)]});
    }
};


function fromAliasToName(p1) {
    if (p1 == "machine_0") {
        return "fakeMachine0";
    } else if (p1 == "machine_1") {
        return "fakeMachine1";
    } else if (p1 == "machine_2") {
        return "fakeMachine2";
    } else if (p1 == "machine_3") {
        return "fakeMachine3";
    } else if (p1 == "machine_4") {
        return "fakeMachine4";
    } else if (p1 == "machine_5") {
        return "fakeMachine5";
    }
}

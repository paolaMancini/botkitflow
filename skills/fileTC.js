/
// Displays the code of the specified skill
//
module.exports = function (controller) {

    controller.hears([/^tc\s*(.*)$/, /^line\s*(.*)$/], 'direct_message,direct_mention', function (bot, message) {

        // Fetch value argument
        var machine = message.match[1];
        if (machine) {
            showMachine(machine, bot, message);
            return;
        }

        bot.startConversation(message, function (err, convo) {

            convo.ask("Please choose a machine among 'machine_0', 'machine_1', 'machine_2', 'machine_3', 'machine_4', 'machine_5'", [
                {
                    pattern: "^color|restricted|show|storage|threads|variables|about|join|help$",
                    callback: function (response, convo) {
                        // ends current conversation
                        convo.stop();

                        showMachine(response.text, bot, message);
                        return;
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Sorry, this machine is not correct. Try again...");
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        });
    });
};

function showMachine(machine, bot, message) {
    // Append .js extension
    console.log ('machine: '+machine); 
    bot.reply(message,"In the chart teh requested data");
    bot.reply(message,{text:'Here is your file!', files:['http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine5&graph=2&graphPage=0)']});
 
     
}

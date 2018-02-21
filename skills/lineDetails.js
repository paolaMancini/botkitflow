var request = require("request");
var Events = require("./events");

module.exports = function(controller) {

    // controller.hears(['cheese'], 'direct_message,direct_mention',
    // function (bot, message) {
    controller.hears([/(.*) details/i], 'direct_message,direct_mention', function(bot, message) {

        console.log('message: ', message);
        var lineName = message.match[1];

        console.log("lineName received: ", lineName);


        Events.fetchMachDetails(lineName, function(err, events, text) {
            if (err) {
                bot.reply(message, "*sorry, could not contact the organizers :-(*");
                return;
            }

            if (events.length == 0) {
                bot.reply(message, text + "\n\n_Type next for upcoming events_");
                return;
            }

            // Store events
            console.log("text: ", text);
            bot.reply(message, text);

            askForFurtherLines(controller, bot, message)

        });
    });
}

function askForFurtherLines(controller, bot, message) {

    //var help = "Which line are you interested of? Please, type<br>" + mpattern;
    Events.fetchMachines(function(err, events, text) {
        if (err) {
            bot.reply(message, "*sorry, could not contact the organizers :-(*");
            return;
        }

        if (events.length == 0) {
            bot.reply(message, text + "\n\n_Type next for upcoming events_");
            return;
        }

        // Store events
        console.log("text: ", text);
        var oees = "<br>";
        var aliases;
        var mpattern = "<br>";
        var detailMsg;

        for (var i = 0; i < events.machines.length; i++) {
            var machine = events.machines[i].machine;
            var alias = events.machines[i].alias;
            var oee = events.machines[i].oee;
            mpattern += "**" + machine + "**<br>";
            //aliases += "**" + alias + "**<br>";
            //var currentMsg = alias + ": **" + oee + "**%;";


        }
        mpattern.join("|");
        console.log('mpattern: ', mpattern);

        bot.startConversation(message, function(err, convo) {

            // create a path for when a user says YES
            var help = "Which line are you interested of? Please, type<br>" + mpattern;


            convo.addMessage({
                text: `_${help}_`,
            }, 'ask-other');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
                text: 'Sorry I did not understand. Say `yes` or `no`',
                action: 'default',
            }, 'bad_response');


            convo.say("The performance data is:<br>" + oees);
            convo.ask("Are you interested on  monitoring an other further line? (yes/**no**/cancel)", [{
                    pattern: "yes|yeh|sure|oui|si",
                    callback: function(response, convo) {
                        convo.gotoThread('ask-other');
                    },
                },
                {
                    pattern: "no|neh|non|na|birk",
                    callback: function(response, convo) {
                        convo.say("Glad have being helped you!");
                        convo.next();

                    },
                },
                {
                    pattern: "cancel|stop|exit",
                    callback: function(response, convo) {
                        convo.say("Got it, cancelling...");
                        convo.next();
                    },
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        convo.say("Sorry, I did not understand.");
                        convo.repeat();
                        convo.next();
                    }
                },
            ]);


        });


    })

}

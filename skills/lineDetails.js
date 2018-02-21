var request = require("request");
var Events = require("./events");

module.exports = function(controller) {

    // controller.hears(['cheese'], 'direct_message,direct_mention',
    // function (bot, message) {
    controller.hears([/(.*) details/i], 'direct_message,direct_mention', function(bot, message) {

        console.log('message: ', message);
        var lineName = message.match[1];

        console.log("lineName received: ", lineName);
        //var help = "Which line are you interested of? Please, type<br>" + mpattern;
        Events.fetchMachines(function(err, plant, text) {
            if (err) {
                bot.reply(message, "*sorry, could not contact the organizers :-(*");
                return;
            }

            if (plant.length == 0) {
                bot.reply(message, text + "\n\n_Type next for upcoming events_");
                return;
            }



        });

        console.log("plant.lenght= " + plant.machines.length);



        var machineName;
        var mpattern = "<br>";
        for (var i = 0; i < plant.machines.length; i++) {

            if (plant.machines[i].alias === lineName) {
                machineName += plant.machines[i].machine;
            }
            mpattern += "**" + machine + "**<br>";

        }
        console.log('mpattern: ', mpattern);
        if (typeof machineName === "undefined") {
            text = "Sorry, I don't know this line. Please, type:<br>";
            text += "**'machine' details**<br>";
            text += "Choose machine the name from the following list: <br>";
            text += "**" + mpattern + "**";
            bot.reply(message, text);
        } else {

            console.log('machineName: ', machineName);

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

                askForFurtherLines(plant, mpattern, controller, bot, message);

            });

        };
    });
}

function askForFurtherLines(plant, mpattern, controller, bot, message) {

    // Store events
    console.log("text: ", text);

    bot.startConversation(message, function(err, convo) {

        // create a path for when a user says YES


        var help = "Which line are you interested of? Please, type:<br>";
        help += "**'machine' details**<br>";
        help += "Choose machine the name from the following list: <br>";
        help += "**" + mpattern + "**";

        convo.addMessage({
            text: `_${help}_`,
        }, 'ask-other');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Sorry I did not understand. Say `yes` or `no`',
            action: 'default',
        }, 'bad_response');


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


}

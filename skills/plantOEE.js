var request = require('request');
var Events = require("./events");
module.exports = function(controller) {
   
    controller.hears([/oee data about plant (.*)/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            var plantName = message.match[1];
            //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
            if (plantName === 'plant1') {

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
                    var aliases="<br>";
                    var mpattern = [];
                    var detailMsg;
                    for (var i = 0; i < events.machines.length; i++) {
                        var machine = events.machines[i].machine;

                        var alias = events.machines[i].alias;
                        var oee = events.machines[i].oee;
                        mpattern.push();
                        aliases += "**" + alias + "**<br>";
                        var currentMsg = alias + ": **" + oee + "**%;";
                        oees += alias + ": **" + oee + "%**;<br>";
                        detailMsg += alias + ": **line" + i + "** or **" + machine + " details**;<br>";
                    }
                    bot.reply("The OEE values are:" + oees);
                    //mpattern.join(" ");
                     
                    /**bot.startConversation(message, function(err, convo) {
                        // create a path for when a user says YES
                        var help = "Which line are you interested of? Please, type:<br>";
                        help += "**'machine' details**. ";
                        help +="Choose machine the name from the following list:";
                        help +=aliases;
                   

                        convo.addMessage({
                            text: `${help}`,
                        }, 'ask-details');

                        // create a path where neither option was matched
                        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
                        convo.addMessage({
                            text: 'Sorry I did not understand. Say `yes` or `no`',
                            action: 'default',
                        }, 'bad_response');


                        convo.say("The OEE values are:" + oees);**/
                        //convo.ask("<br>Do you want furhter more details? (yes/**no**/cancel)<br>", [{
                         /**       pattern: "yes|yeh|sure|oui|si",
                                callback: function(response, convo) {
                                    convo.gotoThread('ask-details');
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


                    });**/
                });
            } else {
                bot.reply(message, 'I\'m sorry. I don\'t know this plant.');
            }

        })
}

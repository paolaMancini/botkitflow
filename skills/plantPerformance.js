var request = require('request');
module.exports = function(controller) {
    //controller.hears([/performance about plant 1/i], 'direct_message,direct_mention',
    controller.hears([/performance data about plant (.*)/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            var plantName = message.match[1];
            //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
            if (plantName === '1') {
                var url = 'http://194.79.57.109:8080/SFapi/machines';
                request(url, function(error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the HTML for the Google homepage.

                    var jsonData = JSON.parse(body);

                    var detailMsg;

                    var oees = "<br>";
                    var aliases;
                    for (var i = 0; i < jsonData.machines.length; i++) {
                        var machine = jsonData.machines[i].machine;

                        var alias = jsonData.machines[i].alias;
                        var oee = jsonData.machines[i].oee;

                        macs.push(machine);
                        aliases.push(alias);
                        aliases += "**" + alias + "**<br>";
                        var currentMsg = alias + ": **" + oee + "**%;";
                        oees += alias + ": **" + oee + "%**;<br>";
                        var detailMsg = alias + ": **line" + i + "** or **" + machine + " details**;<br>";
                    }

                    console.log('macs: ' + macs.join("|"));
                    //patternAliases = aliases.join(",  ");
                    console.log('patternAliases: ' + patternAliases);


                    bot.startConversation(message, function(err, convo) {
                        // create a path for when a user says YES
                        var help = "Which line are you interested of? Please, type<br>" + aliases;
                        help += detailMsg;


                        convo.addMessage({
                            text: `_${help}_`,
                        }, 'ask-details');

                        // create a path where neither option was matched
                        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
                        convo.addMessage({
                            text: 'Sorry I did not understand. Say `yes` or `no`',
                            action: 'default',
                        }, 'bad_response');


                        convo.say(oees);
                        convo.ask("Do you want furhter more details? (yes/**no**/cancel)", [{
                                pattern: "yes|yeh|sure|oui|si",
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


                    });
                });
            } else {
                bot.reply(message, 'I\'m sorry. I don\'t know this plant.');
            }

        })
}
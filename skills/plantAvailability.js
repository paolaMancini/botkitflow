    controller.hears([/availability data about plant (.*)/i], 'direct_message,direct_mention',
        function(bot, message) {

            console.log('message: ', message);
            var plantName = message.match[1];
            //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
            if (plantName === 'plant1') {

                console.log('message: ', message);
                bot.reply(message, "The availability values are:");
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

                    var mex = "The availability values are:<br>";

                    for (var i = 0; i < num; i++) {
                        var mach = plant.machines[i].machine;

                        var aliasM = plant.machines[i].alias;

                        //Fetch availability value for every machine
                        Events.fetchMachDetails1(mach, aliasM, "availability", function(errMach, events, textMach) {
                            if (errMach) {
                                bot.reply(message, "The machine is not responding");
                                return;
                            }

                            if (plant.length == 0) {
                                bot.reply(message, "The machine is not responding");
                                return;
                            }
                            console.log("textMach: ", textMach);
                            bot.reply(message, textMach + "%");

                        })

                    }

                });



                bot.startConversation(message, function(err, convo) {
                    // create a path for when a user says YES
                    var help = "Which line are you interested of? Please, type:<br>";
                    help += "**'machine' details**. ";
                    help += "Choose machine the name from the following list:";
                    help += aliases;

                    convo.addMessage({
                        text: `${help}`,
                    }, 'ask-details');

                    // create a path where neither option was matched
                    // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
                    convo.addMessage({
                        text: 'Sorry I did not understand. Say `yes` or `no`',
                        action: 'default',
                    }, 'bad_response');


                    convo.say("The OEE values are:" + oees);
                    convo.ask("<br>Do you want furhter more details? (yes/**no**/cancel)<br>", [{
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

            } else {
                bot.reply(message, 'I\'m sorry. I don\'t know this plant.');
            }
        })
}

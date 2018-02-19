var request = require('request');
module.exports = function(controller) {
        controller.hears([/plant1 performance/i], 'direct_message,direct_mention',
            function(bot, message) {
                // var request = require('request');
                //controller.hears( [/(plant)( [a-zA-Z0-9]{1,})|(plants)|(performance)/], 'direct_message,direct_mention', function(bot, message){

                console.log('message: ', message);

                var url = 'http://194.79.57.109:8080/SFapi/machines';
                request(url, function(error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the HTML for the Google homepage.

                    var jsonData = JSON.parse(body);

                    var macs = [];
                    var aliases = [];
                    var OEEs = [];
                    for (var i = 0; i < jsonData.machines.length; i++) {
                        var machine = jsonData.machines[i].machine;

                        var alias = jsonData.machines[i].alias;
                        var oee = jsonData.machines[i].oee;

                        macs.push(machine);
                        aliases.push(alias);
                        var currentMsg = "**" + alias + "**: **" + oee + "%**\n";
                        OEEs.push(currentMsg);
                    }

                    console.log('macs: ' + macs.join("|"));
                    patternAliases = aliases.join(",  ");
                    console.log('patternAliases: ' + patternAliases);
                    lines = aliases.join("|");

                    console.log('lines: ' + lines);

                    bot.startConversation(message, function(err, convo) {

                        // create a path for when a user says YES
                        var help = "Please, type>:\n-<br/>**line 'line name'**\n- Choose line name among:\n- <br/>***" + patternAliases + "**";
                        convo.addMessage({
                            text: `_${help}_`,
                        }, 'ask-details');


                        // create a path where neither option was matched
                        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
                        convo.addMessage({
                            text: 'Sorry I did not understand. Say `yes` or `no`',
                            action: 'default',
                        }, 'bad_response');



                        convo.say("Performance about Plant1 is:\n" + OEEs + "\n");
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
            })
    }
    //var help = "Please, type>:\n<br/>**line 'line name'**\n Choose line name among:\n <br/>***" + patternAliases + "**";
    //                          convo.addMessage({
    //                            text: `_${help}_`,
    //                          action: 'default',
    //                    }, 'bad_response');
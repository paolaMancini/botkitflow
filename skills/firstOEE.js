var request = require("request");
var Events = require("./events");

module.exports = function(controller) {

    //controller.hears([/availability value about line (.*)/i], 'direct_message,direct_mention', function(bot, message) {
    controller.hears([/oee of (.*)/i], 'direct_message,direct_mention', function(bot, message) {
        console.log('message: ', message);
        var lineName = message.match[1];
        var lineNew;
         
        if  (lineName.includes('achine')){
            if  (!lineName.includes('_')){
                var res = lineName.split("achine");
                lineNew= res[0]+"achine_"+res[1];
                console.log(lineNew);
               //for (var item in res) {console.log(res[item])}
            }else{
                console.log("_ present");
                lineNew=lineName;
            }
        }else {
             console.log("Invalid Name");
        }
        var param = "oee";
        console.log("lineName received: ", lineName,"lineNew= ",lineNew);
        
        if ("machine1".indexOf("_") + 1 ){
             console.log('contains _');
        }else {
            console.log('does not contain _');
            
        }
       
        Events.fetchMachines(function(err, plant, text) {
            if (err) {
                bot.reply(message, "The machine is not responding");
                return;
            }

            if (plant.length == 0) {
                bot.reply(message, "The machine is not responding");
                return;
            }

            console.log("plant.lenght= " + plant.machines.length);
            var machineName="notFound";
            var mpattern = "<br>";
            for (var i = 0; i < plant.machines.length; i++) {

                if (plant.machines[i].alias == lineNew) {
                //if (plant.machines[i].alias == lineName) {

                    machineName = plant.machines[i].machine;
                }
                mpattern += "**" + plant.machines[i].alias + "**";

            }
            console.log('mpattern: ', mpattern);
            if ((typeof machineName == undefined) || (machineName == "notFound")) {
                text = "Sorry, I don't know this line.<br>";
                bot.reply(message, text);
            } else {

                console.log('machineName: ', machineName);
               
                //Events.fetchOEEDetails(machineName, lineName, param, function(errMach, events, textMach) {
                Events.fetchOEEDetails(machineName, lineNew, param, function(errMach, events, textMach) {
                    if (errMach) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }

                    if (plant.length == 0) {
                        bot.reply(message, "The machine is not responding");
                        return;
                    }
                    console.log("textMach: ", textMach);
                    //bot.reply(message, "Below the requested data about **" + lineName + "** line:"+"<br>"+textMach);
                    bot.reply(message, "Below the requested data about **" + lineNew + "** line:"+"<br>"+textMach);
                   
                    //bot.reply(message, textMach);

                })



               // askForFurtherLines(plant, param, mpattern, controller, bot, message);



            };

        });
    });
}

function askForFurtherLines(plant, param, mpattern, controller, bot, message) {
    bot.startConversation(message, function(err, convo) {

        var help = "Which line are you interested of? Please, type:<br>";
        help += "**line 'machine' " + param + "**<br>";
        help += "Choose machine the name from the following list: <br>";
        help += mpattern;

        convo.addMessage({
            text: `_${help}_`,
        }, 'ask-other');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Sorry I did not understand. Say `yes` or `no`',
            action: 'default',
        }, 'bad_response');

        convo.ask("Are you interested on monitoring the " + param + " value about an other further line? (yes/**no**/cancel)", [{
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

module.exports = function(controller) {

    controller.hears([/last tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        //message.raw_message.actorId;
        bot.startConversation(message, function (err, convo) {
       
            convo.ask("Which machine are you interested in?", [
                {
                    pattern: "^blue|green|pink|red|yellow$",
                    callback: function (response, convo) {
                        var machineName =  getMachineName ('{{responses.answer}}');
                        var markdown="[Chart!](http://194.79.57.109:8080/SFnotify/chart?${machine}="+machineName+"&graph=2&graphPage=0)';

                        convo.gotoThread("success");
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Sorry, I don't know this color. Try another one...");
                        convo.repeat();
                        convo.next();
                    }
                }
            ], { key: "answer" });

            var markdown='[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0)';
            convo.addMessage(
                
                "Click on "+${markdown}+" to view the chart",
                "success");
        });
        
        
        bot.reply(message, chosen_message);
        bot.reply();
     });
}

function getMachineName(alias) {
    if (alias=="machine_0"){
    	return "fakeMachine0";
    }else if (alias=="machine_1"){
   		 return "fakeMachine1";
    }else if (alias=="machine_2"){
    	return "fakeMachine2";
    }else if (alias=="machine_3"){
    	return "fakeMachine3";
    }else if (alias=="machine_4"){
   		 return "fakeMachine4";
    }else{
    	//alias=="machine_4"
        return "fakeMachine5";
    }                
}

 

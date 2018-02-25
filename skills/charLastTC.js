module.exports = function(controller) {

    controller.hears([/last tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var markdown='[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0)';
        //message.raw_message.actorId;
        bot.startConversation(message, function (err, convo) {

            convo.ask("Which machine are you interested in?", [
                {
                    pattern: "^blue|green|pink|red|yellow$",
                    callback: function (response, convo) {
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
                "[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine="+getMachineName('{{responses.answer}}')+"fakeMachine0&graph=2&graphPage=0)'
                "Cool, I love '{{responses.answer}}' too",
                "success");
        });
        
        var chosen_message = "Please, click on the " +markdown+ "to view the data";
      
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
}module.exports = function(controller) {

    controller.hears([/last tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var markdown='[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0)';
        //message.raw_message.actorId;
        
        
        bot.startConversation(message, function (err, convo) {
            convo.ask("Which machine are you interested in?", [
                {
                    pattern: "^blue|green|pink|red|yellow$",
                    callback: function (response, convo) {
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
                "[Chart!](http://194.79.57.109:8080/SFnotify/chart?machine="+getMachineName('{{responses.answer}}')+"fakeMachine0&graph=2&graphPage=0)'
                "Cool, I love '{{responses.answer}}' too",
                "success");
        });
        
        var chosen_message = "Please, click on the " +markdown+ "to view the data";
      
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


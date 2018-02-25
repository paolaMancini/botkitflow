module.exports = function(controller) {

    controller.hears([/'time cicle'|tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        var markdown0='[machine_0!](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine0&graph=2&graphPage=0)';
        var markdown1='[machine_1](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine1&graph=2&graphPage=0)';
        var markdown2='[machine_2](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine2&graph=2&graphPage=0)';
        var markdown3='[machine_3](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine3&graph=2&graphPage=0)';
        var markdown4='[machine_4](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine4&graph=2&graphPage=0)';
        var markdown5='[machine_5](http://194.79.57.109:8080/SFnotify/chart?machine=fakeMachine5&graph=2&graphPage=0)';
        var markdown="\n- "+markdown0+"\n- "+markdown1+"\n- "+markdown2+"\n- "+markdown3+"\n- "+markdown4+"\n- "+markdown5;
       var chosen_message = "Pieces done in in the last Time cicle:"+markdown;
      
        bot.reply(message, chosen_message);
        bot.reply();

    });
       
}



 

module.exports = function (controller) {

    controller.hears(['prova'], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            bot.reply('This is a BotKit conversation sample.');
            bot.reply ('- [Oh yea!](http://194.79.57.109:8080/SFnotify/mainChart)');
               
            });
        });

    });
};

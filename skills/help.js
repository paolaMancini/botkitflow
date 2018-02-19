//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "plant1 OEEs") + ": Ask to know the OEE value about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "plant1 qualities") + ": Ask to know the OEE value about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "plant1 performances") + ": Ask to know the OEE value about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "line <line_name> quality") + ": ask to know the quality value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> availability") + ": ask to know the availability value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> OEE") + ":  ask to know the OEE value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> performance") + ": ask to know the performance value about a specific line";
        text += "\n- " + bot.appendMention(message, "about") + ": ask to know who I am";
    
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        bot.reply(message, text);
    });
}

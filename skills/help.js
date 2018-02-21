//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "performance data about plant <plant name>| performance data about all machines") + ": Ask to know the performance values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "OEE data about plant <plant name>| OEE data about all machines") + ": Ask to know the OEE values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "quality data about plant <plant name>| quality data about all machines") + ": Ask to know the quality values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "availability data about plant <plant name>| availability data about all machines") + ": Ask to know the availability values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "<machine name> details") + ": Ask to know all the values available for the spcific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> quality|availability|OEE|okCounter|koCounter|goal|timeWork|performance|availability|oee|quality|timeActive|timeStop|okLastMinute|isStopped") + ": ask to know the specified value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> availability") + ": ask to know the availability value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> OEE") + ":  ask to know the OEE value about a specific line";
        text += "\n- " + bot.appendMention(message, "line <line_name> performance") + ": ask to know the performance value about the line";
        text += "\n- " + bot.appendMention(message, "variables") + ": ask to know details about the values";
    
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        bot.reply(message, text);
    });
}

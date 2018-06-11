//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/help/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        
        text += "\n- " + bot.appendMention(message, "oee of <line_name>") + ": Ask to know the oee value with details about a specific line ";
        text += "\n- " + bot.appendMention(message, "performances") + ": Ask to know the performance values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "all oee values") + ": Ask to know the oee values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "qualities") + ": Ask to know the quality values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "<machine name> details") + ": Ask to know all the values available for the spcific line<br>";
        text += "\n- " + bot.appendMention(message, "line <line_name> quality|availability|okCounter|koCounter|goal|timeWork|performance|availability|oee|quality|timeActive|timeStop|okLastMinute|isStopped") + ": ask to know the specified value about a specific line<br>";
        text += "\n- " + bot.appendMention(message, "monitored machines") + ": ask to know details about the machine names monitored<br>";
        text += "\n- " + bot.appendMention(message, "monitored plants") + ": ask to know details about the plant names monitored<br>";
        text += "\n- " + bot.appendMention(message, "web portal") + ": ask to have view link for visiting the web portal";
        text += "\n- " + bot.appendMention(message, "chart of pieces done last minute") + ": ask to upload the chart about the pieces done in the last minute";
        text += "\n- " + bot.appendMention(message, "chart of pieces done last tc") + ": ask to upload the chart about the pieces done in the last time cicle";
        text += "\n- " + bot.appendMention(message, "param descriptions") + ": ask to know details about the values<br>";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        bot.reply(message, text);
    });
}

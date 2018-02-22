//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/help/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "performance data about plant <plant name>| all performance values") + ": Ask to know the performance values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "OEE data about plant <plant name>| all OEE values") + ": Ask to know the oee values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "quality data about plant <plant name>| all values") + ": Ask to know the quality values about every line in the plant ";
        text += "\n- " + bot.appendMention(message, "availability data about plant <plant name>| all availability values") + ": Ask to know the availability values about every line in the plant <br>";
        text += "\n- " + bot.appendMention(message, "<machine name> details") + ": Ask to know all the values available for the spcific line<br>";
        text += "\n- " + bot.appendMention(message, "line <line_name> quality|availability|oee|okCounter|koCounter|goal|timeWork|performance|availability|oee|quality|timeActive|timeStop|okLastMinute|isStopped") + ": ask to know the specified value about a specific line<br>";
        text += "\n- " + bot.appendMention(message, "plants monitored") + ": ask to know details about the values<br>";
        text += "\n- " + bot.appendMention(message, "web portal") + ": ask to have view link for visiting the web portal";
        text += "\n- " + bot.appendMention(message, "chart pieces done last minute") + ": ask to upload the chart abot the pieces done in the last time cicle";
        text += "\n- " + bot.appendMention(message, "chart pieces done last TC") + ": ask to upload the chart abot the pieces done in the last minute";
        text += "\n- " + bot.appendMention(message, "param descriptions") + ": ask to know details about the values<br>";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        bot.reply(message, text);
    });
}

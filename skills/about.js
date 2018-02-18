//
// Adds meta information about the bot, and exposes them at a public endpoint 
//
module.exports = function (controller, bot) {

    //
    // OVERRIDE WITH YOUR BOT INFORMATION
    //
    var botcommons = {

        // Bot description
        "description": "This is the IndychatBot for ROLD SmartFab, the ready-to-use platform which which allows the SMEs to monitor, analyze and manage data and information coming from production plants."
    }

    //
    // Adding a metadata endpoint
    //
    controller.webserver.get(process.env.BOTCOMMONS_ROUTE, function (req, res) {
        // As the identity is load asynchronously from Cisco Spark token, we need to check until it's fetched
        if ((botcommons.identity == "unknown") && (bot.botkit.identity)) {
            botcommons.identity = bot.botkit.identity.emails[0];
        }
        res.json(botcommons);
    });
    console.log("CiscoSpark: Bot metadata available at: " + process.env.BOTCOMMONS_ROUTE);

    //
    // .botcommons skill
    //
    controller.hears([/^about$/, /^botcommons$/, /^\.commons$/, /^\.bot$/], 'direct_message,direct_mention', function (bot, message) {

        // Return metadata
        var metadata = '{\n'
            + '   "description" : "' + botcommons["description"] + '",\n';

        bot.reply(message, '```json\n' + metadata + '\n```');
    });

}

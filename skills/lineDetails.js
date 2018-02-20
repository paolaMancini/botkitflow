module.exports = function(controller) {

    // controller.hears(['cheese'], 'direct_message,direct_mention',
    // function (bot, message) {
    controller.hears([/(.*) details/i], 'direct_message,direct_mention', function(bot, message) {

        console.log('message: ', message);
        var lineName = message.match[1];
        console.log("lineName received: ", lineName);

        console.log('message: ', message);
        var plantName = message.match[1];
        //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).

        var url = 'http://194.79.57.109:8080/SFapi/status?machine=' + lineName;
        console.log("url:  ", url);

        request(url, function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.

            if (error) {
                console.log("could not retreive list of events, error: " + error);
                controller(new Error("Could not retreive current events, sorry [SmartFab is not responding]"), null, null);
                //sparkCallback(new Error("Could not retreive current events, sorry [bad anwser from Events API]"), null, null);
                return;
            }

            if ((response < 200) || (response > 299)) {
                console.log("could not retreive list of events, response: " + response);
                controller(new Error(" [SmartFab is not responding]"), null, null);
                return;
            }

            var jsonData = JSON.parse(body);

            var textDef = "The details are:<br>";
            var text = textDef;

            for (var i = 0; i < jsonData.machine.length; i++) {
                var name = jsonData.machine[i].machine;
                var descr = jsonData.machine[i].description;
                var navaluesme = jsonData.machine[i].value;
                console.log('name: ', name);
                console.log('description: ', descr);
                console.log('value: ', value);
                text += "**" + descr + "**: " + value + ":<br>";
                // var alias = jsonData.machines[i].alias;
                //var oee = jsonData.machines[i].oee;

                //macs.push(machine);
                //aliases.push(alias);
                //var currentMsg = " **" + alias + "**: " + oee + "%";
                //OEEs.push(currentMsg);
                // oees += " **" + alias + "**: " + oee + "%;<br";
            }
            if (text === textDef) {

            }
            bot.reply(message, text);

        });
    })
}
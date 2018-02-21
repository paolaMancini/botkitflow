var request = require("request");
var Events = require("./events");
module.exports = function(controller) {

    // controller.hears(['cheese'], 'direct_message,direct_mention',
    // function (bot, message) {
    controller.hears([/(.*) details/i], 'direct_message,direct_mention', function(bot, message) {

        console.log('message: ', message);
        var lineName = message.match[1];
        console.log("lineName received: ", lineName);

        Events.fetchMachDetails(lineName, function(err, events, text) {
            if (err) {
                bot.reply(message, "*sorry, could not contact the organizers :-(*");
                return;
            }

            if (events.length == 0) {
                bot.reply(message, text + "\n\n_Type next for upcoming events_");
                return;
            }

            // Store events
            console.log("text: ", text);

            // });



            //  var url = 'http://194.79.57.109:8080/SFapi/status?machine=' + lineName;
            //  console.log("url:  ", url);

            //  request(url, function(error, response, body) {
            //    console.log('error:', error); // Print the error if one occurred
            //    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //    console.log('body:', body); // Print the HTML for the Google homepage.

            //   if (error) {
            //       console.log("could not retreive list of events, error: " + error);
            //      bot.reply(message, "The machine is not responding");
            //      return;
            //  }

            //  if ((response < 200) || (response > 299)) {
            //       console.log("could not retreive list of events, response: " + response);
            //      bot.reply(message, "The machine is not responding");
            //      return;
            //  }
            //  if (body.length == 0) {
            //     console.log("body is null");
            //     bot.reply(message, "The machine is not responding");
            //     return;
            //  }
            //  var jsonData = JSON.parse(body);

            // var textDef = "Details:<br>";
            //   var text = textDef;

            //  for (var i = 0; i < jsonData.machine.length; i++) {
            //    var name = jsonData.machine[i].machine;
            //    var descr = jsonData.machine[i].description;
            //    var value = jsonData.machine[i].value;
            //     console.log('name: ', name);
            //     console.log('description: ', descr);
            //     console.log('value: ', value);
            //   text += descr + ": **" + value + " **;<br>";

            // }
            //  if (text === textDef) {

            //  }
            bot.reply(message, text);

        });
    })
}
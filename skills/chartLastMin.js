var url = require("url");
module.exports = function(controller) {
controller.hears(['last minute'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        var markdown='[Chart](http://194.79.57.109:8080/SFnotify/mainChart)';
        var chosen_message = "Click on "+markdown+" to obtain the requested data";
        console.log (message);
        bot.reply(message, chosen_message);
        //var urlValue = 'http://194.79.57.109:8080/SFnotify/mainChart';
        var urlValue = 'http://cloudapps.italtel.com/December.jpg';
        var parsedUrl = url.parse(urlValue, true, true);
       bot.reply(message,{text: 'I made this file for you.', files:['http://194.79.57.109:8080/SFnotify/mainChart'
]});
     });
 }
/**var request = require("request");  
var url = require("url");
module.exports = function(controller) {

    controller.hears([/last minute/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
     
     var urlValue = 'http://194.79.57.109:8080/SFnotify/mainChart';
     var parsedUrl = url.parse(urlValue, true, true);
          
         var options = {
             method: 'POST',
             url: 'https://api.ciscospark.com/v1/messages',
             headers: {
                 authorization: 'Bearer YjJiOTEwNmItYzUzMC00MzlmLTgxOWUtMGNjYWFlZWZkMWQ5MjI2MzMxZjMtMmRi',
                 'content-type': 'multipart/form-data'
             },
             formData: {
                 roomId:  message.raw_message.data.roomId,
                 text: 'This is a message with file attachment',
                 files: parsedUrl
             }
         };

         request(options, function(error, response, body) {
             if (error) throw new Error(error);

             console.log(body);
         });


     });
 }**/

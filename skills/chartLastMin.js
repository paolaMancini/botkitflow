 
 
var request = require("request");  
var url = require("url");
module.exports = function(controller) {

    controller.hears([/last minute/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    console.log("message: ",message.raw_message.data.roomId);
    var roomId=

     var urlValue = 'http://194.79.57.109:8080/SFnotify/mainChart';
     var parsedUrl = url.parse(urlValue, true, true);
          
     
     controller.hears('another_keyword','direct_message,direct_mention',function(bot,message) {
  var reply_with_attachments = {
    'username': 'My bot' ,
    'text': 'This is a pre-text',
    'attachments': [
      {
        'fallback': 'To be useful, I need your to invite me in a channel.',
        'title': 'How can I help you?',
        'text': 'To be useful, I need your to invite me in a channel ',
        'color': '#7CD197'
      }
    ],
    'icon_url': 'http://194.79.57.109:8080/SFnotify/mainChart'
    }

  bot.reply(message, reply_with_attachments);
});
     
     
        

     });
 }

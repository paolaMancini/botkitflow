 
  var request = require("request");
 var url = require('url');

 module.exports = function(controller) {

     controller.hears([/last minute/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {

         var uri = new Uri('http: //194.79.57.109:8080/SFnotify/mainChart');

         var options = {
             method: 'POST',
             url: 'https://api.ciscospark.com/v1/messages',
             headers: {
                 authorization: 'Bearer YjJiOTEwNmItYzUzMC00MzlmLTgxOWUtMGNjYWFlZWZkMWQ5MjI2MzMxZjMtMmRi',
                 'content-type': 'multipart/form-data'
             },
             formData: {
                 roomId: 'Y2lzY29zcGFyazovL3VzL1JPT00vNzljY2QyMTAtMDQ5My0xMWU4LTlhZjktZTczYzkzNDQyNGNk',
                 text: 'This is a message with file attachment',
                 files: uri
             }
         };

         request(options, function(error, response, body) {
             if (error) throw new Error(error);

             console.log(body);
         });


     });
 }

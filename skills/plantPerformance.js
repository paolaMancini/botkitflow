module.exports = function (controller) {
	             // var request = require('request');
	               controller.hears( [/(plant)( [a-zA-Z0-9]{1,})|(performance)/], 'direct_message,direct_mention', function(bot, message){
	              console.log('message: ',message);
	              
	                  
// request('http://194.79.57.109:8080/SFapi/machines', function(error, response,
// body) {
// console.log('error:', error); // Print the error
// // if one occurred
// console.log('statusCode:', response && response.statusCode);
// console.log('body:', body); // Print the HTML for
// // the Google homepage.
//	       
// var jsonData = JSON.parse(body);
// // var linea0 = jsonData.machines[0].machine;
// // console.log('linea0:' ,linea0);
// for (var i = 0; i < jsonData.machines.length; i++) {
// var machine = jsonData.machines[i].machine;
// var alias = jsonData.machines[i].alias;
// var oee = jsonData.machines[i].alias;
//	                     
// console.log(machine);
// console.log(alias);
// console.log(oee);
// }
// });
	       
	                    
	                   
	                   bot.startConversation(message, function (err, convo) {
	
	                   convo.ask("Do you want more details?", 
	                            [
	                           { pattern: "^yes|yep|y|Yes$",
	                               callback: function (response, convo) {
	                                  convo.gotoThread("yes");
	                               },
	                           },
	                           { pattern: "^no|No|n$",
	                               callback: function (response, convo) {
	                                  convo.gotoThread("no");
	                               },
	                           },
	                           {
	                               default: true,
	                               callback: function (response, convo) {
	                                  convo.say("Sorry, I don't know this color. Try another one...");
	                                  convo.repeat();
	                                  convo.next();
	                               }
	                           }], { key: "answer" });
	
	                         // yes thread
	                         convo.addMessage(
	                           "Cool, I love '{{responses.answer}}' too",
	                           "yes");
	                           
	                         convo.addMessage(
	                           "Glad having being helped you",
	                           "no");
	                     })  
	               } );
	           }

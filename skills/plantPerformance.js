var request = require('request');
module.exports = function (controller) {
	             // var request = require('request');
	 	     //controller.hears( [/(plant)( [a-zA-Z0-9]{1,})|(plants)|(performance)/], 'direct_message,direct_mention', function(bot, message){
	             controller.hears(/plant1 performance/i, 'direct_message,direct_mention', function(bot, message){
	             console.log('message: ',message);
	              
		var url='http://194.79.57.109:8080/SFapi/machines';		
        request(url, function(error, response, body) {
                       console.log('error:', error); // Print the error if one occurred
                       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                       console.log('body:', body); // Print the HTML for the Google homepage.
       
                       var jsonData = JSON.parse(body);
						 
                       for (var i = 0; i < jsonData.machines.length; i++) {
							var machine = jsonData.machines[i].machine;
							var alias = jsonData.machines[i].alias;
							var oee = jsonData.machines[i].alias;
						
							console.log(machine);
							console.log(alias);
							console.log(oee);
                      }
                     return jsonData;
                 
	       
	                    
	                   
	                  var lines= ["machine_0","machine_1","machine_2","machine_3","machine_4","machine_5","machine_6"];
		
		 
				bot.startConversation(message, function (err, convo) {
	
				// create a path for when a user says YES
				convo.addMessage({
					text: 'How wonderful.',
				}, 'yes_thread');
	
				// create a path for when a user says NO
				// mark the conversation as unsuccessful at the end
				convo.addMessage({
					text: 'Glad having being helped you',
					action: 'stop', // this marks the converation as
									// unsuccessful
				}, 'no_thread');
	
				// create a path where neither option was matched
				// this message has an action field, which directs botkit to
				// go back to the `default` thread after sending this
				// message.
				convo.addMessage({
					text: 'Sorry I did not understand. Please, specify: line <line name>. The known lines are: machine_2, machine_3, machine_4, machine_5, chine_6',
					action: 'default',
			    }, 'bad_response');
	
				// Create a yes/no question in the default thread...
				convo.ask('Which line are you interested of?', [{
						 pattern:'machine_0|machine_1|machine_2|machine_3|machine_4|machine_5|machine_6',
						 callback: function (response, convo) {
							 convo.gotoThread('yes_thread');
						 },	
				},
				{
						pattern: 'no-line',
						callback: function (response, convo) {
							convo.gotoThread('no_thread');
						},
				},
				{
						default: true,
						callback: function (response, convo) {
							convo.gotoThread('bad_response');
						},
					
				}]);
	
				// capture the results of the conversation and see what
				// happened...
				convo.on('end', function (convo) {
	
					if (convo.successful()) {
					 	// this still works to send individual replies...
						bot.reply(message, 'Let us eat some!');
					}					
				});
			}); 
		});
	})
}

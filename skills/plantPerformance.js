var request = require('request');
module.exports = function (controller) {
	controller.hears([/plant1 performance/i], 'direct_message,direct_mention', function (bot, message) {
	             // var request = require('request');
	 	     //controller.hears( [/(plant)( [a-zA-Z0-9]{1,})|(plants)|(performance)/], 'direct_message,direct_mention', function(bot, message){
	              
	             console.log('message: ',message);
	              
		var url='http://194.79.57.109:8080/SFapi/machines';		
        	request(url, function(error, response, body) {
                       console.log('error:', error); // Print the error if one occurred
                       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                       console.log('body:', body); // Print the HTML for the Google homepage.
       
                       var jsonData = JSON.parse(body);
		      
		      
 
			
			var macs=[];
			var aliases=[];	
			var OEEs=[];	
                        for (var i = 0; i < jsonData.machines.length; i++) {
				var machine = jsonData.machines[i].machine;
			        
				var alias = jsonData.machines[i].alias;
				var oee = jsonData.machines[i].oee;
				 
			         macs.push(machine);
			         aliases.push(alias);
				var currentMsg=alias+": "+oee+"%;\n";
			         OEEs.push(currentMsg);
                        }
                   
                 	console.log('macs: '+macs.join("|"));
			patternAliases=aliases.join(", ");
			console.log('patternAliases: '+patternAliases);
			lines=aliases.join("|");;
			
			console.log('lines: '+lines);
		 	 
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
				 
				var help = "Please type <br/>**line** followed by the <br/>**line name**, among: \n**"+ patternAliases+"**";
      				convo.addMessage({
					text: `_${help}_`,
					action: 'default',
			    }, 'bad_response');
	
				// Create a yes/no question in the default thread...
				convo.ask("The performance of plant1 are:\n"+OEEs+"\n Which line are you interested of?", [{
						 pattern:  lines,
						 callback: function (response, convo) {
							 convo.setVar('color', response.text);
							 console.log('convo.vars:', convo.vars);
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

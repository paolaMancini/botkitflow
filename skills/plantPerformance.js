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
				//console.log(machine);
				//console.log(alias);
				//console.log(oee);
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
		 
			 
	       
			//QUI restituisci gli OEE ****
			// {"machine" : [{ "name" : "okCounter", "description" : "number of ok pieces" , "value" : 1044}, {"name" : "koCounter" , "description":"number of ko pieces", "value":19}, {"name":"goal", "description" : "theoric production as p/h", "value":3720}, {"name":"timeWork", "description":"minutes the machine has been working" , "value": 55.18}, {"name" : "performance" , "description":"performance percentage", "value":31.07}, {"name":"availability", "description":"availability percentage", "value":83.38}, {"name":"oee","description":"oee percentage", "value":25.44}, {"name":"quality", "description":"quality percentage", "value":98.21}, {"name":"timeActive", "description":"minutes the machine has been active", "value":66.18}, {"name":"timeStop", "description":"minutes the machine has been stopped", "value":11}]}
			 
			
	                 // jsonLine
			var jsonLine={"machine" : [{ "name" : "okCounter", "description" : "number of ok pieces" , "value" : 1044}, {"name" : "koCounter" , "description":"number of ko pieces", "value":19}, {"name":"goal", "description" : "theoric production as p/h", "value":3720}, {"name":"timeWork", "description":"minutes the machine has been working" , "value": 55.18}, {"name" : "performance" , "description":"performance percentage", "value":31.07}, {"name":"availability", "description":"availability percentage", "value":83.38}, {"name":"oee","description":"oee percentage", "value":25.44}, {"name":"quality", "description":"quality percentage", "value":98.21}, {"name":"timeActive", "description":"minutes the machine has been active", "value":66.18}, {"name":"timeStop", "description":"minutes the machine has been stopped", "value":11}]};
	                   
	                  //var lines= ["machine_0","machine_1","machine_2","machine_3","machine_4","machine_5","machine_6"];
		
		 		 
				bot.startConversation("The performance of plant1 are:\n"+OEEs", function (err, convo) {
	
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
				
				var help = "Sorry I did not understand.";
				help += "\n- Please, specify: <br>'line ["+patternAliases+"]'</br>";
      				convo.addMessage({
					text: `_${help}_`,
					action: 'default',
			    }, 'bad_response');
	
				// Create a yes/no question in the default thread...
				convo.ask('Which line are you interested of?', [{
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

//exports.myDateTime = function () {
  //  return Date();
//};

 
var request = require('request');

module.exports.allData = function() {
	
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
								console.log(machine);
								console.log(alias);
								console.log(oee);
								macs.push(machine);
								aliases.push(alias);
								OEEs.push(oee);
						  }
				})
											
}

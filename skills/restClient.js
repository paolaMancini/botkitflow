//exports.myDateTime = function () {
  //  return Date();
//};

 
var request = require('request');

exports.allData = function() {

                   request('http://194.79.57.109:8080/SFapi/machines', function(error, response, body) {
                       console.log('error:', error); // Print the error if one occurred
                     if ((response < 200) || (response > 299)) {
                        console.log("could not retreive list of events, response: " + response);
                         sparkCallback(new Error("Could not retreive upcoming events, sorry [bad anwser from Events API]"), null, null);
                          return;
                       }
                       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                       console.log('body:', body); // Print the HTML for the Google homepage.
       
                       var jsonData = JSON.parse(body);
                     //var linea0 = jsonData.machines[0].machine;
                     //console.log('linea0:' ,linea0); 
                       for (var i = 0; i < jsonData.machines.length; i++) {
                           var machine = jsonData.machines[i].machine;
                         var alias = jsonData.machines[i].alias;
                         var oee = jsonData.machines[i].alias;
                     
                           console.log(machine);
                         console.log(alias);
                         console.log(oee);
                      }
                     return jsonData;
                   });
}

       

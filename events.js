var debug = require("debug")("samples");
var fine = require("debug")("samples:fine");

var request = require("request");


module.exports.machines = function (limit

) {

    // Get list of upcoming events
    var options = {
        method: 'GET',
        url: "http://194.79.57.109:8080/SFapi/status?machine=?machine=" + machine
    };

    request(options, function (error, response, body) {
        if (error) {
            debug("could not retreive list of events, error: " + error);
            
            return;
        }

        if ((response < 200) || (response > 299)) {
            console.log("could not retreive list of events, response: " + response);
            sparkCallback(new Error("Could not retreive upcoming events, sorry [bad anwser from Events API]"), null, null);
            return;
        }

        var events = JSON.parse(body);
        debug("machines " + events.length + " events");
        fine(JSON.stringify(
        
        
        ));

        if (events.length == 0) {
           
           
            return;
        }

        var nb = events.length;
        var msg = "**" + nb + " upcoming events:**\n";
        if (nb == 1) {
            msg = "**only one upcoming event:**\n";
        }
        for (var i = 0; i < nb; i++) {
            var current = events[i];
            //msg += "\n:small_blue_diamond: "
            msg += "\n" + (i+1) + ". ";
            msg += current.beginDay + " - " + current.endDay + ": [" + current.name + "](" + current.url + "), " + current.city + " (" + current.country + ")";
        }
 
    });
}


 
}

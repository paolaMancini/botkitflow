<script>
var debug = require("debug")("samples");
var fine = require("debug")("samples:fine");

module.exports.fetchMachines = function(cb) {
    var request = require("request");
    // Get list of upcoming events
    var options = {
        method: 'GET',
        url: "http://194.79.57.109:8080//SFapi/machines"
    };

    request(options, function(error, response, body) {
        if (error) {
            debug("1 could not retreive list of events, error: " + error);
            cb(new Error("Could not retreive current events, sorry [Backend Events API not responding]"), null, null);
            return;
        }

        if ((response < 200) || (response > 299)) {
            debug("1 could not retreive list of events, response: " + response);
          
            return;
        }

        var plants = JSON.parse(body);
        //debug("fetched " + events.machines.length + " events");
        //fine(JSON.stringify(events));

        if (plants.machines.length == 0) {
            cb(null, plants, "**Found no event currently going on.**");
            return;
        }

        var nb = plants.machines.length;
        var msg = "<br>";
        if (nb == 1) {
            msg = "**only one event is running now:**";
        }
        for (var i = 0; i < nb; i++) {
            var current = plants.machines[i];
            //msg += "\n:small_blue_diamond: "
            msg += "\n" + (i + 1) + ". ";
            msg += current.machine + " - " + current.description +" - " + current.value;
            debug("msg= ", msg);
        }



        cb(null, plants, msg);
      
    });
}

module.exports.fetchMachDetails = function(machine, cb) {
    var request = require("request");
    // Get list of upcoming events
    var options = {
        method: 'GET',
        url: "http://194.79.57.109:8080/SFapi/status?machine=" + machine
    };

    request(options, function(error, response, body) {
        if (error) {
            debug("1 could not retreive list of events, error: " + error);
            cb(new Error("Could not retreive current events, sorry [Backend Events API not responding]"), null, null);
            return;
        }

        if ((response < 200) || (response > 299)) {
            debug("1 could not retreive list of events, response: " + response);
            //sparkCallback(new Error("Could not retreive current events, sorry [bad anwser from Events API]"), null, null);
            return;
        }
        
        debug("body: ",body );
        var events = JSON.parse(body);
        //debug("fetched " + events.machine.length + " events");
        //fine(JSON.stringify(events));

        if (events.machine.length == 0) {
            cb(null, events, "**Found no event currently going on.**");
            return;
        }

        var nb = events.machine.length;
        var msg = "<br>Nitty-gritty of the line:<br>";
        if (nb == 1) {
            msg = "No details found";
        }
        for (var i = 0; i < nb; i++) {
            var current = events.machine[i];
                
            msg += current.name + ": **" + current.value + "**<br>";
            //debug("msg= ", msg);
        }
        msg+="<br>";

        cb(null, events, msg);
    });
}
module.exports.fetchMachDetails1 = function(machine,alias,param, cb) {
    var request = require("request");
    // Get list of upcoming events
    var options = {
        method: 'GET',
        url: "http://194.79.57.109:8080/SFapi/status?machine=" + machine
    };

    request(options, function(error, response, body) {
        if (error) {
            debug("1 could not retreive list of events, error: " + error);
            //cb(new Error("Could not retreive current events, sorry [Events API not responding]"), null, null);
            return;
        }

        if ((response < 200) || (response > 299)) {
            debug("1 could not retreive list of events, response: " + response);
            //sparkCallback(new Error("Could not retreive current events, sorry [bad anwser from Events API]"), null, null);
            return;
        }
        
        //debug("body: ",body );
        var events = JSON.parse(body);
        //debug("fetched " + events.machine.length + " events");
        //fine(JSON.stringify(events));

        if (events.machine.length == 0) {
            cb(null, events, "**Found no event currently going on.**");
            return;
        }

        console.log("event.js: machine= ",machine,"  alias= ",alias,"  param= ",param);
        var nb = events.machine.length;
         
        var msg;
        if (nb == 1) {
            msg = "No values found";
        }
        for (var i = 0; i < nb; i++) {
            var current = events.machine[i];
             if(current.name == param){
                  msg = alias + ": **" + current.value + "**";
             }
        }
        
        cb(null, events, msg);
    });
}


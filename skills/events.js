var debug = require("debug")("samples");
var fine = require("debug")("samples:fine");
var uuid = require('node-uuid');
 
module.exports.createPublicIdentityUser = function(username,fname,uTagId, fromTime, toTime) {
    var request = require("request");
    // Get list of upcoming events
    var options = {
        method: 'POST',
        url: "https://api-cisco-otello-mi.jago.cloud/api/v1.1/users,
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUk9MRV9NQU5BR0VSIiwidXNlcl9uYW1lIjoibWFuYWdlckBjaXNjby5jb20iLCJzY29wZSI6WyJvdGVsbG9fcmVhZCIsIm90ZWxsb193cml0ZSJdLCJ1c2VySWQiOjM2MjQsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFOQUdFUiJdLCJqdGkiOiI1NTUxYzQ0Zi0yYmRmLTQyZGYtOTM4Zi01MmVjMTlhZDgyNTciLCJjbGllbnRfaWQiOiJhcHAifQ.P_hbCZrvmbGc9MKpOKU_XTbiaPrRIJ01R9ZwEcJrRQY",
          }
        };   
    };

     

        var req = http.request(options, function (res) {
          var chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        });

        req.write(JSON.stringify({ email: 'u1',
          firstname: 'u1',
          lastname: 'u1',
          password: 'ita123',
          phone: 'string',
          publicUser: true,
          role: 'ROLE_GUEST',
          userTagIds: [],
          userTagIdsWithTime: 
           [ { id: 3513,
               interval: { from: 1530796020000, to: 1530835140000 } } ],
          username: 'u1' }));
        req.end();
}

 
}
 

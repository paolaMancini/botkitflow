//exports.myDateTime = function () {
  //  return Date();
//};

 	
var express = require('express');
var router = express.Router();
var request = require('request');



router.get('/', function(req, res, next) {
  request({
    uri: 'http://194.79.57.109:8080/SFapi/machines',
   // qs: {
     // api_key: '123456',
     // query: 'World of Warcraft: Legion'
    //},
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.json(body);
      } else {
        res.json(error);
      }
    }
  });
});

module.exports = router;           

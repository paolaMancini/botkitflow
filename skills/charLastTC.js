module.exports = function(controller) {

    controller.hears([/last tc/i], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
        
        //message.raw_message.actorId;
       
}

function getMachineName(alias) {
    if (alias=="machine_0"){
    	return "fakeMachine0";
    }else if (alias=="machine_1"){
   		 return "fakeMachine1";
    }else if (alias=="machine_2"){
    	return "fakeMachine2";
    }else if (alias=="machine_3"){
    	return "fakeMachine3";
    }else if (alias=="machine_4"){
   		 return "fakeMachine4";
    }else{
    	//alias=="machine_4"
        return "fakeMachine5";
    }                
}

 

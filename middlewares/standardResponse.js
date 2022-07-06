function errMsgs(data){
   switch (data.toUpperCase()) {
      case "SERR":
         return "server error"
         break;
         case "INERR":
            return "input error"
            break;
         case 'NERR':
            return "no error"
            break;
         
      
      default: "server error";
   }
}
function standardResponse(req,res,next){
   req.standard = {failed : false, msg : 'no error', code : "SERR", codeMSG : "server error" };
   req.initializedStandard = function(config){
      const _config = {...req.standard};
      const keys = Object.keys(config);
      const values =  Object.values(config);
      for (let i = 0; i < keys.length; i++) {
         _config[keys[i]] = values[i];
      }
      return _config;
   }
   
   req.newStandard = function(failed, msg,code,codeMSG){
      var config = {};
         if(!msg){
            config = failed;
         } else {
            config = {failed : failed, msg : msg, code : code, codeMSG : codeMSG}
         }
      
      return config;
   
   }
   // function(config){
      
   // }
   next();
}

module.exports = standardResponse;
'use strict';

let integration = require('../integration');

let options = {
    host: 'http://192.168.134.22:8080',
    username: 'ed',
    apiKey: 'd64564bdb414189d1821d77f6c71a81285675e8c'
};

integration.doLookup([{
    isIP: true,
    value: '100.0.0.0'
}], options, function(err, length, result){
   if(err){
       console.info(JSON.stringify(err, null, 4));
   }else{
       console.info(JSON.stringify(result, null, 4));
   }
});

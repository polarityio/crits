'use strict';

let integration = require('../integration');

let options = {
    hostname: 'http://192.168.134.22:8080',
    username: 'ed',
    apiKey: 'd64564bdb414189d1821d77f6c71a81285675e8c'
};

integration.doLookup([{
    isIP: false,
    isMD5: true,
    hashType: 'MD5',
    value: 'fd904addbdfe548c22ffa5223ed9eee7'
}], options, function(err, length, result){
   if(err){
       console.info(JSON.stringify(err, null, 4));
   }else{
       console.info(JSON.stringify(result, null, 4));
   }
});

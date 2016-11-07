'use strict';

var request = require('request');
var _ = require('lodash');
var async = require('async');

/**
 * The startup method is called once when the integration is first loaded by the server.  It can be used
 * to do any initializations required (e.g., setting up persistent database connections)
 */
function startup() {

}


/**
 The doLookup method is called each time 1 or more entity objects needs to be looked up by the integration.  It is
 called on a per user basis. The method is passed an array of entity objects which have the following structure:

 ```json
 {
     isIP: true,
     isIPv4: true,
     isIPv6: false,
     isPrivateIP: false,
     IPType: 'IPv4',
     isHex: false,
     isHash: false,
     isMD5: false,
     isSHA1: false,
     isSHA256: false,
     isSHA512: false,
     hashType: '',
     isGeo: false,
     isEmail: false,
     isURL: false,
     isHTMLTag: false,
     latitude: 0,
     longitude: 0,
     value: '56.2.3.1',
     IPLong: 939655937
     }
 ```

 You can use information provided about the entity to decide whether or not to perform a lookup.

 In addition to passing you the entities, the method will pass you the options set by the user.  The options
 are contained in an object keyed on the option name.  For example for this integration the option object will look
 like

 ```json
 {
    sampleOption: 'default value'
 }
 ```

 @param entities Array of entity objects
 @param options Options for the user
 @param cb callback function
 */
function doLookup(entities, options, cb) {
    let validationResult = _validateOptions(options);
    if(validationResult !== null){
        cb(validationResult);
        return;
    }

    let entitiesWithNoData = [];
    let lookupResults = [];

    async.each(entities, function (entityObj, next) {
        if (entityObj.isIP) {
            _lookupIP(entityObj, options, function (err, results) {
                if (err) {
                    next(err);
                } else {
                    for (let i = 0; i < results.length; i++) {
                        lookupResults.push(results[i]);
                    }
                    next(null);
                }
            });
        } else if(entityObj.isMD5 || entityObj.isSHA1 || entityObj.isSHA256){
            _lookupHash(entityObj, options, function(err, results){
                if(err){
                    next(err);
                }else{
                    for(let i=0; i<results.length; i++){
                        lookupResults.push(results[i]);
                    }
                    next(null);
                }
            });
        }else{
            // entity is not a supported type so just continue
            next(null);
        }
    }, function (err) {
        /**
         * The callback should return 3 parameters
         *
         * @parameter as JSON api formatted error message or a string error message, null if there is no error
         *      Any error message returned here is displayed in the notification window for the user that experienced
         *      the error.  This is a good place to return errors related to API authentication or other issues.     *
         * @parameter entitiesWithNoData an Array of entity objects that had no data for them.  This is used by the caching
         * system.
         * @parameter lookupResults An array of lookup result objects
         */
        cb(err, entitiesWithNoData, lookupResults);
    });
}

function _getIpUri(value, options) {
    return _getFormattedHostname(options) + '/api/v1/ips/?c-ip=' + value + _getUriAuthQueryParam(options);
}

function _getHashUri(hashType, value, options){
    return _getFormattedHostname(options) + '/api/v1/indicators/?c-type=' + hashType.toUpperCase() + '&c-lower=' + value +
        _getUriAuthQueryParam(options);
}

function _getCritsHashUrl(options, object){
    return _getFormattedHostname(options) + '/indicators/details/' + object._id + '/';
}

function _getCritsIpUrl(options, object){
    return _getFormattedHostname(options) + '/ips/details/' + object.ip + '/';
}

function _getUriAuthQueryParam(options){
    return '&username=' + options.username + '&api_key=' + options.apiKey;
}

/**
 * Removes trailing slash if the user added one
 *
 * @param options
 * @returns {string}
 * @private
 */
function _getFormattedHostname(options){
    let hostname = options.hostname;
    if(hostname.endsWith("/")){
        hostname = hostname.substring(0, hostname.length - 1);
    }
    return hostname;
}

function _lookupHash(entityObj, options, cb){
    request({
        uri: _getHashUri(entityObj.hashType, entityObj.value, options),
        method: 'GET',
        json: true
    }, function(err, response, body){
        let error = _getErrorMessage(err, response, body);
        if(error !== null){
            cb(error);
            return;
        }

        let critObjects = body.objects;
        let results = [];




        for (let i = 0; i < critObjects.length; i++) {
            let object = critObjects[i];
            let critsLookupUrl = _getCritsHashUrl(options, object);
            results.push({
                entity: entityObj,
                // Required: An object containing everything you want passed to the template
                data: {
                    // Required: this is the string value that is displayed in the template
                    entity_name: object.lower,
                    // Required: These are the tags that are displayed in your template
                    tags: _createTags(object),
                    // Data that you want to pass back to the notification window details block
                    details: {
                        critsLookupUrl: critsLookupUrl,
                        bucketList: object.bucket_list,
                        campaign: object.campaign,
                        description: object.description,
                        modified: object.modified,
                        source: object.source,
                        threatTypes: object.threat_types
                    }
                }
            })
        }
        cb(null, results);
    })
}

function _getErrorMessage(err, response, body){
    if (err) {
        return 'Could not access CRITs server';
    }

    if(response.statusCode == 401){
        return 'Unauthorized to access CRITs. Please check username and API key';
    }

    if (response.statusCode !== 200) {
        return 'There was an unknown error accessing CRITs';
    }

    return null;
}

function _lookupIP(entityObj, options, cb) {
    request({
        uri: _getIpUri(entityObj.value, options),
        method: 'GET',
        json: true
    }, function (err, response, body) {
        // check for an error
        let error = _getErrorMessage(err, response, body);
        if(error !== null){
            cb(error);
            return;
        }

        let critObjects = body.objects;
        let results = [];

        for (let i = 0; i < critObjects.length; i++) {
            let object = critObjects[i];
            object._critsLookupUrl = _getCritsIpUrl(options, object);
            results.push({
                entity: entityObj,
                // Required: An object containing everything you want passed to the template
                data: {
                    // Required: this is the string value that is displayed in the template
                    entity_name: object.ip,
                    // Required: These are the tags that are displayed in your template
                    tags: _createTags(object),
                    // Data that you want to pass back to the notification window details block
                    details: object
                }
            })
        }
        cb(null, results);
    });
}

function _createSourceMarker(){
    return ' <i class="bts bt-fw bt-map-marker integration-text-bold-color"></i>';
    //return "<span class='tag-marker ' title='Source'>S</span> "
}

function _createCampaignMarkger(){
    return ' <i class="fa fa-fw fa-bullhorn integration-text-bold-color"></i>';
    //return "<span class='tag-marker' title='Campaign'>C</span> "
}

function _createTags(object){
    let tags = [];

    // push source(s)
    if(Array.isArray(object.source) && object.source.length > 0){
        for(var i=0; i<object.source.length; i++) {
            tags.push(object.source[i].name + _createSourceMarker());
        }
    }

    // push campaign name(s)
    if(Array.isArray(object.campaign) && object.campaign.length > 0){
        for(var i=0; i<object.campaign.length; i++){
            tags.push(object.campaign[i].name + _createCampaignMarkger());
        }
    }


    // push bucket_list (array of tags)
    if(Array.isArray(object.bucket_list) && object.bucket_list.length > 0){
        for(var i=0; i<object.bucket_list.length && i < 5 ; i++){
            tags.push(object.bucket_list[i]);
        }
    }

    return tags;
}

/**
 * Options to validate
 *
 * hostname
 * username
 * apiKey
 * lookupHashes
 * lookupIps
 *
 * @param options
 * @private
 */
function _validateOptions(options) {
    if (typeof options.hostname !== 'string') {
        return 'No hostname set';
    }

    if (options.hostname.length === 0) {
        return 'Hostname must be at least 1 character';
    }

    if (typeof options.apiKey !== 'string') {
        return 'No API key set';
    }

    if(options.apiKey.length === 0){
        return 'API key must be at least 1 character';
    }

    if(typeof options.username !== 'string'){
        return 'No username set';
    }

    if(options.username.length === 0){
        return 'Username must be at least 1 character';
    }

    return null;
}

module.exports = {
    doLookup: doLookup,
    startup: startup
};
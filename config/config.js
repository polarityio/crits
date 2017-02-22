module.exports = {
    /**
     * Name of the integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @required
     */
    "name": "CRITs",
    /**
     * The acronym that appears in the notification window when information from this integration
     * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
     * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
     * here will be carried forward into the notification window.
     *
     * @type String
     * @required
     */
    "acronym":"CRIT",
    /**
     * Description for this integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @optional
     */
    "description": "Integration for CRITs, an open source malware and threat repository",
    /**
     * An array of style files (css or less) that will be included for your integration. Any styles specified in
     * the below files can be used in your custom template.
     *
     * @type Array
     * @optional
     */
    "styles":[
        "./styles/polarity-crits.less"
    ],
    /**
     * Provide custom component logic and template for rendering the integration details block.  If you do not
     * provide a custom template and/or component then the integration will display data as a table of key value
     * pairs.
     *
     * @type Object
     * @optional
     */
    "block": {
        "component": {
            "file": "./components/polarity-crits.js"
        },
        "template": {
            "file": "./templates/polarity-crits.hbs"
        }
    },
    "logging": { level: 'info'},
    /**
     * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
     * as an array of option objects.
     *
     * @type Array
     * @optional
     */
    "options":[
        {
            "key": "hostname",
            "name": "CRITs Hostname",
            "description": 'The hostname for your CRITs server including "http://" or "https://" as required.',
            "default":"",
            "type": "text",
            "userCanEdit": false,
            "adminOnly": true
        },
        {
            /**
             * A Unique name for the option.  Should be camelcased (lowercase first letter, uppercase letters for
             * subsequent words).  Should not contains dashes, hyphens or spaces.
             *
             * @property key
             * @type String
             */
            "key"         : "apiKey",
            /**
             * Human Readable name for the option which will be displayed in the Polarity user interface
             *
             * @property name
             * @type String
             */
            "name"        : "API Key",
            /**
             * A short description for what the option does.  This description is displayed in the user interface
             *
             * @property description
             * @type String
             */
            "description" : "Your API key for authenticating to CRITs",
            /**
             * The default value for the option.  Note this value can be either a String or Boolean depending on
             * the @type specified by the `type` property.
             *
             * @property default
             * @type String|Boolean
             */
            "default"     : "",
            /**
             * The type for this option.  Can be either "string", "boolean", or "password"
             *
             * @property type
             * @type String
             */
            "type"        : "text",
            /**
             * If `true`, non-admin users can edit the value of this option and the option will be stored on a
             * per-user basis.  If `false`, the option will be server wide.  Note that for this setting to have
             * an effect, the property `admin-only` must be set to false.
             *
             * @property user-can-edit
             * @type Boolean
             */
            "userCanEdit" : true,
            /**
             * If set to true, the setting can only be viewed by admins.  For all other users the setting will not appear.
             * Note that if `admin-only` is set to true the value of `user-can-edit` is not applicable.
             *
             * @property admin-only
             * @type Boolean
             */
            "adminOnly"    : false
        },
        {
            "key": "username",
            "name": "Username",
            "description": "Your CRITs username",
            "default":"",
            "type": "text",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "lookupIps",
            "name": "Lookup IP Address Resources",
            "description": "If checked, the integration will lookup IP addresses",
            "default":true,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "lookupHashes",
            "name": "Lookup Hashes",
            "description": "If checked, the integration will lookup MD5, SHA1 and SHA256 indicators",
            "default":true,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "lookupDomains",
            "name": "Lookup Domains",
            "description": "If checked, the integration will lookup domains",
            "default":true,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        }
    ]
};
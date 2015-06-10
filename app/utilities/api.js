'use strict';

var REQUEST_URL = 'http://webdevphoenix.com';
var NAMESPACE = 'api';
var VERSION = '1.0';

REQUEST_URL = 'http://localhost:4000';

var Api = {

	get: function(endpoint, scope) {
		return fetch(this.buildUrl(endpoint))
					.then((response) => response.json())
			// .then((responseData) => responseData);
			
	},

	buildUrl: function(endpoint) {
		return REQUEST_URL + '/' + NAMESPACE + '/' + VERSION + '/' + endpoint;
	}
}


module.exports = Api;
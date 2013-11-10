//require('cloud/_Installation.js');
//require('cloud/_Role.js');
//require('cloud/_User.js');
require('cloud/BusStop.js');
//require('cloud/unique.js');

Parse.Cloud.define("hello", function(request, response) {
  console.log('hello');
	response.success("Hello world!");
});

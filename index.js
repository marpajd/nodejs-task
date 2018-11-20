const requestRetry = require("requestretry");
const request = require("request");
const configuration = require("./config/config.js");
const helperFunction=require("./helperFunction");

const apiEndpoint= configuration.environment.linkGet;
const postEndpoint = configuration.environment.mockbin;
const numOfAttempts = configuration.environment.numOfAttempts;
const delayTime = configuration.environment.delayTime;

console.log("========================GET method==============================");
requestRetry({
	url: apiEndpoint,
	json: true,
	maxAttempts: numOfAttempts,
	retryDelay: delayTime,
	retryStrategy: helperFunction.myRetryStrategy
}, (error, res, body) => {
	let myError = helperFunction.myRetryStrategy(error, res, body);
	if (myError) {
		return console.log("In if: ", myError);
	}
	if (res) {
		console.log("The number of request attempts: ", res.maxAttempts);
		console.log("Get method status code: ", res.statusCode); 
		console.log("Get method content:\n", body); 
		return body;
	}
});
 
/********POST method******/
request.post({
	headers: { "content-type": "application/x-www-form-urlencoded" },
	url: postEndpoint,
	body: "message=test test"
}, function (error, res, body) {
	if (error) {
		console.log("Post error", error);
		return error;
	}
	console.log("=====================POST METHOD=================================");
	console.log("Post method status code:", res.statusCode);
	console.log("\nPost method content: \n", body);
});

const requestRetry = require('requestretry');
const requestPost = require('request');
const express = require('express');
const configuration = require('./config/config.js');
const app = express();
const helperFunction=require('./helperFunction');

const apiEndpoint= configuration.envConfig.linkGet;
const postEndpoint = configuration.envConfig.mockbin;
const numOfAttempts = configuration.envConfig.numOfAttempts;
const delayTime = configuration.envConfig.delayTime;
const workerTime = configuration.envConfig.workerTime;

let intervalFunction = setInterval(function () { 
    console.log("========================GET method==============================");
    requestRetry({
        url: apiEndpoint,
        json: true,
        attempts: numOfAttempts,
        retryDelay: delayTime,
        retryStrategy: helperFunction.myRetryStrategy
    }, (error, res, body) => {
        let myError = helperFunction.myRetryStrategy(error, res, body);
        if (myError) {
            return console.log("In if: ", myError);
        }
        if (res) {
            console.log("The number of request attempts: ", res.attempts);
            console.log("Get method status code: ", res.statusCode); 
            console.log("Get method content:\n", body); 
            return body;
        }
    });
}, workerTime);      

/********POST method******/
requestPost.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: postEndpoint,
    body: "message=test test"
}, function (error, res, body) {
    if (error) {
        console.log("Post error", error);
        return error;
    };
    console.log("=====================POST METHOD=================================");
    console.log("Post method status code:", res.statusCode);
    console.log("\nPost method content: \n", body);
});



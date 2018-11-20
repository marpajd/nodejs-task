//const _ = require('lodash');
const config = require('./default.json');
const environment = process.env.NODE_ENV || 'dev1';
const environmentConfig = config[environment];
const envConfig=environmentConfig;

console.log("========================CONFIGURATION===================== \n\n ", envConfig);
module.exports.envConfig=envConfig;
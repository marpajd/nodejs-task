const config = require ('config');
const environment = config.get(process.env.NODE_ENV || 'dev1');

console.log("========================ENVIRONMENT===================== \n\n ", environment);
module.exports.environment=environment;
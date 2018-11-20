function myRetryStrategy(error, res, body) {
    if (error || res.statusCode === 404) {
        console.log("err || response.statusCode === 404: ", error || res.statusCode === 404);
        return new Error("Error! Smtng went wrong");
    } else {
        return null;
    }
}
module.exports.myRetryStrategy = myRetryStrategy;
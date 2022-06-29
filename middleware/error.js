const winston = require('winston');

function error(err, req, res, next) {
    winston.error(err);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    res.status(500).send('Something failed.');
}

module.exports = error;
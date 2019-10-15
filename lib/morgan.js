const fs = require('fs');
const path = require('path');
const morgan = require('koa-morgan');

module.exports = function(app){
    const ENV = process.env.NODE_ENV
    console.log(`
    --------env--------
    ${ENV}
    `)

    if (ENV !== 'production') {
        app.use(morgan('dev'));
    } else {
        const npath = path.resolve(__dirname, '..');
        const logFileName = path.join(npath, 'logs', 'access.log')
        const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
        })
        app.use(morgan('combined', {
            stream: writeStream
        }))
    }

};
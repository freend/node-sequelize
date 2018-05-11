const express = require('express');
const http = require('http');
const session = require('express-session');
require('path');
var app = express();
/**
 * multi language setting
 */
var i18n = require('./i18n');
app.use(i18n);
/**
 * log file setting
 */
const opts = {
    logDirectory:'log',
    fileNamePattern:'log-<DATE>.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );
log.setLevel('debug');
/**
 * view page setting
 */
var bodyParser = require('body-parser');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//use setting body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//use setting ajax
app.use(express.static('scripts'));

//use setting session
app.use(session({
    secret: '@#@sequelizeSample#@$#$',
    resave: false,
    saveUninitialized: true
}));

//sequelize setting
var models = require('./models'); //추가한 부분.

//server port number.
var port = process.env.PORT || 8080;

require('./routes/index')(app, log);
require('./routes/userInfo')(app, log);
require('./routes/sysCode')(app, log);

var server = http.createServer(app);

//sequelize sync
models.sequelize.sync().then( function() {
    server.listen(port, function() {
    console.log("Express server has start on port : " + port);
    });
    server.on('error', onError);
    server.on('onListening', onListening);
});

function onError(error) {
    console.log("err : " + error);
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
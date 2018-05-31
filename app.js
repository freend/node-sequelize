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
/**
 * 모든 관리자 페이지의 로그인 세션을 확인하는 부분입니다.
 * 지금은 특정모드를 확인하기 위해서 web에서 걸리게 만들어야 한다.
 */
app.all('/wshop/web*', function (req, res, next) {
    doGetUserSession(req, res, next);
});
app.all('/wshop/admin*', function (req, res, next) {
    doGetUserSession(req, res, next);
});
function doGetUserSession(req, res, next) {
    if(req.session.userIdSession == undefined) {
        console.log('not login');
        res.redirect('/wshop/common/login');
    }
    else {
        next();
    }
}
//sequelize setting
var models = require('./models'); //추가한 부분.

//server port number.
var port = process.env.PORT || 8080;

require('./routes/index')(app, log);
require('./routes/userInfo')(app, log);
require('./routes/sysCode')(app, log);
require('./routes/admin/product')(app, log);

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
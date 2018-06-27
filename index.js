const Koa = require('koa');
const path = require('path');
const serve = require('koa-simple-static');

// config & logger & schedule
const config = require('./config');
const logger = require('./utils/logger');
require('./utils/cron');
// middleware
const memoryCache = require('./middleware/cache');
const onError = require('./middleware/onerror');
const header = require('./middleware/header');
const debug = require('./middleware/debug');
const timeout = require('./middleware/timeout');
const handlePostData = require('./middleware/handlepostdata');
const runner = require('./middleware/runner');
const bodyParser = require('koa-bodyparser');
// router
const router = require('./router');

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

logger.info('server run!');

const app = new Koa();
app.proxy = true;

app.use(serve({
    dir: path.join(__dirname, 'public'),
    // extraHeaders: [ { 'X-Something-Whatever': 'foo, bar' } ],
    maxAge: 60 * 60 * 24 * 365
}));

// favicon
// app.use(favicon(__dirname + '/favicon.png'));

// handle post data to ctx.request.body
app.use(bodyParser());

// global error handing
app.use(onError);

// 1 set header
app.use(header);

// 5 debug
// todo ban same IP many requests
// app.context.debug = {
//     hitCache: 0,
//     request: 0,
//     routes: [],
//     ips: [],
// };
// app.use(debug);

// 2 cache
// todo
// app.use(
//     memoryCache({
//         app,
//         expire: config.cacheExpire,
//         ignoreQuery: true,
//     })
// );

// 3 save code to file & delete the file
app.use(handlePostData);

// 3 timeout
app.use(timeout(5000));

// 5 runner
app.use(runner);

// 4 router
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, parseInt(config.listenInaddrAny) ? null : '127.0.0.1');
logger.info('Listening Port ' + config.port);
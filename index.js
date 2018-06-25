const Koa = require('koa');
const serve = require("koa-static");
// config & logger & schedule
const config = require('./config');
const logger = require('./utils/logger');
require('./utils/cron');
// middleware
const memoryCache = require('./middleware/cache');
const onError = require('./middleware/onerror');
const header = require('./middleware/header');
const debug = require('./middleware/debug');
const bodyParser = require('koa-bodyparser');
// router
const router = require('./router');

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

logger.info('server run!');

const app = new Koa();
app.proxy = true;

app.use(serve(__dirname+ "/static",{ extensions: ['html']}));
// favicon
// app.use(favicon(__dirname + '/favicon.png'));

// handle post data to ctx.request.body
app.use(bodyParser());

// global error handing
app.use(onError);

// 1 set header
app.use(header);

// 3 debug
app.context.debug = {
    hitCache: 0,
    request: 0,
    routes: [],
    ips: [],
};
app.use(debug);

// 2 cache
app.use(
    memoryCache({
        app,
        expire: config.cacheExpire,
        ignoreQuery: true,
    })
);

// router
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, parseInt(config.listenInaddrAny) ? null : '127.0.0.1');
logger.info('Listening Port ' + config.port);
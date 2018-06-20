const logger = require('../utils/logger');

module.exports = async (ctx, next) => {
    logger.info(`${ctx.url}, user IP: ${ctx.ips[0] || ctx.ip}`);

    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
        'Access-Control-Allow-Methods': 'POST, GET',
    };
    ctx.set(headers);
    ctx.response.type = 'json';
    await next();
};

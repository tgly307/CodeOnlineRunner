const lru = require('lru-cache');

module.exports = function(options = {}) {
    const {
        prefix = 'koa-cache:',
        expire = 10, // 10 second
        routes = ['(.*)'],
        exclude = [],
        passParam = '',
        maxLength = Infinity,
        ignoreQuery = false,
    } = options;

    const memoryCache = lru({
        maxAge: expire,
        max: maxLength,
    });
    return async (ctx, next) => {

        await next();

    };
};

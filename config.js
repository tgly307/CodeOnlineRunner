module.exports = {
    port: process.env.PORT || 9700, // 监听端口
    cacheExpire: process.env.CACHE_EXPIRE || 10, // 缓存时间，单位为秒
    listenInaddrAny: process.env.LISTEN_INADDR_ANY || 1, // 是否允许公网连接，取值 0 1
};

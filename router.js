const Router = require('koa-router');
const router = new Router();


router.get('/', async (ctx) => {
    ctx.body = {"data":"hello world"};
});

router.post('/node', require('./routes/nodejs'));
// router.get('/debug', async (ctx) => {
//
//     const time = (+new Date() - startTime) / 1000;
//
//     const routes = Object.keys(ctx.debug.routes).sort((a, b) => ctx.debug.routes[b] - ctx.debug.routes[a]);
//     const hotRoutes = routes.slice(0, 10);
//     let hotRoutesValue = '';
//     hotRoutes.forEach((item) => {
//         hotRoutesValue += `${ctx.debug.routes[item]}&nbsp;&nbsp;${item}<br>`;
//     });
//
//     const ips = Object.keys(ctx.debug.ips).sort((a, b) => ctx.debug.ips[b] - ctx.debug.ips[a]);
//     const hotIPs = ips.slice(0, 10);
//     let hotIPsValue = '';
//     hotIPs.forEach((item) => {
//         hotIPsValue += `${ctx.debug.ips[item]}&nbsp;&nbsp;${item}<br>`;
//     });
//
//     ctx.body = art(path.resolve(__dirname, './views/welcome.art'), {
//         debug: [
//             {
//                 name: 'git hash',
//                 value: gitHash,
//             },
//             {
//                 name: '请求数',
//                 value: ctx.debug.request,
//             },
//             {
//                 name: '请求频率',
//                 value: (ctx.debug.request / time * 60).toFixed(3) + ' 次/分钟',
//             },
//             {
//                 name: '缓存命中率',
//                 value: ctx.debug.request ? (ctx.debug.hitCache / ctx.debug.request).toFixed(3) : 0,
//             },
//             {
//                 name: '内存占用',
//                 value: process.memoryUsage().rss / 1000000 + ' MB',
//             },
//             {
//                 name: '运行时间',
//                 value: time + ' 秒',
//             },
//             {
//                 name: '热门路由',
//                 value: hotRoutesValue,
//             },
//             {
//                 name: '热门IP',
//                 value: hotIPsValue,
//             },
//         ],
//     });
// });

module.exports = router;
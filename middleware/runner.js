const { execSync } = require('child_process');

module.exports = async (ctx, next) => {
    await next();
    if(ctx.state.command) {
        const result = execSync(ctx.state.command).toString();
        ctx.body = {data: result};
    }

};
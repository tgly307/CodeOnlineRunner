const { execSync } = require('child_process');

module.exports = async (ctx, next) => {
    await next();
    if(ctx.state.command) {
        try{
            const result = execSync(ctx.state.command).toString();
            ctx.body = {data: result};
        } catch (e) {
            ctx.body = e.stderr.toString();
        }

    }

};
const { execSync } = require('child_process');

module.exports = async (ctx, next) => {
    await next();
    const command = 'docker run --rm ' +
        '-v ' +
        ctx.state.filePath +
        ':/usr/src/myapp -w /usr/src/myapp ' +
        ctx.state.commandOption.dockerImage +
        'timeout ' +
        ctx.state.commandOption.commandline;
    // script language
    if(!ctx.request.body.input) {
        try{
            const result = execSync(command).toString();
            ctx.body = {data: result};
        } catch (e) {
            ctx.body = {data: e.stderr.toString()};
        }

    }
    // languages need compile first
    else {

    }

};
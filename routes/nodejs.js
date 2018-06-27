module.exports = async (ctx) => {
    // ctx.state.command = 'node ' + ctx.state.codeFile;
    ctx.state.command = 'docker run --rm ' +
        '-v $PWD:/usr/src/myapp  ' +
        '-w /usr/src/myapp node:alpine timeout 5 node ' +
        ctx.state.codeFile +
        '2>&1';
};
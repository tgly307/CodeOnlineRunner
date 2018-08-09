module.exports = async (ctx) => {
    ctx.state.command = 'docker run --rm ' +
                        '-v ' +
                        ctx.state.filePath +
                        ':/usr/src/myapp  ' +
                        '-w /usr/src/myapp python:alpine timeout python ' +
                        ctx.state.codeFileName;
                        // + ' 2>&1';
    console.log(ctx.state.command)
};
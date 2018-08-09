module.exports = async (ctx) => {
    ctx.state.command = 'docker run --rm ' +
                        '-v $PWD:/usr/src/myapp  ' +
                        '-w /usr/src/myapp python:alpine timeout python ' +
                        ctx.state.codeFile;
                        // + ' 2>&1';
};
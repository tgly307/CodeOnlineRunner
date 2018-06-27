module.exports = async (ctx) => {
    ctx.state.command = 'docker run --rm ' +
                        '-v $PWD:/usr/src/myapp  ' +
                        '-w /usr/src/myapp python:alpine timeout 5 python ' +
                        ctx.state.codeFile +
                        '2>&1';
};
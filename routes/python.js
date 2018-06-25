const { execSync } = require('child_process');
const fs = require('fs');

module.exports = async (ctx) => {
    const data = ctx.request.body.code;
    // save code
    try {
        fs.writeFileSync('test.py', data);
        const result = execSync('docker run --rm -v $PWD:/usr/src/myapp  -w /usr/src/myapp python:alpine python test.py',{timeout:10*1000}).toString();
        ctx.response.body = {data: result};
    } catch (e) {
        ctx.response.body = {data: e.stderr.toString()};
    }
    // run code
};
const { execSync } = require("child_process");
const fs = require('fs');

module.exports = async (ctx) => {
    const data = ctx.request.body.data;
    // save code
    try {
        fs.writeFileSync('test.js', data);
        const result = execSync('docker run --rm -v $PWD:/usr/src/myapp  -w /usr/src/myapp node:alpine node test.js',{timeout:10*1000}).toString();
        ctx.response.body = {data: result};
    } catch (e) {
        ctx.response.body = {data: e.stderr.toString()};
    }
    // run code
};
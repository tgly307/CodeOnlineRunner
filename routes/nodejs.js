const { execSync, exec } = require('child_process');
const fs = require('fs');

module.exports = async (ctx, next) => {
    const data = ctx.request.body.code;
    // save code
    fs.writeFileSync('test', data);
    exec('node test', (error, stdout, stderr) =>{
        console.log(stdout.toString())
        ctx.response.body = {data: stdout.toString() || stderr.toString() || error.toString()};
    });

    // try {
    //     fs.writeFileSync('test.js', data);
    //     ctx.response.body = 'con'
    //
    //     exec('node test.js', (error, stdout, stderr)=>{
    //         console.log(stdout.toString())
    //         ctx.response.body = {data: stdout.toString() || stderr.toString() || error.toString()};
    //     });
    //
    async function delay(time) {
        return new Promise(function(resolve, reject) {
            setTimeout(function(){
                resolve();
            }, time);
        });
    }
    await delay(3000);
    // ctx.response.body = {data: result};
    // } catch (e) {
    //     ctx.response.body = {data:  e.stderr.toString() || e.error.toString() || 'Other Error'};
    // }
    // run code
};
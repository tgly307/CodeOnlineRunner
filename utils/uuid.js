const { exec } = require('child_process');
module.exports.uuid = function(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};

module.exports.delay = async function(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve();
        }, time);
    });
};

module.exports.runCode = function(command) {
    return new Promise(function (resolve, reject){
        exec(command, (error, stdout, stderr) =>{
            let body = {data: stdout && stdout.toString()
                || stderr && stderr.toString()
                || error &&error.toString()};
            console.log(body);
            resolve(body)
        });
    });
};

const utils = require('../utils/uuid');
const fs = require('fs');
const path = require('path');
const apiReg = /^\/api\//;

module.exports = async (ctx, next) => {
    const codeFile = path.join(process.cwd(),'postCode',utils.uuid(20));
    ctx.state.codeFile = codeFile;

    if (apiReg.test(ctx.path)) {
        if (ctx.request.body.code) {
            // save code file
            fs.writeFileSync(codeFile, ctx.request.body.code);
            //save input file if have one
            if (ctx.request.body.input){
                inputFile = path.join(process.cwd(),'postCode',utils.uuid(25));
                ctx.state.inputFile = inputFile;
                fs.writeFileSync(inputFile, ctx.request.body.input)
            }
            await next();
            //delete code file
            fs.unlink(codeFile, () => {});
            if(ctx.state.inputFile){
                fs.unlink(ctx.state.inputFile, () => {});
            }
        } else {
            ctx.body = {data: 'The code is empty!'};
        }
    } else {
        next();
    }
};
const utils = require('../utils/uuid');
const fs = require('fs');
const path = require('path');
const apiReg = /^\/api\//;

module.exports = async (ctx, next) => {
    // generate filename
    ctx.state.codeFilename = utils.uuid(20);
    ctx.state.inputFilename = utils.uuid(25);
    // get file path
    ctx.state.filePath = path.join(process.cwd(), 'postCode');
    // generate filename with path
    ctx.state.codeFile = path.join(ctx.state.filePath, ctx.state.codeFilename);
    ctx.state.inputFile = path.join(ctx.state.filePath, 'postCode', ctx.state.inputFilename);

    if (apiReg.test(ctx.path)) {
        if (ctx.request.body.code) {
            // save code file
            fs.writeFileSync(ctx.state.codeFile, ctx.request.body.code);
            //save input file if have one
            ctx.request.body.input && fs.writeFileSync(ctx.state.inputFile, ctx.request.body.input);

            await next();

            //delete code file and input file if have one
            fs.unlink(ctx.state.codeFile, () => {});
            ctx.request.body.input && fs.unlink(ctx.state.inputFile, () => {});
        } else {
            ctx.body = {data: 'The code is empty!'};
        }
    } else {
        next();
    }
};
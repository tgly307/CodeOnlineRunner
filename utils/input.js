const utils = require('../utils/uuid');

module.exports.input = async function (ctx, next) {
    const inputFile = path.join(process.cwd(),'postCode',utils.uuid(25));
    ctx.state.inputFile = inputFile;
    //save input file if have one
    fs.writeFile(inputFile, ctx.request.body.input, function (err) {
        if (err) {
            ctx.throw(err);
        } else {
            next();
        }
    })
};
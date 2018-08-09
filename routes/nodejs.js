module.exports = async (ctx) => {
    ctx.state.commandOption = {
        dockerImage: 'node:alpine',
        commandline: 'node ' + ctx.state.codeFilename
    }
};
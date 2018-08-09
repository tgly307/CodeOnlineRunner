module.exports = async (ctx) => {
    ctx.state.commandOption = {
        dockerImage: 'python:alpine',
        commandline: 'python ' + ctx.state.codeFilename
    };
};
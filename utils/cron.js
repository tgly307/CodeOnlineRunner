const schedule = require('node-schedule');
const { execSync } = require('child_process');

// every 30 seconds run container-clean command
schedule.scheduleJob('*/30 * * * * *', function(){
    execSync('docker ps -a | grep ^.*node:alpine.*Up.*minutes.*$ | awk \'{print $1}\' | xargs docker rm -f',{timeout:10*1000});
});

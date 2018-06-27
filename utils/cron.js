const schedule = require('node-schedule');
const { exec } = require('child_process');

// every 30 seconds run container-clean command
schedule.scheduleJob('*/30 * * * * *', function(){
    exec('docker ps -a | grep ^.*node:alpine.*Up.*minute.*$ | awk \'{print $1}\' | xargs docker rm -f', {timeout:10*1000}, ()=>{});
    exec('docker ps -a | grep ^.*python:alpine.*Up.*minute.*$ | awk \'{print $1}\' | xargs docker rm -f', {timeout:10*1000}, ()=>{});
});

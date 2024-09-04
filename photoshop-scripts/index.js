const childProcess = require('child_process');
const path = require('path');

// eslint-disable-next-line no-undef
const PATH_TO_SCRIPTS = path.resolve(__dirname, './bash');
  
// eslint-disable-next-line max-params
function spawn(script, args, callback, onError, onComplete) {
    console.log("Executing script " +  script, args)
    const stream = childProcess.spawn(PATH_TO_SCRIPTS + "/" + script, args);
    stream.stdout.on('data', callback);
    stream.stderr.on('data', onError);
    stream.on('close', (code) => {
      console.log("Finished excecuting script", script, code);
      if (onComplete) onComplete();
    })
}

// eslint-disable-next-line no-undef
module.exports.photoshop = function(command, args) {
    const params = [command];
    if (args && args.length > 0) {
        // eslint-disable-next-line guard-for-in
        for (const i in args) {
            params.push(args[i]);
        }
    }
    spawn("photoshop.sh", params,
    (stdout) => {
        console.log('photoshop.sh stdout', stdout);
    }, 
    (stderr) => {
        console.log('photoshop.sh stderr', stderr);
    });
};
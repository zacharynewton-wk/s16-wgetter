const StringDecoder = require('string_decoder').StringDecoder;
const spawn = require('child_process').spawn;

/**
 * Runs python script at filepath and passes output to callback.
 * Make sure the filePath is relative to the root of the project directory.
 * 
 * @param {string} filePath 
 * @param {array} args
 * @param {function} callback
 */
function runPy(filePath, args, callback) {
    let argv = [filePath].concat(args);
    let process = spawn('python', argv);
    let decoder = new StringDecoder('utf8');
    process.stdout.on('data', function (data) {
        callback(decoder.end(data));
    })
}

module.exports = {
    runPy
}
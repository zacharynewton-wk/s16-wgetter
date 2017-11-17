const StringDecoder = require('string_decoder').StringDecoder;
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

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

/**
 * Run sw16wgetter.py with the given list of cik's and ouput downloaded file into output directory.
 * 
 * @param {array} cikList 
 * @param {string} outputDir 
 * @param {function} callback 
 */
function runS16WGetter(cikList, outputDir, callback) {
    // clear output directory
    fs.readdir(outputDir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(outputDir, file), err => {
                if (err) throw err;
            })
        }
        runPy('../scripts/s16wgetter.py', [outputDir].concat(cikList), callback);
    })
}

module.exports = {
    runPy
}
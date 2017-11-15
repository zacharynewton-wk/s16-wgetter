const StringDecoder = require('string_decoder').StringDecoder;

const spawn = require('child_process').spawn;
function runPy(filePath) {
    let args = [filePath]
    args.push('Hello')
    let process = spawn('python', args);
    let decoder = new StringDecoder('utf8');
    process.stdout.on('data', function (data) {
        console.log(decoder.end(data));
    })
}

module.exports = {
    runPy
}
const readline = require('readline');
const fs = require('fs');
const https = require('https');
const exec = require('child_process').exec;
const wget = require('wget-improved');

/**
 * Section 16 filing downloader.
 * 
 * @param {string} outputDir directory to output files in
 * @param {string} midxDir directory to find master.idx files in
 * @param {array} cikList list of CIK numbers to filter by
 */
async function s16wgetter(outputDir, midxDir, cikList, progress) {
    let master_idx_files = await readdir(midxDir);
    let paddedCikList = [];
    for (let i = 0; i < cikList.length; ++i) {
        paddedCikList.push(padCik(cikList[i]));
    }
    let filePromises = [];
    for(let i = 0; i < master_idx_files.length; ++i) {
        let promise = new Promise((resolve, reject) => {
            let filePath = `${midxDir}/${master_idx_files[i]}`;
            let lineReader = readline.createInterface({
                input: fs.createReadStream(filePath)
            });
            lineReader.on('line', (line) => {
                lineReader.pause();
                handleMasterIDXLine(line, outputDir, paddedCikList, (prog, tot) => {
                    if (progress) progress(master_idx_files[i], prog, tot);
                }).then(() => {
                    lineReader.resume();
                });
            });
            lineReader.on('close', function () {
                resolve();
            });
        });
        filePromises.push(promise);
    }
    await Promise.all(filePromises);
    return;
}

/**
 * Parse line from master.idx file and download corresponding file(s)
 * to the outputDir.
 * 
 * @param {string} line line being read
 * @param {string} outputDir directory to output files in
 * @param {array} cikList list of CIK numbers to filter by
 */
async function handleMasterIDXLine(line, outputDir, cikList, progress) {
    let splitLine = line.split('|');
    if (splitLine.length != 5) return;

    let formType = splitLine[2];
    let type = formType.replace('/A', '');
    if (['3', '4', '5'].indexOf(type) < 0) return;

    let cik = padCik(splitLine[0]);
    if (cikList.indexOf(cik) == -1) return;

    let path = splitLine[4];
    let splitPath = path.split('/');
    let accessionNumber = splitPath[3].replace('.txt', '').trim();
    let url = `https://www.sec.gov/Archives/${splitPath[0]}/${splitPath[1]}/${splitPath[2]}/${accessionNumber.replace(/-/g, '')}/edgar.xml`;
    // download to `${outputDir}/${accessionNumber}.xml`
    await downloadFile(url, `${outputDir}/${accessionNumber}.xml`, progress);
}

/**
 * Get files in a directory at path.
 * 
 * @param {string} path 
 */
function readdir(path) {
    return new Promise((res, rej) => {
        console.log(path);
        fs.readdir(path, (err, files) => {
            if (err) {
                rej(err);
                return;
            }
            res(files);
        })
    });
}

/**
 * ¯\_(ツ)_/¯ copy pasta from s16wgetter.py
 * 
 * @param {string} cik 
 */
function padCik(cik) {
    let c = cik;
    if (c.length < 10) {
        let padding = 10 - c.length;
        let new_c = '';
        for (;padding > 0; --padding) {
            new_c += '0';
        }
        new_c += c;
        c = new_c;
    }
    return c;
}

async function downloadFile(url, outputPath, progress) {
    let download = wget.download(url, outputPath, {

    });
    download.on('error', (err) => {
        console.error(url);
        console.error(err);
    });
    if (progress)
        download.on('progress', prog => {
            // console.log(prog);
            // progress(prog, 1);
        });
}

module.exports = s16wgetter;
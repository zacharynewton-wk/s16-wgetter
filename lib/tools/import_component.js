import { StringDecoder } from 'string_decoder';
import fs from 'fs';
import path from 'path';

/**
 * Write HTML from `filePath` to innerHTML of element with id `elementId`.
 * 
 * @param {string} elementId 
 * @param {string} filePath 
 */
function importComponent(componentName) {
    let element = document.getElementById(`app-${componentName}`);
    let decoder = new StringDecoder('utf8');
    let componentdir = path.resolve(`../src/components/${componentName}/`);
    let html = fs.readFileSync(`${componentdir}/${componentName}.html`);
    let js = fs.readFileSync(`${componentdir}/${componentName}.js`);
    let css = fs.readFileSync(`${componentdir}/${componentName}.css`);
}

module.exports = importComponent
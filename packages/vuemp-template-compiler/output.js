const fs = require('fs');
const path = require('path');

const output_dir = path.resolve(__dirname, './dist/');

function writeFile(filename, str) {
   fs.writeFileSync(output_dir + '/' + filename, str, { encoding: 'utf-8' });
}

module.exports = {
    writeFile,
}
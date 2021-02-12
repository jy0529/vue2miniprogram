const fs = require('fs');
const { output, compile } = require('../index');

const source = fs.readFileSync(__dirname + '/HelloWorld.vue', { encoding: 'utf-8' });

output(compile(source));
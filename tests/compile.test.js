const fs = require('fs');
const { compile } = require('../src/compiler/index');

const source = fs.readFileSync(__dirname + '/HelloWorld.vue', { encoding: 'utf-8' });

console.log(compile(source));
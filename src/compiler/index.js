const compiler = require('vue-template-compiler');
const { compileTemplate } = require('@vue/component-compiler-utils');
const { convert } = require('./convert');
const { codegen } = require('./codegen');

function parse(source) {
    return compileTemplate({
        source,
        compiler,
    });
}

function compile(source)  {
    let compiled = parse(source);
    const { wxast } = convert(compiled);
    const { code } = codegen(wxast);
    return code;
}

module.exports = {
    compile,
}
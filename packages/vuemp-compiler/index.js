
const compiler = require('vue-template-compiler');
const { compileTemplate, parse, compileStyle } = require('@vue/component-compiler-utils');
const { convert } = require('./convert');
const { codegen } = require('./codegen');
const { writeFile } = require('./output');

function baseParse(source) {
    return parse({
        source,
        compiler,
        needMap: false,
    });
}

function compile(source)  {
    let compiled = { template, script, styles, } = baseParse(source);

    // render function
    const { ast, code: renderCode, } = compileTemplate({
        source: template.content,
        compiler,
    });

    // style
    const { code: styleCode } = compileStyle({
        source: styles[0].content,
        scoped: !!styles[0].scoped,
    });

    // script
    const { content: scriptContent } = script;
    // add render function
    let scriptResult = scriptContent.trim().slice(0, scriptContent.length - 3);
    scriptResult = `${renderCode}\n${scriptResult}render: render,\n};`
    // main entry
    const mainEntry = `
        import Vue from 'vue'; 
        import App from './index.js';

        const app = new Vue(App);
        app.$mount();
    `;

    // template
    const { wxast } = convert(ast);
    const { code: wxml } = codegen(wxast);

    return {
        wxml,
        mainEntry,
        script: scriptResult,
        style: styleCode,
    };
}

function output(compiled) {
    const { wxml, mainEntry, script, style } = compiled;
    // write files
    //     main.js
    //     index.wxml
    //     index.js
    //     index.wxss
    writeFile('main.js', mainEntry);
    writeFile('index.wxml', wxml);
    writeFile('index.js', script);
    writeFile('index.wxss', style);
}

module.exports = {
    compile,
    output,
}
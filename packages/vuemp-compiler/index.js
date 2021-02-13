const compiler = require('vue-template-compiler');
const { compileTemplate, parse, compileStyle } = require('@vue/component-compiler-utils');
const { convert } = require('./convert');
const { codegen } = require('./codegen');
const { writeFile } = require('./output');
const { preTransformASTNodeEvents } = require('./convert/events');
const { baseWXML } = require('./baseWxml');

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
        compilerOptions: {
            modules: [
                {
                    preTransformNode: function(ASTNode) {
                        preTransformASTNodeEvents(ASTNode);
                        return ASTNode;
                    },
                }
            ]
        }
    }); 

    // style
    const { code: styleCode } = compileStyle({
        source: styles[0].content,
        scoped: !!styles[0].scoped,
    });

    // script
    const { content: scriptContent } = script;
    // add render function
    let scriptResult = scriptContent.trim().slice(0, scriptContent.length - 2);
    scriptResult = scriptResult.replace(/\n|\/\/+/g, '').trim();
    scriptResult = `
    ${renderCode}\n${scriptResult}
    ${scriptResult.charAt(scriptResult.length - 1) === ',' ? '' : ','}
    render: render,\n};
    `;
    // main entry
    const mainEntry = `
        import Vue from 'vue'; 
        import App from './index.js';

        const app = new Vue(App);
        app.$mount();
    `;

    // template
    const { wxast } = convert(ast);
    let { code: wxml } = codegen(wxast);
    wxml = `<import src="/base.wxml"/><template is="VUEMAX_TPL" data="{{$root: $root}}" />`

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
    baseWXML,
}
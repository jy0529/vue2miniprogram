const { web } = require('webpack');
const webpack = require('webpack');
const { webpackConfig } = require('./webpack.config');

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const { compile, baseWXML, } = require('vuemp-compiler/index');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function preBuild() {
    glob.sync(resolve('src') + '/pages/**/entry.vue')
        .forEach(entryVue => {
            const currentDir = path.dirname(entryVue);
            const outputDir = currentDir + '/';
            const { mainEntry, script, wxml, style } = compile(fs.readFileSync(entryVue, { encoding: 'utf-8' }));
            fs.writeFileSync(outputDir + 'main.js', mainEntry);
            fs.writeFileSync(outputDir + 'index.js', script);
            fs.writeFileSync(outputDir + 'main.wxml', wxml);
            fs.writeFileSync(outputDir + 'main.wxss', style);
        });
    
    fs.writeFileSync(outputDir + 'base.wxml', baseWXML);
}

function postBuild() {
    glob.sync(resolve('src') + '/pages/**/*.wxml')
        .forEach(wxmlFile => {
            const currentDir = path.dirname(wxmlFile);
            const outputDir = resolve('dist/pages');
            const pageName = wxmlFile.match(/pages\/(\S+)\/\S+\.wxml/)[1];
            fs.copyFileSync(wxmlFile, outputDir + '/' + pageName + '/' + path.basename(wxmlFile));
        });

    glob.sync(resolve('src') + '/pages/**/*.wxss')
        .forEach(wxssFile => {
            const currentDir = path.dirname(wxssFile);
            const outputDir = resolve('dist/pages');
            const pageName = wxssFile.match(/pages\/(\S+)\/\S+\.wxss/)[1];
            fs.copyFileSync(wxssFile, outputDir + '/' + pageName + '/' + path.basename(wxssFile));
        });
}

preBuild();

webpack(webpackConfig, function(err, stats) {
    if (err || stats.hasError) {
        console.log(err);
        return;
    }
    postBuild();
    console.log(stats.toString());
})

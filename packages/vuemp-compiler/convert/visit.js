const { isFunction } = require('../utils');
/**
 * AST visitor
 * @param {Object} ast 
 * @param {Object} options 
 * 
 *  options
 *     tag(ASTNode)
 *     for(ASTNode)
 *     ifCondition(ASTNode)
 *     event(ASTNode)
 */
function visit(ast, options = {}) {
    let node = ast;

    if (node.tag) {
        isFunction(options.tag) && options.tag(node);
    }
    if (node.for) {
        isFunction(options.for) && options.for(node);
    }
    if(node.attrsMap && node.attrsMap['v-if']) {
        isFunction(options.ifCondition) && options.ifCondition(node);
    }
    if(node.events) {
        isFunction(options.event) && options.event(node);
    }

    if (node.children) {
        for(let i of node.children) {
            visit(i, options);
        }
    }
}

module.exports = {
    visit,
}
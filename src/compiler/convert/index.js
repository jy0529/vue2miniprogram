const { visit } = require('./visit');
const { mapping } = require('../config/mapping');

const WxASTVisitor = {
    tag(node) {
        let tag = node.tag;
        node.tag = mapping.tags[tag];
    },
    for(node) {
        node.attrsMap[mapping.for] = {
            forItems: node.for, 
            item: node.alias,
            index: node.iterator1,
        };
    },
    ifCondition(node) {
        node.attrsMap[mapping.ifCondition['v-if']] = node.attrsMap['v-if'];
        node.attrsMap[mapping.ifCondition['v-else-if']] = node.attrsMap['v-else-if'];
        node.attrsMap[mapping.ifCondition['v-else']] = node.attrsMap['v-else'];
    },
    event(node) {
        for(let e in node.events) {
            let v = node.events[e];
            node.events[mapping.events[e]] = {
                value: v.value,
            }
        }
    }
};

/**
 * convert the orginalAST to wxast
 * @param {Object} compiled vue-template-compiler result
 * 
 * 1. tags
 *   div -> view
 *   span -> text
 *   
 * 2. list
 *   v-for -> wx:for
 * 
 * 3. ifCondition
 *   v-if -> wx:if
 *   v-else -> wx:else
 *   v-else-if -> wx:elif
 * 
 * 4. events
 *   @click -> bindtap
 * 
 */
function convert(compiled) {
    const { ast } = compiled;
    visit(ast, WxASTVisitor);
    return { wxast: ast };
}

module.exports = {
    convert,
}
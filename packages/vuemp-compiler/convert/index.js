const { visit } = require('./visit');
const { mapping } = require('../config/mapping');

let eventId = 0;
const WxASTVisitor = {
    tag(node) {
        let tag = node.tag;
        node.tag = mapping.tags[tag];
    },
    for(node) {
        node.attrsMap[mapping.list.for] = {
            forItems: node.for, 
            item: node.alias,
            index: node.iterator1,
            key: node.key,
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
                value: 'handleProxy',
                eventid: eventId,
            }
        }
    }
};

/**
 * convert the orginalAST to wxast
 * @param {Object} ast vue-template-compiler result ast
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
function convert(ast) {
    visit(ast, WxASTVisitor);
    return { wxast: ast };
}

module.exports = {
    convert,
}

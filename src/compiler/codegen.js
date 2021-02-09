const { mapping } = require('./config/mapping');

function wxTag(astNode) {
    return astNode.tag || '';
}

function wxFor(astNode) {
    if (astNode.attrsMap && astNode.attrsMap[mapping.for]) {
        let v = astNode.attrsMap[mapping.for];
        let s = `wx:for="{{ ${v.forItems} }}"`;
        if (v.item) {
            s += ` wx:for-item="${v.item}"`;
        }
        if (v.index) {
            s += ` wx-for-index="${v.index}"`;
        }
        return s;
    }
    return '';
}

function ifCondition(astNode) {
    if (astNode.attrsMap) {
        if(astNode.attrsMap[mapping.ifCondition['v-if']]) {
            let v = astNode.attrsMap[mapping.ifCondition['v-if']];
            return `wx:if="{{${v}}}"`;
        }
        if(astNode.attrsMap[mapping.ifCondition['v-else-if']]) {
            let v = astNode.attrsMap[mapping.ifCondition['v-else-if']];
            return `wx:elif="{{${v}}}"`;
        }
        if(astNode.attrsMap[mapping.ifCondition['v-else']]) {
            let v = astNode.attrsMap[mapping.ifCondition['v-else']];
            return `wx:else="{{${v}}}"`;
        }
    }
    return '';
}

function events(astNode) {
    if (astNode.events) {
        let s = '';
        for(let e in astNode.events) {
            if (e in mapping.events) {
                let eventName = mapping.events[e];
                s += `${eventName}="{{${astNode.events[eventName].value}}}"`;
            }
        }
        return s;
    }
    return '';
}

function generaterCode(node) {
    let s = '';
    let tag = wxTag(node);

    if (tag) {
        s += `<${tag}`;

        const forStr = wxFor(node);
        forStr !== '' && (s += ` ${forStr}`);

        const ifStr = ifCondition(node);
        ifStr !== '' && (s += ` ${ifStr}`);

        const eventStr = events(node);
        eventStr !== '' && (s += ` ${eventStr}`);

        s += '>';
    } else {
        s += node.text;
    }

    if (node.children) {
        for (let i of node.children) {
            s += generaterCode(i);
        }
    }

    if (tag) {
        s += `</${tag}>`;
    }

    return s;
}

function codegen(wxast) {
    const code = generaterCode(wxast);
    return { code };
}

module.exports = {
    codegen,
}
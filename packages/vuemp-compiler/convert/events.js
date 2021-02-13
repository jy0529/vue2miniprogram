let eventId = 0;

function createEventId() {
    return ++eventId;
}

function addEventIdToASTNde(node) {
   node.attrsMap['eventid'] = createEventId();
}

function preTransformASTNodeEvents(node) {
    for(let attr in node.attrsMap) {
        if (attr.indexOf('@') === 0) {
            let eventId = createEventId();
            node.attrsList.push({ name: 'eventid', value: String(eventId), });
            node.attrsMap.eventid = eventId;
        }
    }
} 

module.exports = {
    addEventIdToASTNde,
    preTransformASTNodeEvents,
}
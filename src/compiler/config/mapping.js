const mapping = {
    tags: {
        'template': 'template',
        'div': 'view',
        'span': 'text',
    },
    list: {
        for: 'wx:for',
        key: 'wx:key'
    },
    ifCondition: {
        'v-if': 'wx:if',
        'v-else': 'wx:else',
        'v-else-if': 'wx:elif'
    },
    events: {
        click: 'bind:tap',
        // TODO more events
    }
}

module.exports = {
    mapping,
}
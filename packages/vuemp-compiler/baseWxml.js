module.exports = {
  baseWXML: `
<template name="VUEMAX_TPL">
  <block wx:for="{{$root.children}}" wx:key="*this">
    <template is="{{_h.type(item)}}" data="{{i: item }}" />
  </block>
</template>

<wxs module="_h">
  var elements = {};
  module.exports = {
    v: function(value) {
      return value !== undefined ? value : '';
    },
    type: function(item) {
      var tag = item.tag;
      var text = item.text;
      if (tag === 'div') {
        return 'VUEMAX_TPL_' + 'view';
      }
      if (tag === undefined && text) {
        return 'VUEMAX_TPL_' + 'plain-text';
      }
      return 'VUEMAX_TPL_' + 'view';
    }
  };
</wxs>

<template name="VUEMAX_TPL_view" data="{{i: i}}">
  <view
    bindtap="handleProxy"
    data-eventid="{{_h.v(i.data.attrs.eventid)}}"
  >
    <block wx:for="{{i.children}}" wx:key="*this">
      <template is="{{_h.type(item)}}" data="{{i: item}}" />
    </block>
  </view>
</template>

<template name="VUEMAX_TPL_plain-text" data="{{i: i}}">
  <block>{{ i.text }}</block>
</template>
`
};
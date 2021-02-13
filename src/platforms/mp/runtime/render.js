import { notDeepEqual } from 'assert';
import { cloneDeep } from './utils';

function getData(vm) {
  let data = {};

  const dataSources = [
    '$data',
    '$props',
  ];

  for(let i = 0; i < dataSources.length; i++) {
    let $ds = dataSources[i];

    if (vm[$ds] !== undefined) {
      Object.keys(vm.$data).reduce((acc, k) => {
        data[k] = cloneDeep(vm.$data[k])
      }, {});
    }
  }

  return data;
}

function vnodeToData(vm) {
  let vnode = vm._vnode;

  function createDataTree(vnode) {
    let node = {};
    node.tag = vnode.tag;
    node.text = vnode.text;
    node.key = vnode.key;
    node.data = cloneDeep(vnode.data);
    
    if (vnode.children) {
      node.children = [];
      for(let i = 0; i < vnode.children.length; i++) {
        node.children.push(createDataTree(vnode.children[i]));
      }
    }

    return node;
  }

  return createDataTree(vnode);
}

export function initDataToMP(page) {
  page.setData({ $root: vnodeToData(this) })
}

export function setDataToMp() {
  const page = this.$mp.page;
  if (this.$mp.mpType === 'page' && page) {
    page.setData({ $root: vnodeToData(this) });
  }
}

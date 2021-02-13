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

export function initDataToMP(page) {
  page.setData({ $root: getData(this) });
}

export function setDataToMp() {
  const page = this.$mp.page;
  if (this.$mp.mpType === 'page' && page) {
    page.setData({ $root: getData(this) });
  }
}

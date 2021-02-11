import Vue from 'core/index'

import { mountComponent } from 'core/instance/lifecycle'

import { patch } from './patch'

Vue.prototype.__patch__ = patch

Vue.prototype.$mount = function () {
  const options = this.$options
  const { mpType = 'page' } = options
  return this._initMP(mpType, () => {
    return mountComponent(this, undefined, undefined)
  })
}

import { initMP } from './lifecycle'
Vue.prototype._initMP = initMP

import { initDataToMP, setDataToMp } from './render'

Vue.prototype.initDataToMP = initDataToMP
Vue.prototype.setDataToMp = setDataToMp

import { handleProxy } from './events'
Vue.prototype.handleProxy = handleProxy

export default Vue

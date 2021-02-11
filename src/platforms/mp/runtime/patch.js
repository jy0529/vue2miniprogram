import * as nodeOps from './node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import ref from 'core/vdom/modules/ref'
const modules = [ref]

export const corePatch = createPatchFunction({ nodeOps, modules })

export function patch () {
  corePatch.apply(this, arguments)
  this.setDataToMp()
}

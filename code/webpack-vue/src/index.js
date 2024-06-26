import { createApp } from 'vue'
import App from './App.vue'
import { init, h } from 'snabbdom'

const app = createApp(App)
const m = app.mount('#app')

//----- snabbdom------
const patch = init([])
const vnode = h('div#svnode.svnode', 'hello sanbbdom')
const container = document.querySelector('#VNodeApp')
const oldVNode = patch(container, vnode)
console.log(vnode === oldVNode)
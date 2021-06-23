import Vue from 'vue'
import App from './App.vue'

kintone.events.on('app.record.index.show', (event) => {
  const myContainer = kintone.app.getHeaderSpaceElement()
  Vue.config.productionTip = false
  new Vue({
    render: (h) => h(App),
  }).$mount(myContainer)
  return event
})

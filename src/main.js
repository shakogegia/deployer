import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css';
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import VueHtmlToPaper from 'vue-html-to-paper';


import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Print from 'vue-print-nb';

library.add(faUserSecret)

//config untuk html to paper
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(Print);
Vue.use(VueHtmlToPaper, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

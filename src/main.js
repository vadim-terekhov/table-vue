import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faSort,
  faSortNumericUp,
  faSortNumericDown,
  faSortAlphaUp,
  faSortAlphaDown,
  faFilter,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
library.add(faSort,faSortNumericUp,faSortNumericDown,faSortAlphaUp,faSortAlphaDown,faFilter,faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'nativescript-vue'
import App from './components/App.vue'
import {routes} from './routes'
import Navigator from 'nativescript-vue-navigator'
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'

Vue.use(Navigator, {routes})
Vue.use(BottomNavigationBar)
Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
)

new Vue ({
  render: h => h('frame', App),
  render: h => h(App),
}).$start()
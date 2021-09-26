import Vue from 'nativescript-vue'
import App from './components/App.vue'
import {routes} from './routes'
import Navigator from 'nativescript-vue-navigator'
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue'
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue'
import ButtonPlugin from '@nativescript-community/ui-material-button/vue'
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue'

Vue.use(Navigator, {routes})
Vue.use(TextFieldPlugin)
Vue.use(TextViewPlugin)
Vue.use(ButtonPlugin)
Vue.use(FloatingActionButtonPlugin)

new Vue ({render: h => h('frame', App), render: h => h(App),}).$start()
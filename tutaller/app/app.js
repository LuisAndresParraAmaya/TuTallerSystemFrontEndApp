import Vue from 'nativescript-vue'
import App from './components/App.vue'
import { routes } from './routes'
import Navigator from 'nativescript-vue-navigator'
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue'
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue'
import { VueMaskFilter } from 'v-mask'
import ButtonPlugin from '@nativescript-community/ui-material-button/vue'
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue'
import DateTimePicker from '@nativescript/datetimepicker/vue'
import { CheckBox } from '@nstudio/nativescript-checkbox'

Vue.use(Navigator, { routes })
Vue.use(TextFieldPlugin)
Vue.use(TextViewPlugin)
Vue.filter('VMask', VueMaskFilter)
Vue.use(ButtonPlugin)
Vue.use(FloatingActionButtonPlugin)
Vue.use(DateTimePicker)
Vue.registerElement(
    'CheckBox',
    () => CheckBox,
    {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
)
Vue.registerElement('DropDown', () => require('nativescript-drop-down/drop-down').DropDown)

new Vue({ render: h => h('frame', App), render: h => h(App), }).$start()
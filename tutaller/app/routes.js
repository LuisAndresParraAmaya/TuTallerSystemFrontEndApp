import Home from './components/Home/Template.vue'
import Login from './components/Login/Template.vue'
import CreateAccount from './components/CreateAccount/Template.vue'
import RecoveryPassword from './components/RecoveryPassword/Template.vue'
import ModifyProfile from './components/ModifyProfile/Template.vue'
import DeleteAccount from './components/DeleteAccount/Template.vue'

export const routes = {
    '/home': {
        component: Home,
    },
    '/login': {
        component: Login,
    },
    'recoverypassword': {
        component: RecoveryPassword,
    },
    '/createaccount': {
        component: CreateAccount,
    },
    '/modifyprofile': {
        component: ModifyProfile,
    },
    '/deleteaccount': {
        component: DeleteAccount,
    },
}
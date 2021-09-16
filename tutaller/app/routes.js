import Home from './components/Home/Template.vue'
import Login from './components/Login/Template.vue'
import CreateAccount from './components/CreateAccount/Template.vue'
import RecoveryPassword from './components/RecoveryPassword/Template.vue'
import RecoveryPasswordVerifyIdentity from './components/RecoveryPasswordVerifyIdentity/Template.vue'
import RecoveryPasswordChangePassword from './components/RecoveryPasswordChangePassword/Template.vue'
import ModifyProfile from './components/ModifyProfile/Template.vue'
import DeleteAccount from './components/DeleteAccount/Template.vue'
import ChangePassword from './components/ChangePassword/Template.vue'

export const routes = {
    '/Home': {
        component: Home,
    },
    '/Login': {
        component: Login,
    },
    '/RecoveryPassword': {
        component: RecoveryPassword,
    },
    '/RecoveryPasswordVerifyIdentity': {
        component: RecoveryPasswordVerifyIdentity,
    },
    '/RecoveryPasswordChangePassword': {
        component: RecoveryPasswordChangePassword,
    },
    '/CreateAccount': {
        component: CreateAccount,
    },
    '/ModifyProfile': {
        component: ModifyProfile,
    },
    '/DeleteAccount': {
        component: DeleteAccount,
    },
    '/ChangePassword': {
        component: ChangePassword,
    },
}
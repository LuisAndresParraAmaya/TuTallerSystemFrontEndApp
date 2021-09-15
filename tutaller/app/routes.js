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
    '/home': {
        component: Home,
    },
    '/login': {
        component: Login,
    },
    '/recoverypassword': {
        component: RecoveryPassword,
    },
    '/recoverypasswordverifyidentity': {
        component: RecoveryPasswordVerifyIdentity,
    },
    '/recoverypasswordchangepassword': {
        component: RecoveryPasswordChangePassword,
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
    '/changepassword': {
        component: ChangePassword,
    },
}
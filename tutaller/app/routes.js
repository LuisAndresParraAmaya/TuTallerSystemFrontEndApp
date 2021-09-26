import WorkshopList from './components/WorkshopList/Template.vue'
import PostulateWorkshop from './components/PostulateWorkshop/Template.vue'
import WorkshopPostulationList from './components/WorkshopPostulationList/Template.vue'
import WorkshopPostulation from './components/WorkshopPostulation/Template.vue'
import SubscriptionList from './components/SubscriptionList/Template.vue'
import Workshop from './components/Workshop/Template.vue'
import WorkshopServiceRequest from './components/WorkshopServiceRequest/Template.vue'
import AddWorkshopEmployee from './components/AddWorkshopEmployee/Template.vue'
import ReserveWorkshopAttention from './components/ReserveWorkshopAttention/Template.vue'
import PayWorkshopService from './components/PayWorkshopService/Template.vue'
import WorkshopServicePaymentReceipt from './components/WorkshopServicePaymentReceipt/Template.vue'
import EvaluateWorkshopService from './components/EvaluateWorkshopService/Template.vue'
import Login from './components/Login/Template.vue'
import CreateAccount from './components/CreateAccount/Template.vue'
import AccountOptions from './components/AccountOptions/Template.vue'
import RecoveryPassword from './components/RecoveryPassword/Template.vue'
import RecoveryPasswordVerifyIdentity from './components/RecoveryPasswordVerifyIdentity/Template.vue'
import RecoveryPasswordChangePassword from './components/RecoveryPasswordChangePassword/Template.vue'
import ModifyProfile from './components/ModifyProfile/Template.vue'
import DeleteAccount from './components/DeleteAccount/Template.vue'
import ChangePassword from './components/ChangePassword/Template.vue'
import WorkshopService from './components/WorkshopService/Template.vue'

export const routes = {
    '/WorkshopList': {
        component: WorkshopList,
    },
    '/PostulateWorkshop': {
        component: PostulateWorkshop,
    },
    '/WorkshopPostulationList': {
        component: WorkshopPostulationList,
    },
    '/WorkshopPostulation': {
        component: WorkshopPostulation,
    },
    '/SubscriptionList': {
        component: SubscriptionList,
    },
    '/Workshop': {
        component: Workshop,
    },
    '/WorkshopServiceRequest': {
        component: WorkshopServiceRequest,
    },
    '/AddWorkshopEmployee': {
        component: AddWorkshopEmployee,
    },
    '/ReserveWorkshopAttention': {
        component: ReserveWorkshopAttention,
    },
    '/PayWorkshopService': {
        component: PayWorkshopService,
    },
    '/WorkshopServicePaymentReceipt': {
        component: WorkshopServicePaymentReceipt,
    },
    '/EvaluateWorkshopService': {
        component: EvaluateWorkshopService,
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
    '/AccountOptions': {
        component: AccountOptions,
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
    '/WorkshopService': {
        component: WorkshopService,
    }
}
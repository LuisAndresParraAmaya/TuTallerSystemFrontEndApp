import { ApplicationSettings } from '@nativescript/core'
import { logOut } from '~/utils/session'

export default {
    data() {
        return {
            active: false,
            isLoggedIn: this.checkifLoggedIn()
        }
    },
    methods: {
        goToLoginPage() {
            this.$navigator.modal('/Login', { props: {rootFrame: 'accountNav'}, id: 'modalLogin', frame: 'accountNav', fullscreen: true })
        },
        goToAccountManagementPage() {
            this.$navigator.navigate('/AccountManagement', { frame: 'accountNav' })
        },
        goToWorkshopManagementPage() {
            this.$navigator.navigate('/WorkshopManagement', { frame: 'accountNav' })
        },
        goToSubscriptionManagementPage() {
            this.$navigator.navigate('/SubscriptionManagement', { frame: 'accountNav' })
        },
        goToFileSupportTicketPage() {
            this.$navigator.navigate('/FileSupportTicket', { frame: 'accountNav' })
        },

        checkifLoggedIn() {
            if (ApplicationSettings.getString('user') !== undefined) {
                this.isLoggedIn = true
            }else {
                this.isLoggedIn = false
            }
        },

        logOut() {
            confirm({
                title: '¿Quieres cerrar sesión en TuTaller?',
                message: 'Siempre podrás volver a iniciar sesión en cualquier momento.',
                okButtonText: 'Cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    logOut(this)
                }
            })
        }
    }
}
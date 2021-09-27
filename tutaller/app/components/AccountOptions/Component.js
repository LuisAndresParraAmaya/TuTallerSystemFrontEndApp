const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'Account',
    methods: {
        goToCreateAccountPage() {
            this.$navigator.navigate('/CreateAccount')
        },
        goToLoginPage() {
            this.$navigator.navigate('/Login')
        },
        goToWorkshopManagementPage() {
            this.$navigator.navigate('/WorkshopManagement')
        },
        goToModifyProfilePage() {
            this.$navigator.navigate('/ModifyProfile')
        },
        
        logOut() {
            confirm({
                title: '¿Quieres cerrar sesión en TuTaller?',
                message: 'Siempre podrás volver a iniciar sesión en cualquier momento.',
                okButtonText: 'Cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    appSettings.remove('user')
                    this.$navigator.navigate('/AccountOptions', {clearHistory: true})
                }
            })
        }
    }
}
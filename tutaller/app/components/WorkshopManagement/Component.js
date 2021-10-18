import { ApplicationSettings } from '@nativescript/core'

export default {
    props: ['snackBarMessage'],
    data() {
        return {
            userType: ApplicationSettings.getString('userType')
        }
    },
    methods: {
        onPageLoaded() {
            if (this.snackBarMessage !== undefined) {
                console.log(this.snackBarMessage)
            }
        },

        goToMyWorkshopList() {
            this.$navigator.navigate('/MyWorkshopList', { frame: 'accountNav' })
        },
        goToAddWorkshopPostulationPage() {
            this.$navigator.navigate('/AddWorkshopPostulation', { frame: 'accountNav' })
        },
        goToWorkshopPostulationListPage() {
            this.$navigator.navigate('/WorkshopPostulationList', { frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
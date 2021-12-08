import { ApplicationSettings } from '@nativescript/core'

export default {
    data() {
        return {
            userType: ApplicationSettings.getString('userType')
        }
    },

    methods: {
        goToMyWorkshopList() {
            this.$navigator.navigate('/MyWorkshopList', { frame: 'accountNav' })
        },
        goToAddWorkshopPostulationPage() {
            this.$navigator.navigate('/AddWorkshopPostulation', { frame: 'accountNav' })
        },
        goToWorkshopPostulationListPage() {
            this.$navigator.navigate('/WorkshopPostulationList', { frame: 'accountNav' })
        },
        goToWorkshopOfficeWorkDisputeCaseListPage() {
            this.$navigator.navigate('/WorkshopOfficeWorkDisputeCaseList', { frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
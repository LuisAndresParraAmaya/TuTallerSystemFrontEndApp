export default {
    props: ['myWorkshopOffice', 'myWorkshopOfficeAttention'],
    data() {
        return {
        }
    },

    methods: {
        goToModifyWorkshopOfficePage() {
            this.$navigator.navigate('/ModifyWorkshopOffice', { props: { myWorkshopOffice: this.myWorkshopOffice, myWorkshopOfficeAttention: this.myWorkshopOfficeAttention }, frame: 'accountNav' })
        },
        goToWorkshopOfficeServiceList() {
            this.$navigator.navigate('/WorkshopOfficeServiceList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id, actualFrame: 'accountNav' }, frame: 'accountNav' })
        },
        goToWorkshopOfficeEmployeeList() {
            this.$navigator.navigate('/WorkshopOfficeEmployeeList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id, actualFrame: 'accountNav' }, frame: 'accountNav' })
        },
        goToMyWorkshopOfficeSubscriptionList() {
            alert('Función en construcción')
        },
        goToMyWorkshopOfficeAdList() {
            this.$navigator.navigate('/MyWorkshopOfficeAdList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
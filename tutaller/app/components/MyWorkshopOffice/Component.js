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
        goToWorkshopOfficeServiceListPage() {
            this.$navigator.navigate('/WorkshopOfficeServiceList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id, actualFrame: 'accountNav' }, frame: 'accountNav' })
        },
        goToWorkshopOfficeEmployeeListPage() {
            this.$navigator.navigate('/WorkshopOfficeEmployeeList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id, actualFrame: 'accountNav' }, frame: 'accountNav' })
        },
        goToMyWorkshopOfficeSubscriptionList() {
            this.$navigator.navigate('/MyWorkshopOfficeSubscription', { props: { myWorkshopOffice: this.myWorkshopOffice }, frame: 'accountNav' })
        },
        goToMyWorkshopOfficeAdList() {
            this.$navigator.navigate('/MyWorkshopOfficeAdList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id }, frame: 'accountNav' })
        },
        goToOfferListPage() {
            this.$navigator.navigate('/OfferList', { props: { workshopOfficeId: this.myWorkshopOffice.workshop_office_id, offerType: 'workshopOfficeService' }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
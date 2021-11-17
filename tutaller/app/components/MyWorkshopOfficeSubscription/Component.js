export default {
    props: ['myWorkshopOffice'],
    data() {
        return {
        }
    },

    methods: {
        getWorkshopOfficePostulationStatus() {
            switch (this.myWorkshopOffice.workshop_suscription_id) {
                case 1:
                    return 'La sucursal no se encuentra con una subscripción activa actualmente.'
                case 2:
                    return 'Plan mensual básico'
            }
        },

        goToSubscriptionListPage() {
            this.$navigator.navigate('/SubscriptionList', { props: { myWorkshopOffice: this.myWorkshopOffice }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
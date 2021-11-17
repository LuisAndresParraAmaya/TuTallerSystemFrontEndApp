import { ApplicationSettings } from '@nativescript/core'

export default {
    data() {
        return {
            userType: ApplicationSettings.getString('userType')
        }
    },

    methods: {
        goToOfferListPage() {
            this.$navigator.navigate('/OfferList', { props: { offerType: 'subscriptionPlan' }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
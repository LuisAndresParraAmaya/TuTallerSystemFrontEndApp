import { translateSubscriptionName } from "~/utils/translators"
import { translatePeriodicity } from "~/utils/translators"

export default {
    props: ['subscription', 'myWorkshopOffice'],
    data() {
        return {
            isPaySubscriptionBtnTappable: true,

            translateSubscriptionName: translateSubscriptionName,
            translatePeriodicity: translatePeriodicity
        }
    },

    methods: {
        paySubscription() {
            this.$navigator.navigate('/Payment', { props: { workshopOfficeId: this.myWorkshopOffice.id }, frame: 'accountNav' })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
import { translateSubscriptionName } from "~/utils/translators"
import { translatePeriodicity } from "~/utils/translators"

export default {
    props: ['subscription'],
    data() {
        return {
            isPaySubscriptionBtnTappable: true,

            translateSubscriptionName: translateSubscriptionName,
            translatePeriodicity: translatePeriodicity
        }
    },

    methods: {
        paySubscription() {

        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
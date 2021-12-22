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
            this.$navigator.navigate('/Payment', {
                props: {
                    itemId: this.myWorkshopOffice.workshop_office_id,
                    itemDescription: this.translateSubscriptionName(this.subscription.name),
                    price: this.subscription.offer_price,
                    operationType: 'paySubscription',
                    buyerId: this.subscription.id,
                    merchantName: 'TuTaller'
                },
                frame: 'accountNav'
            })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}
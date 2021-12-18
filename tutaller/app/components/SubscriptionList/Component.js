import { translateSubscriptionName } from "~/utils/translators"
import { translatePeriodicity } from "~/utils/translators"

export default {
  props: ['myWorkshopOffice'],
  data() {
    return {
      subscriptionList: '',
      translateSubscriptionName: translateSubscriptionName,
      translatePeriodicity: translatePeriodicity
    }
  },

  methods: {
    showSubscription(event) {
      this.$navigator.navigate('/Subscription', { props: { subscription: event.item, myWorkshopOffice: this.myWorkshopOffice }, frame: 'accountNav' })
    },

    getSubscriptionList() {
      fetch('http://10.0.2.2:8080/SubscriptionList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
        })
        .then(response => {
          switch (response.Response) {
            case 'Operation Success':
              this.subscriptionList = response.SubscriptionList
              break
            case 'Operation Failed':
              console.log('Subscriptions not found')
          }
        })
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}
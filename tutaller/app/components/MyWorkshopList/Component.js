import { ApplicationSettings } from '@nativescript/core'

export default {
  data() {
    return {
      myWorkshopList: ''
    }
  },

  methods: {
    showMyWorkshop(event) {
      this.$navigator.navigate('/MyWorkshop', { props: { myWorkshop: event.item }, frame: 'accountNav' })
    },

    getMyWorkshopList() {
      const data = { user_rut: ApplicationSettings.getString('user')}
      fetch('http://10.0.2.2:8080/MyWorkShopList', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
          alert({
            title: 'Error',
            message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
            okButtonText: 'OK'
          }).then(() => {
          })
        })
        .then(response => {
          switch (response.Response) {
            default:
              this.myWorkshopList = response.response
              break
            case 'Any WorkShop Found':
              console.log('fail')
          }
        })
    },

    goToPreviousPage() {
      this.$navigateBack();
    }
  }
}
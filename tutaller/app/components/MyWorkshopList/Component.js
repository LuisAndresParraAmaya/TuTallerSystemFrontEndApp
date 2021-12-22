import { ApplicationSettings } from '@nativescript/core'
import { translatePostulationStatus } from '~/utils/translators'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'

export default {
  data() {
    return {
      myWorkshopList: '',
      translatePostulationStatus: translatePostulationStatus
    }
  },

  methods: {
    showMyWorkshop(event) {
      switch (event.item.postulation_current_status) {
        case 'accepted':
          this.$navigator.navigate('/MyWorkshop', { props: { myWorkshop: event.item }, frame: 'accountNav' })
          break
        case 'pending':
          const snackBar = new SnackBar()
          snackBar.simple('Para gestionar el taller debes esperar a que se apruebe la postulación.')
          break
        case 'rejected':
          const snackBar2 = new SnackBar()
          snackBar2.simple('No puedes gestionar un taller que haya sido rechazado.')
      }
    },

    getMyWorkshopList() {
      const data = { user_rut: ApplicationSettings.getString('user') }
      fetch('http://10.0.2.2:8080/MyWorkShopList', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
        })
        .then(response => {
          switch (response.Response) {
            default:
              this.myWorkshopList = response.response
              break
            case 'Any WorkShop Found':
              console.log('No workshop found')
          }
        })
    },

    goToPreviousPage() {
      this.$navigateBack();
    }
  }
}
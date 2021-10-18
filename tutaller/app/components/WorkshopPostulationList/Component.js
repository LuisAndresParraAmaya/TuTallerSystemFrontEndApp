import { formatDateTime } from "~/utils/formatter"
import { formatPostulationStatus } from "~/utils/formatter"

export default {
  data() {
    return {
      workshopPostulationList: '',
      formatDateTime: formatDateTime,
      formatPostulationStatus: formatPostulationStatus
    }
  },

  methods: {
    showWorkshopPostulation(event) {
      this.$navigator.navigate('/WorkshopPostulation', { props: { workshopPostulation: event.item }, frame: 'accountNav', backstackVisible: false })
    },

    getWorkshopPostulationList() {
      fetch('http://10.0.2.2:8080/WorkshopPostulations', {
        method: 'GET',
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
            case 'Operation Success':
              this.workshopPostulationList = response.Postulations
              break
            case 'Operation Failed':
              console.log('fail')
          }
        })
    },

    goToFilterWorkshopPostulationListPage() {
      this.$navigator.navigate('/FilterWorkshopPostulationList', { frame: 'accountNav' })
    },
    goToPreviousPage() {
      this.$navigateBack();
    }
  }
}
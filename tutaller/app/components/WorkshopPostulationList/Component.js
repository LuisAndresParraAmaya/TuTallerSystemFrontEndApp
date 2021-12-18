import { formatDateTime } from "~/utils/formatter"
import { translatePostulationStatus } from "~/utils/translators"

export default {
  data() {
    return {
      workshopPostulationList: '',
      formatDateTime: formatDateTime,
      translatePostulationStatus: translatePostulationStatus
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
        })
        .then(response => {
          switch (response.Response) {
            case 'Operation Success':
              this.workshopPostulationList = response.Postulations
              break
            case 'Operation Failed':
              console.log('Postulations not found')
          }
        })
    },

    goToFilterWorkshopPostulationListPage() {
      this.$navigator.navigate('/FilterWorkshopPostulationList', { props: { workshopPostulationList: this.workshopPostulationList }, frame: 'accountNav' })
    },
    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}